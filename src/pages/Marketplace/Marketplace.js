import { useState, useEffect } from "react";
import MarketSideBar from "../../components/MarketSideBar/MarketSideBar";
import Product from "../../components/Product/Product";
import classes from "./Marketplace.module.scss";
import Gem from "../../assets/gem.svg";
import ConfirmationPopup from "../../components/ConfirmationPopup/ConfirmationPopup";
import WarningPopup from "../../components/WarningPopup/WarningPopup";
import { getAllItems, getCurrentUser, purchaseItem } from "../../utils/requests";
import { getCurrentTabUId } from "../../chrome/utils";
import Loading from "../../components/Loading/Loading";

const Marketplace = () => {
  const [loading, setLoading] = useState(true);

  const [balance, setBalance] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selected, setSelected] = useState("model");

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [owned, setOwned] = useState({});

  const [prevModel, setPrevModel] = useState();
  const [prevVoice, setPrevVoice] = useState();
  const [selectedProduct, setSelectedProduct] = useState();

  const onProductClicked = (product) => {
    setSelectedProduct(product);

    if (owned[product.id]) {
      onProductUse(product);
      return;
    }

    if (balance >= product.cost) setIsConfirmationOpen(true);
    else setIsWarningOpen(true);
  };

  const onConfirmPurchase = () => {
    //do things
    setIsConfirmationOpen(false);

    const getAll = async () => {
      try {
        await purchaseItem(selectedProduct.id);
        setBalance(balance - selectedProduct.cost); // optimistic update
        getUser();
      } catch (err) {}
    };

    getAll();
    onProductUse(selectedProduct, true);
  };

  const onProductUse = (product, own = false) => {
    if (own || owned[product.id]) {
      if (product.itemType === "model") {
        setPrevModel(product);

        const message = {
          type: "inject",
          vrmUrl: product.resource,
        };
        getCurrentTabUId((id) => {
          id &&
            chrome.tabs.sendMessage(id, message, (response) => {
              console.log("[marketplace.js] model", response);
            });
        });
      }

      if (product.itemType === "voice") {
        setPrevVoice(product);

        const message = {
          type: "pitch",
          value: parseFloat(product.resource),
        };
        getCurrentTabUId((id) => {
          id &&
            chrome.tabs.sendMessage(id, message, (response) => {
              console.log("[marketplace.js] voice", response);
            });
        });
      }
    }
  };

  const getProducts = async () => {
    const data = await getAllItems();
    setProducts(data);
    setFilteredProducts(
      data.filter((o) => {
        return o["itemType"] === selected;
      }),
    );
    setLoading(false);
  };

  const getUser = async () => {
    const data = await getCurrentUser();
    const ownedMap = data.ownedItemIds.reduce((map, value) => {
      map[value] = true;
      return map;
    }, {});
    setOwned(ownedMap);
    setBalance(data.coins);
  };

  useEffect(() => {
    setLoading(true);

    getProducts();
    getUser();
  }, []);

  const filter = (itemType) => {
    setSelected(itemType);
    setFilteredProducts([
      ...products.filter((o) => {
        return o["itemType"] === itemType;
      }),
    ]);
  };

  return (
    <>
      <div className={classes.Marketplace}>
        <MarketSideBar selected={selected} filter={filter} />
        <div className={classes.ContentContainer}>
          <div className={classes.BalanceContainer}>
            <div className={classes.Balance}>
              <p>Balance:</p>

              <div className={classes.Money}>
                <img src={Gem} />
                <p>{balance}</p>
              </div>
            </div>
            <p>You can earn more coins by watching lectures!</p>
          </div>
          {loading && <Loading />}
          {!loading && (
            <div className={classes.ProductsContainer}>
              {filteredProducts.map((product, i) => {
                return (
                  <Product
                    onClick={() => onProductClicked(product)}
                    product={product}
                    key={product.id}
                    owned={owned[product.id] !== undefined}
                    isSelected={product.id === prevModel?.id || product.id === prevVoice?.id}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      {isConfirmationOpen && (
        <div className={classes.Modal}>
          <ConfirmationPopup
            onCancel={() => setIsConfirmationOpen(false)}
            onConfirm={onConfirmPurchase}
            price={selectedProduct?.cost}
          />
        </div>
      )}

      {isWarningOpen && (
        <div className={classes.Modal}>
          <WarningPopup onCancel={() => setIsWarningOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Marketplace;
