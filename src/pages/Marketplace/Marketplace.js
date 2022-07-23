import React from 'react';
import MarketSideBar from '../../components/MarketSideBar/MarketSideBar';
import classes from "./Marketplace.module.scss"


const Marketplace = () => {
    return (
        <div className={classes.Marketplace}>
            <MarketSideBar />
        </div>
    )
}

export default Marketplace