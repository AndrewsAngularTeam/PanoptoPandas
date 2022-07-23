import React from 'react';
import classes from "./NavBar.module.scss"

import Logo from "../../assets/logo.svg"
import DefaultPic from "../../assets/placeholderAvatar.png";

const NavBar = () => {
    return (
        <header className={classes.NavBar}>
            <div className={classes.LogoContainer}>
                <img src={Logo} />
                <p>Pandas</p>
            </div>
            <nav className={classes.NavContainer}>
                <ul>
                    <li className={classes.Active}>Customisation</li>
                    <li>Leaderboard</li>
                </ul>
            </nav>

            <div className={classes.ProfileContainer}>
                <img src={DefaultPic} />
                <p>Name Here</p>
            </div>

        </header >
    )
}

export default NavBar;