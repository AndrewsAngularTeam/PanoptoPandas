import React from 'react';
import classes from './Product.module.scss';
import Gem from "../../assets/gem.svg"
import PlaceholderProduct from "../../assets/placeholderProduct.png"
import Lock from "../../assets/lock.svg"
import Unlock from "../../assets/unlock.svg"

const Product = (props) => {
    return (
        <div className={classes.Product}>
            <img src={PlaceholderProduct} />
            <div className={classes.ProductInfo}>
                <div className={classes.PriceContainer}>
                    <img src={Gem} />
                    <p>600</p>
                </div>
                <img src={Lock} />
            </div>
        </div>
    )
}

export default Product;