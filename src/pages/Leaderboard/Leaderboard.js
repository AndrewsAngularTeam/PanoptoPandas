import { useState, useEffect } from "react";
import classNames from "classnames";
import LeaderboardPerson from "../../components/LeaderboardPerson/LeaderboardPerson";
import classes from "./Leaderboard.module.scss";
import Crown from "../../assets/crown.svg";
import { getLeaderboard } from "../../utils/requests";
import Loading from "../../components/Loading/Loading";

const Leaderboard = () => {
  // TODO replace with state and fetch data from server
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const leaderboard = await getLeaderboard();
      setData(leaderboard);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={classes.Leaderboard}>
      <div className={classes.TopThreeContainer}>
        <div className={classNames(classes.TopPlacing, classes.Second)}>
          <img src={data[1].profileImage} />
          <div className={classes.Badge}>2</div>
          <h3>{data[1].name}</h3>
          <p>
            {data[1].totalWatchTimeMin} <span>min</span>
          </p>
        </div>
        <div className={classNames(classes.TopPlacing, classes.First)}>
          <img src={Crown} className={classes.Crown} />
          <img src={data[0].profileImage} />
          <div className={classes.Badge}>1</div>
          <h3>{data[0].name}</h3>
          <p>
            {data[0].totalWatchTimeMin} <span>min</span>
          </p>
        </div>
        <div className={classNames(classes.TopPlacing, classes.Third)}>
          <img src={data[2].profileImage} />
          <div className={classes.Badge}>3</div>
          <h3>{data[2].name}</h3>
          <p>
            {data[2].totalWatchTimeMin} <span>min</span>
          </p>
        </div>
      </div>
      <div className={classes.ListContainer}>
        {data.slice(3).map((user, i) => {
          return <LeaderboardPerson key={user._id} rank={i + 1 + 3} user={user} />;
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
