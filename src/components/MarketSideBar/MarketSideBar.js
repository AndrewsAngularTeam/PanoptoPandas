import React from 'react';
import classes from './MarketSideBar.module.scss';

const MarketSideBar = () => {
    return (
        <div className={classes.MarketSideBar}>
            <ul>
                {/* TODO change this when there are themes and models for sale */}
                <li className={classes.Active}>
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