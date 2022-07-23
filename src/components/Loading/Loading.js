import BarLoader from "react-spinners/BarLoader";
import classes from "./Loading.module.scss";
import theme from "../../assets/css/theme.scss";

const Loading = (props) => {
  console.log(theme);
  return (
    <div className={classes.Loading}>
      <div className={classes.ContentContainer}>
        <BarLoader color="#9A33CA" width={100} height={6} />
        <p>{props.text || "Loading..."}</p>
      </div>
    </div>
  );
};

export default Loading;
