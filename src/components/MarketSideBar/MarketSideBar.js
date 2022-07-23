import React from "react";
import classes from "./MarketSideBar.module.scss";

const MarketSideBar = (props) => {
  const { selected, filter } = props;
  return (
    <div className={classes.MarketSideBar}>
      <ul>
        {/* TODO change this when there are themes and models for sale */}
        <li
          className={selected === "model" ? classes.Active : null}
          onClick={() => {
            filter("model");
          }}
        >
          Models
        </li>
        <li
          className={selected === "theme" ? classes.Active : null}
          onClick={() => {
            filter("theme");
          }}
        >
          Themes
        </li>
        <li
          className={selected === "voice" ? classes.Active : null}
          onClick={() => {
            filter("voice");
          }}
        >
          Voices
        </li>
      </ul>
    </div>
  );
};

export default MarketSideBar;
