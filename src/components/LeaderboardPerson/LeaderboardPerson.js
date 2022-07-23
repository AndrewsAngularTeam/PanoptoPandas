import classes from "./LeaderboardPerson.module.scss";

const LeaderboardPerson = (props) => {
    return (
        <div className="LeaderboardPerson">
            <p>{props.rank}</p>
            <div className={classes.PersonContainer}>

            </div>
        </div>
    )
}

export default LeaderboardPerson