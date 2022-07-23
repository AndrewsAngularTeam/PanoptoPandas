import React from 'react';
import MarketSideBar from '../../components/MarketSideBar/MarketSideBar';
import Products from '../../components/Products/Products';
import classes from "./Marketplace.module.scss"


const Marketplace = () => {
    return (
        <div className={classes.Marketplace}>
            <MarketSideBar />
            <div className={classes.ContentContainer}>
                <div className={classes.BalanceContainer}>
                    balance
                </div>
                <Products />
            </div>
        </div>
    )
}

export default Marketplace