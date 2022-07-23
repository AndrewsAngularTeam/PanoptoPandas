import { useState, useEffect } from 'react'
import classes from "./Settings.module.scss";
import PlaceholderAvatar from "../../assets/placeholderAvatar.png"
import Gem from "../../assets/gem.svg";
import classNames from 'classnames';
import { auth } from '../../utils/firebase'
import { getCurrentUser } from '../../utils/requests'

const Settings = () => {

    const [user, setUser] = useState(undefined);

    const [email, setEmail] = useState("");
    const [profileData, setProfileData] = useState({
        name: "Hiruna",
        totalWatchTimeMin: 24,
        privateMode: false,
        balance: 7100
    });

    useEffect(() => {
        console.log("[app.js] useEffect");
        auth.onAuthStateChanged((user) => {
          console.log("[app.js]", user);
          setUser(user && user.uid ? user : null);
          setEmail(user && user.email)
        });
      }, []);

      useEffect(() => {
        const getData = async() => {
            const data = await getCurrentUser()
            console.log("current user", data)
            setProfileData({
                ...data,
                balance: data.coins
            })
        }
        getData()
      }, [])

    return (
        <div className={classes.Settings}>
            <div className={classes.ProfileContainer}>
                <img src={PlaceholderAvatar} />
                <div className={classes.ProfileInfo}>
                    <h1>{profileData.name}</h1>
                    <p>{profileData.totalWatchTimeMin} min watched</p>
                </div>
            </div>
            <div className={classes.EmailContainer}>
                <h3>
                    Email
                </h3>
                <p>
                    {email}
                </p>
            </div>
            <div className={classes.GameAttributesContainer}>
                <div className={classes.Balance}>
                    <h3>Balance:</h3>
                    <div>
                        <img src={Gem} />
                        {profileData.balance}
                    </div>
                </div>
                <div className={classes.PrivateMode}>
                    <div className={classes.SwitchContainer}>
                        <h3>Private mode:</h3>
                        <label className={classes.Switch}>
                            <input type="checkbox" checked={profileData.privateMode} />
                            <span
                                className={
                                    classNames(classes.Slider, classes.Round)
                                }>
                            </span>
                        </label>
                    </div>
                    <p>Turning on private mode means that your hours won’t be published on the leaderboard</p>

                </div>
            </div>
            <button>Log out</button>
        </div>
    )
}

export default Settings;