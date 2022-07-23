import React from 'react';
import classes from './MarketSideBar.module.scss';

const MarketSideBar = () => {
    return (
        <div className={classes.MarketSideBar}>
            <ul>
                <li>
                    Models
                </li>
                <li>
                    Themes
                </li>
                <li>
                    Voices
                </li>
            </ul>
        </div>
    )
}

export default MarketSideBar;