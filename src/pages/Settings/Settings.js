import classes from "./Settings.module.scss";
import PlaceholderAvatar from "../../assets/placeholderAvatar.png"

const Settings = (props) => {
    return (
        <div className={classes.Settings}>
            <div className={classes.ProfileContainer}>
                <img src={PlaceholderAvatar} />
                <div className={classes.ProfileInfo}>
                    <h1>Hiruna</h1>
                    <p>24 min watched</p>
                </div>
            </div>
            <div className={classes.EmailContainer}>email</div>
            <div className={classes.GameAttributesContainer}>game attributes</div>
            <button>Log out</button>
        </div>
    )
}

export default Settings;