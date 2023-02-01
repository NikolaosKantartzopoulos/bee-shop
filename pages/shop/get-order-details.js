import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../data/context/cart-context";

import styles from "../../components/Helper/pages-css/get-order-details.module.css";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Button from "../../components/UI/Button";
import ToolsContext from "../../data/context/tools-context";

function GetOrderDetails() {
	const toolsCtx = useContext(ToolsContext);
	const cartCtx = useContext(CartContext);

	const { data: session } = useSession();
	const user = session.user;
	const router = useRouter();

	useEffect(() => {
		if (!cartCtx.cartState.items.length > 0) {
			router.replace("/about-us");
		}
	}, []);
	if (cartCtx.order) {
		const items = cartCtx.order.items;
		const totalCost = cartCtx.order.totalCost;
	}

	const [shippingAddress, setShippingAddress] = useState(user.address);
	const [tel, setTel] = useState(user.tel);
	const [fullname, setFullname] = useState(user.username);

	function goBackHandler() {
		router.replace("/shop");
	}
	async function submitOrderButton() {
		if (cartCtx.cartState.items.length === 0) {
			alert("Cart is empty!");
			return;
		}

		const res = await fetch("/api/order", {
			method: "POST",
			body: JSON.stringify({
				order: cartCtx.cartState,
				user: {
					_id: user._id,
					username: user.username,
					fullname: fullname,
					email: user.email,
					billingAddress: user.address,
					shippingAddress: shippingAddress,
					tel: tel,
				},
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			const data = await res.json();
			toolsCtx.setInfo(data);
		}

		cartCtx.emptyCart();
	}

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.getOrderDetailsPage}>
			<h1>Order details</h1>
			<p>
				To change Billing Address and your Email, please do so from your Account
				Settings
			</p>
			<div className={styles.inputsDiv}>
				<label htmlFor="fullname">Full name</label>
				<input
					id="fullname"
					value={fullname}
					onChange={(e) => setFullname(e.target.value)}
				/>

				<label htmlFor="shippingAddress">Shipping Address</label>
				<input
					id="shippingAddress"
					value={shippingAddress}
					onChange={(e) => setShippingAddress(e.target.value)}
				/>

				<label htmlFor="tel">Tel</label>
				<input id="tel" value={tel} onChange={(e) => setTel(e.target.value)} />
			</div>
			<div className={styles.buttonsDiv}>
				<Button onClick={goBackHandler}>Back</Button>
				<Button onClick={submitOrderButton}>Submit Order</Button>
			</div>
		</div>
	);
}

export default GetOrderDetails;

export async function getServerSideProps(ctx) {
	const session = await getSession({ req: ctx.req });
	if (!session) {
		return {
			redirect: {
				destination: "/about-us",
				permanent: false,
			},
		};
	}
	return { props: { data: null } };
}
