import React, { useEffect, useState } from 'react';
import MarketSideBar from '../../components/MarketSideBar/MarketSideBar';
import Product from '../../components/Product/Product';
import classes from "./Marketplace.module.scss"
import Gem from "../../assets/gem.svg"
import productData from './products.json'
import { getAllItems } from '../../utils/requests'

const Marketplace = () => {

    const [balance, setBalance] = useState(0);
    const [products, setProducts] = useState(productData);
    const [filteredProducts, setFilteredProducts] = useState(productData);
    const [selected, setSelected] = useState("model");

    useEffect(() => {
        const getData = async() => {
            const data = await getAllItems()
            setProducts(data)
            setFilteredProducts(data.filter((o) => {
                return o["itemType"] === selected
            }))
        }
        getData()
    }, [])

    const filter = (itemType) => {
        setSelected(itemType)
        setFilteredProducts([...products.filter((o) => {
            return o["itemType"] === itemType
        })])
    }

    return (
        <div className={classes.Marketplace}>
            <MarketSideBar
                selected={selected}
                filter={filter}
            />
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
                        return <Product
                            product={product}
                            key={product.id}
                            owned={i === 1}
                            isSelected={i === 3}
                        />
                    })}

                </div>
            </div>
        </div>
    )
}

export default Marketplace