import classes from "./LeaderboardPerson.module.scss";

const LeaderboardPerson = (props) => {
  const { user } = props;

  return (
    <div className={classes.LeaderboardPerson}>
      <p>{props.rank}</p>
      <div className={classes.PersonContainer}>
        <img src={user.profileImage} />
        <p>{user.name}</p>
      </div>
      <div className={classes.WatchTime}>
        {user.totalWatchTimeMin}
        <span>min</span>
      </div>
    </div>
  );
};

export default LeaderboardPerson;
