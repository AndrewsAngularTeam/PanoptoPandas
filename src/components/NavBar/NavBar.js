import React from 'react';
import classes from "./NavBar.module.scss"

import Logo from "../../assets/logo.svg"
import DefaultPic from "../../assets/placeholderAvatar.png";

const NavBar = (props) => {
    return (
        <header className={classes.NavBar}>
            <div className={classes.LogoContainer}>
                <img src={Logo} />
                <p>Pandas</p>
            </div>
            <nav className={classes.NavContainer}>
                <ul>

                    {props.pages.map((page) => {
                        return <li
                            key={page.name}
                            onClick={() => {
                                props.onRouteClicked(page.name)
                            }}
                            className={
                                props.currentRoute === page.name ? classes.Active : null
                            }
                        >
                            {page.name}
                        </li>
                    })}
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