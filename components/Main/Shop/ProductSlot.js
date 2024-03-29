import Button from "../../UI/Button";
import Image from "next/image";
import React, { useContext } from "react";

import styles from "./ShopGallery.module.css";

import CartContext from "../../../data/context/cart-context";

function ProductSlot({ product }) {
	const cartCtx = useContext(CartContext);

	const itemInCart = cartCtx.cartState.items.find(
		(pr) => pr._id === product._id
	);

	let imgSrc;
	if (product.url) {
		imgSrc = product.url;
	} else {
		imgSrc =
			"https://images.unsplash.com/photo-1555035900-54c17f3bc1eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80";
	}

	function handleAddItem() {
		cartCtx.addItem(product);
	}

	function handleRemoveItem() {
		if (!itemInCart || itemInCart.numberOfItems == 0) return;
		cartCtx.removeItem(product);
	}

	if (!product) {
		<p>...Loading</p>;
	}

	return (
		<div className={styles.productSlot}>
			<h2>{product.title}</h2>
			<div
				style={{
					width: 150,
					height: 150,
					position: "relative",
					margin: "auto",
				}}
			>
				<Image
					src={imgSrc}
					sizes="(max-width: 768px) 100vw"
					alt="A jar of delicious honey"
					fill
					className={styles.productImage}
					priority
					style={{ overflow: "hidden", objectFit: "cover" }}
				/>
			</div>
			<div id="productInfo" className={styles.info}>
				<p>
					{product.harvestedFrom} | {product.size} g | {product.price} €
				</p>
			</div>
			<div className={styles.quantity}>
				<Button onClick={handleRemoveItem}>-</Button>
				<div>{itemInCart ? itemInCart.numberOfItems : 0}</div>
				<Button onClick={handleAddItem}>+</Button>
			</div>
		</div>
	);
}

export default ProductSlot;
