import React, { useEffect, useState } from "react";
import MarketSideBar from "../../components/MarketSideBar/MarketSideBar";
import Product from "../../components/Product/Product";
import classes from "./Marketplace.module.scss";
import Gem from "../../assets/gem.svg";
import { getAllItems } from "../../utils/requests";
import { getCurrentTabUId } from "../../chrome/utils";

const Marketplace = () => {
  const [balance, setBalance] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selected, setSelected] = useState();

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
  );
};

export default Marketplace;
