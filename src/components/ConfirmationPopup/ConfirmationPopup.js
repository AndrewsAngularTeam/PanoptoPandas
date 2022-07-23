import classes from "./ConfirmationPopup.module.scss";
import Gem from "../../assets/gem.svg";

const ConfirmationPopup = (props) => {
  return (
    <div className={classes.ConfirmationPopup}>
      <h3>
        Purchase this item for
        <br />
        <img src={Gem} /> <span>{props.price || "??"}</span>?
      </h3>
      <div>
        <button className={classes.Cancel} onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
