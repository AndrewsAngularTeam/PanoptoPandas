import classes from "./Settings.module.scss";

const Settings = (props) => {
    return (
        <div className={classes.Settings}>
            <div className={classes.ProfileContainer}>prof</div>
            <div className={classes.EmailContainer}>email</div>
            <div className={classes.GameAttributesContainer}>game attributes</div>
            <button>Log out</button>
        </div>
    )
}

export default Settings;