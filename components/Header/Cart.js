import Image from "next/image";
import React, { useContext, useState } from "react";

import cartSVG from "../../public/assets/images/cart.svg";
import Button from "../UI/Button";

import styles from "./Header.module.css";

import CartContext from "../../data/CartContext";

function Cart() {
	const cartCtx = useContext(CartContext);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [orderSubmited, setOrderSubmited] = useState(false);
	function handleDropdownVisibility() {
		setDropdownVisible((dropdownVisible) => !dropdownVisible);
	}

	function handleOrder(e) {
		e.stopPropagation();
		if (cartCtx.items.length === 0) {
			alert("Cart is empty!");
			return;
		}

		let order = cartCtx.items.map((item) => {
			return {
				title: item.title,
				id: item.id,
				amount: item.amount,
			};
		});

		cartCtx.emptyCart();
		fetch("/api/order", {
			method: "POST",
			body: JSON.stringify({ order: order }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.ok) {
					setOrderSubmited(true);
				}
				return res.json();
			})
			.then((data) => console.log(data));
	}

	function resetShopUI() {
		setOrderSubmited(false);
	}

	function deleteItemsHandler(item) {
		cartCtx.removeItem(item);
	}

	return (
		<div className={styles.cart} onClick={handleDropdownVisibility}>
			<Image src={cartSVG} alt="cart" height={30} width={30} />
			<span>{cartCtx.totalAmount} €</span>
			<span>{cartCtx.getAmountOfItemsInCart()}</span>
			{dropdownVisible && (
				<div
					id="cartDropdown"
					className={styles.cartDropdown}
					onClick={(e) => e.stopPropagation()}
				>
					{cartCtx.items.length !== 0 && (
						<>
							<div>
								{cartCtx.items.map((item) => (
									<div>
										<span>
											{item.title} - {item.amount}
										</span>
										<Button onClick={() => deleteItemsHandler(item)}>
											Delete
										</Button>
									</div>
								))}
							</div>
							{!orderSubmited && (
								<Button onClick={handleOrder}>Submit order!</Button>
							)}
						</>
					)}
					{orderSubmited && (
						<>
							<p>Order confirmed!</p>
							<Button onClick={resetShopUI}>New Order!</Button>
						</>
					)}
					{!orderSubmited && cartCtx.items.length === 0 && (
						<h1>Cart is Empty!</h1>
					)}
				</div>
			)}
		</div>
	);
}

export default Cart;
