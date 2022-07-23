import classes from "./WarningPopup.module.scss";
import Gem from "../../assets/gem.svg";

const WarningPopup = (props) => {
  return (
    <div className={classes.WarningPopup}>
      <h3>
        <img src={Gem} /> Not enough gems :(
      </h3>
      <p>You can earn more gems by watching lectures!</p>
      <div>
        <button className={classes.Cancel} onClick={props.onCancel}>
          OK
        </button>
      </div>
    </div>
  );
};

export default WarningPopup;
