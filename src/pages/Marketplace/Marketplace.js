import { useState, useEffect } from "react";
import MarketSideBar from "../../components/MarketSideBar/MarketSideBar";
import Product from "../../components/Product/Product";
import classes from "./Marketplace.module.scss";
import Gem from "../../assets/gem.svg";
import ConfirmationPopup from "../../components/ConfirmationPopup/ConfirmationPopup";
import WarningPopup from "../../components/WarningPopup/WarningPopup";
import { getAllItems } from "../../utils/requests";
import { getCurrentTabUId } from "../../chrome/utils";

const Marketplace = () => {
  const [balance, setBalance] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selected, setSelected] = useState();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  const [selectedItemPrice, setSelectedItemPrice] = useState(0);

  const onProductClicked = (price) => {
    selectedItemPrice(price);

    //if balance
    //setIsConfirmationOpen(true)
    //else
    //setIsWarningOpen(true)
  };

  const onConfirmPurchase = () => {
    //do things

    setIsConfirmationOpen(false);
  };

  const handleClick = (product, i) => () => {
    if (/*product.owned*/ true) {
      setSelected(i);

      const message = {
        type: "inject",
        vrmUrl: product.resource,
      };

      getCurrentTabUId((id) => {
        id &&
          chrome.tabs.sendMessage(id, message, (response) => {
            console.log("[marketplace.js]", response);
          });
      });
    } else {
      if (balance >= product.cost) {
        setBalance(balance - product.cost);
        product.owned = true;
        setSelected(product.name);
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getAllItems();
      setProducts(data);
      setFilteredProducts(
        data.filter((o) => {
          return o["itemType"] === selected;
        }),
      );
    };
    getData();
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
          <div className={classes.ProductsContainer}>
            {filteredProducts.map((product, i) => {
              return (
                <Product
                  onClick={handleClick(product, i)}
                  product={product}
                  key={product.id}
                  owned={true} // TODO: backend
                  isSelected={selected === i}
                />
              );
            })}
          </div>
        </div>
      </div>
      {isConfirmationOpen && (
        <div className={classes.Modal}>
          <ConfirmationPopup
            onCancel={() => setIsConfirmationOpen(false)}
            onConfirm={onConfirmPurchase}
            price={selectedItemPrice}
          />
        </div>
      )}

      {isWarningOpen && (
        <div className={classes.Modal}>
          <WarningPopup onCancel={() => setIsConfirmationOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Marketplace;
