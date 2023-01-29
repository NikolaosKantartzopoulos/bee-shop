import React from "react";

import styles from "../../components/Helper/pages-css/ManageOrders.module.css";
import { connectDatabase } from "../../data/databaseFunctions";

function ManageOrders({ allOrders }) {
	console.log(allOrders);
	return <div className={styles.ManageOrdersPageRoute}></div>;
}

export default ManageOrders;

export const getServerSideProps = async (ctx) => {
	const [client, db] = await connectDatabase();
	const orders = await db.collection("orders").find().toArray();
	const allOrders = orders.map((ord) => ({ ...ord, _id: ord._id.toString() }));
	await client.close();
	return {
		props: {
			allOrders: allOrders,
		},
	};
};
