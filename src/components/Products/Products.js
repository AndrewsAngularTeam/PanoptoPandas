import React from 'react';
import Product from '../Product/Product';
import classes from './Products.module.scss';

const Products = (props) => {
    return (
        <div className={classes.Products}>
            {props.products.map((product) => {
                return <Product product={product} key={product.id} />
            })}
        </div>
    )
}

export default Products;