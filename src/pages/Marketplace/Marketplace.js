import React from 'react';
import MarketSideBar from '../../components/MarketSideBar/MarketSideBar';
import Product from '../../components/Product/Product';
import classes from "./Marketplace.module.scss"
import Gem from "../../assets/gem.svg"

const Marketplace = () => {

    const products = [
        {
            "name": "ExampleAvatar_A",
            "__v": 0,
            "cost": 200,
            "itemType": "model",
            "resource": "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/ExampleAvatar_A.vrm",
            "id": "62db7c405a84f016c1b6db03"
        },
        {
            "name": "ExampleAvatar_B",
            "__v": 0,
            "cost": 300,
            "itemType": "model",
            "resource": "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/ExampleAvatar_B.vrm",
            "id": "62db7dd55a84f016c1b7e42a"
        },
        {
            "name": "ExampleAvatar_C",
            "__v": 0,
            "cost": 400,
            "itemType": "model",
            "resource": "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/ExampleAvatar_C.vrm",
            "id": "62db7dd55a84f016c1b7e440"
        },
        {
            "name": "BP-Maid",
            "__v": 0,
            "cost": 100,
            "itemType": "model",
            "resource": "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/bp-maid.vrm",
            "id": "62db82942a794c50458ced16"
        },
        {
            "name": "Flynn",
            "__v": 0,
            "cost": 150,
            "itemType": "model",
            "resource": "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/flynn.vrm",
            "id": "62db82ad2a794c50458ced17"
        },
        {
            "name": "Hiru-Maid",
            "__v": 0,
            "cost": 200,
            "itemType": "model",
            "resource": "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/hiru-maid.vrm",
            "id": "62db82c42a794c50458ced18"
        },
        {
            "name": "Loli-Maid",
            "__v": 0,
            "cost": 500,
            "itemType": "model",
            "resource": "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/loli-maid.vrm",
            "id": "62db82dc2a794c50458ced19"
        },
        {
            "name": "Loli",
            "__v": 0,
            "cost": 450,
            "itemType": "model",
            "resource": "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/loli.vrm",
            "id": "62db82ec2a794c50458ced1a"
        }
    ];

    return (
        <div className={classes.Marketplace}>
            <MarketSideBar />
            <div className={classes.ContentContainer}>
                <div className={classes.BalanceContainer}>
                    <div className={classes.Balance}>
                        <p>Balance:</p>

                        <div className={classes.Money}>
                            <img src={Gem} />
                            <p>7100</p>
                        </div>
                    </div>
                    <p>You can earn more coins by watching lectures!</p>
                </div>
                <div className={classes.ProductsContainer}>
                    {products.map((product, i) => {
                        return <Product
                            product={product}
                            key={product.id}
                            owned={i === 1}
                            isSelected={i === 3}
                        />
                    })}

                </div>
            </div>
        </div>
    )
}

export default Marketplace