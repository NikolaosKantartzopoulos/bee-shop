import React, { useEffect, useState } from "react";

import { connectDatabase } from "../../data/databaseFunctions";

import OrdersTable from "../../components/Main/admin/manage-orders/OrdersTable";

import LoadingSpinner from "../../components/UI/LoadingSpinner";

import styles from "../../components/Helper/pages-css/ManageOrders.module.css";

function ManageOrders({ lastWeekOrders }) {
	const [loadedOrders, setLoadedOrders] = useState(lastWeekOrders);
	const [seenVisible, setSeenVisible] = useState(true);
	const [gatheringProductsVisible, setGatheringProductsVisible] =
		useState(true);
	const [courier, setCourier] = useState(false);
	const [lastWeek, setLastWeek] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchOrders() {
			setIsLoading(true);
			const res = await fetch("/api/admin/manage-orders", {
				method: "PUT",
				headers: { "Content-Type": "application-json" },
				body: JSON.stringify({
					seenVisible: seenVisible,
					gatheringProductsVisible: gatheringProductsVisible,
					courier: courier,
					lastWeek: lastWeek,
				}),
			});
			const data = await res.json();

			setLoadedOrders(data);
			setIsLoading(false);
		}
		fetchOrders();
	}, [seenVisible, gatheringProductsVisible, courier, lastWeek]);

	if (!lastWeekOrders) {
		return <LoadingSpinner />;
	}

	return (
		<div className={styles.ManageOrdersPageRoute}>
			<h1>Orders</h1>
			<div className={styles.checkboxesDiv}>
				<div>
					<label htmlFor="seen">Seen</label>
					<input
						type="checkbox"
						id="seen"
						value={true}
						checked={seenVisible}
						onChange={(e) => {
							setSeenVisible(!seenVisible);
						}}
					/>
				</div>
				<div>
					<label htmlFor="gathering products">Gathering Products</label>
					<input
						type="checkbox"
						id="gathering products"
						value={true}
						checked={gatheringProductsVisible}
						onChange={(e) => {
							setGatheringProductsVisible(!gatheringProductsVisible);
						}}
					/>
				</div>
				<div>
					<label htmlFor="courier">Courier</label>
					<input
						type="checkbox"
						id="courier"
						value={true}
						checked={courier}
						onChange={(e) => {
							setCourier(!courier);
						}}
					/>
				</div>
				<div>
					<label htmlFor="lastWeek">Last week only</label>
					<input
						type="checkbox"
						id="lastWeek"
						value={true}
						checked={lastWeek}
						onChange={(e) => {
							setLastWeek(!lastWeek);
						}}
					/>
				</div>
			</div>
			{isLoading ? (
				<div>
					<LoadingSpinner />
				</div>
			) : (
				<OrdersTable allOrders={loadedOrders} />
			)}
		</div>
	);
}

export default ManageOrders;

export const getServerSideProps = async (ctx) => {
	const [client, db] = await connectDatabase();

	const today = new Date();
	today.setMonth(today.getMonth() - 1);

	//todo chagnge this to one week earlier
	const orders = await db
		.collection("orders")
		.find({
			$or: [{ status: "seen" }, { status: "gathering products" }],
			date: { $gte: today.toISOString() },
		})
		.toArray();

	const lastWeekOrders = orders.map((ord) => ({
		...ord,
		_id: ord._id.toString(),
	}));
	await client.close();
	return {
		props: {
			lastWeekOrders: lastWeekOrders,
		},
	};
};
