import React from 'react';
import classes from './Product.module.scss';
import Gem from "../../assets/gem.svg"
import PlaceholderProduct from "../../assets/placeholderProduct.png"
import Lock from "../../assets/lock.svg"
import Unlock from "../../assets/unlock.svg"
import classNames from 'classnames';
import Check from "../../assets/check.svg"

const Product = (props) => {

    const isUnlocked = props.owned || props.isSelected
    console.log("props", props)
    return (
        <div className={
            isUnlocked ?
                classNames(classes.Product, classes.Active) :
                classNames(classes.Product)
        }>
            <img src={PlaceholderProduct} />
            <div className={classes.ProductInfo}>
                {
                    isUnlocked ?
                        <div className={classes.CheckboxContainer}>
                            <button
                                className={
                                    props.isSelected ? classes.Selected : null}>
                                <img src={Check} />
                            </button>
                            {props.isSelected ? <p>Applied</p> : <p>Use</p>}
                        </div> :
                        <div className={classes.PriceContainer}>
                            <img src={Gem} />
                            <p>600</p>
                        </div>
                }
                <img src={isUnlocked ? Unlock : Lock} />
            </div>
        </div>
    )
}

export default Product;