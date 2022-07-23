import classes from "./Settings.module.scss";
import PlaceholderAvatar from "../../assets/placeholderAvatar.png"
import Gem from "../../assets/gem.svg";

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
            <div className={classes.EmailContainer}>
                <h3>
                    Email
                </h3>
                <p>
                    jiaru@gmail.com
                </p>
            </div>
            <div className={classes.GameAttributesContainer}>
                <div className={classes.Balance}>
                    <h3>Balance:</h3>
                    <div>
                        <img src={Gem} />
                        7100
                    </div>
                </div>
                <div className={classes.PrivateMode}>
                    <div className={classes.SwitchContainer}>
                        <h3>Private mode:</h3>
                        <div>switch</div>
                    </div>
                    <p>Turning on private mode means that your hours won’t be published on the leaderboard</p>

                </div>
            </div>
            <button>Log out</button>
        </div>
    )
}

export default Settings;