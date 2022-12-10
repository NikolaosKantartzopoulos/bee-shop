import Image from "next/image";
import React, { useContext } from "react";

import cartSVG from "../../public/assets/images/cart.svg";

import styles from "./Header.module.css";

import CartContext from "../../data/CartContext";

function Cart() {
	const cartCtx = useContext(CartContext);
	return (
		<div className={styles.cart}>
			<Image src={cartSVG} height={30} width={30} />
			<span>{cartCtx.totalAmount} €</span>
			<span>{cartCtx.getAmountOfItemsInCart()}</span>
		</div>
	);
}

export default Cart;
