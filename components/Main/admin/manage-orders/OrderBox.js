import React from "react";

import styles from "./OrderBox.module.css";

function OrderBox({ order }) {
	const localDate = new Date(order.date).toLocaleString("en-GB");
	let statusBGC = "";
	if (order.status === "seen") {
		statusBGC = "red";
	} else if (order.status == "gathering products") {
		statusBGC = "orange";
	} else {
		statusBGC = "lightgreen";
	}

	return (
		<div className={styles.orderBox}>
			<div className={styles.statusDiv}>
				<h4 className={styles.orderStatusHeader}>
					<p>Status</p>
					<span style={{ backgroundColor: statusBGC }}>{order.status}</span>
				</h4>
				<p>
					<p>Date</p>
					<p>{localDate}</p>
				</p>
				<p>
					<p>Order ID</p>
					<p>{order._id}</p>
				</p>
			</div>
			<div className={styles.statusDiv}>
				<h4>Items</h4>
				<div className={styles.itemsDiv}>
					{order.items.map((item) => (
						<p key={item._id}>
							<p>{item.title}</p>
							<p>{item.numberOfItems}</p>
						</p>
					))}
				</div>
			</div>
			<div className={styles.statusDiv}>
				<h4>Shipping information</h4>
				<p>
					<p>Username</p>
					<p>{order.user.username}</p>
				</p>
				<p>
					<p>Fullname</p>
					<p>{order.user.fullname}</p>
				</p>
				<p>
					<p>Shipping Address </p>
					<p>{order.user.shippingAddress}</p>
				</p>
				<p>
					<p>Billing Address </p>
					<p>{order.user.billingAddress}</p>
				</p>
				<p>
					<p>Payment</p>
					<p>{order.totalCost} €</p>
				</p>
			</div>
		</div>
	);
}

export default OrderBox;
