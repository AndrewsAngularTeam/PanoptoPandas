import LeaderboardPerson from "../../components/LeaderboardPerson/LeaderboardPerson";
import classes from "./Leaderboard.module.scss";

const Leaderboard = () => {

    // TODO replace with state and fetch data from server
    const data = [
        {
            "_id": "62db4d938709ff1e19a3dac4",
            "name": "Bob",
            "totalWatchTimeMin": 328,
            "__v": 0,
            "ownedItemIds": [
                "62db7dd55a84f016c1b7e42a",
                "62db82942a794c50458ced16"
            ],
            "selectedItemId": "62db7dd55a84f016c1b7e42a",
            "id": "bob123",
            "coins": 4080,
            "privateMode": false,
            "profileImage": "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/Rectangle_48_1.png"
        },
        {
            "_id": "62dbc7ed512ebaf3afec2c40",
            "totalWatchTimeMin": 123,
            "ownedItemIds": [],
            "selectedItemId": null,
            "coins": 0,
            "privateMode": false,
            "name": "Ken",
            "id": "smm5231",
            "__v": 0,
            "profileImage": "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/Rectangle_48_1.png"
        },
        {
            "_id": "62dbc829512ebaf3afec2c44",
            "totalWatchTimeMin": 81,
            "ownedItemIds": [],
            "selectedItemId": null,
            "coins": 0,
            "privateMode": false,
            "name": "Krish",
            "id": "kkk",
            "__v": 0,
            "profileImage": "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/Rectangle_48_1.png"
        },
        {
            "_id": "62dbc817512ebaf3afec2c42",
            "totalWatchTimeMin": 33,
            "ownedItemIds": [],
            "selectedItemId": null,
            "coins": 0,
            "privateMode": false,
            "name": "Andrew",
            "id": "aaa",
            "__v": 0,
            "profileImage": "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/Rectangle_48_1.png"
        },
        {
            "_id": "62dbc831512ebaf3afec2c46",
            "totalWatchTimeMin": 11,
            "ownedItemIds": [],
            "selectedItemId": null,
            "coins": 0,
            "privateMode": false,
            "name": "Molly",
            "id": "mmm",
            "__v": 0,
            "profileImage": "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/Rectangle_48_1.png"
        },
        {
            "_id": "62dbc838512ebaf3afec2c48",
            "totalWatchTimeMin": 10,
            "ownedItemIds": [],
            "selectedItemId": null,
            "coins": 0,
            "privateMode": false,
            "name": "Zac",
            "id": "zzz",
            "__v": 0,
            "profileImage": "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/Rectangle_48_1.png"
        },
        {
            "_id": "62dbd26cfeb9d71bfd2d4196",
            "profileImage": "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/Rectangle_48_1.png",
            "totalWatchTimeMin": 0,
            "ownedItemIds": [],
            "selectedItemId": null,
            "coins": 0,
            "privateMode": false,
            "name": "Jickie",
            "id": "jjj",
            "__v": 0
        }
    ]

    return (
        <div className={classes.Leaderboard}>
            <div className={classes.TopThreeContainer}>tpo 3</div>
            <div className={classes.ListContainer}>
                {
                    data.slice(3).map((user, i) => {
                        return (
                            <LeaderboardPerson
                                key={user._id}
                                rank={i + 1 + 3}
                                user={user}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Leaderboard;