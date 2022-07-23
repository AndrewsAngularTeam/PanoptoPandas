import React from 'react';
import classes from './Product.module.scss';
import Gem from "../../assets/gem.svg"
import PlaceholderProduct from "../../assets/placeholderProduct.png"

const Product = (props) => {
    return (
        <div className={classes.Product}>
            <img src={PlaceholderProduct} />
            <div className={classes.ProductInfo}>
                <div className={classes.PriceContainer}>
                    <img src={Gem} />
                    <p>600</p>
                </div>
            </div>
        </div>
    )
}

export default Product;