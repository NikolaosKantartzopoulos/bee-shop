import Image from "next/image";
import React, { useContext } from "react";

import styles from "./ShopGallery.module.css";

import CartContext from "../../../data/CartContext";

function ProductSlot({ product }) {
	const cartCtx = useContext(CartContext);
	const itemAmount = cartCtx.items.find((a) => a.id === product.id);

	function handleAddItem() {
		const itemAdd = { ...product, amount: 1 };
		cartCtx.addItem(itemAdd);
	}

	function handleRemoveItem() {
		if (!itemAmount || itemAmount.amount == 0) return;
		const itemRemove = { ...product, amount: 1 };
		cartCtx.removeItem(itemRemove);
	}

	return (
		<div className={styles.productSlot}>
			<h2>{product.title}</h2>
			<Image
				src={product.url}
				alt="A jar of delicious honey"
				width={100}
				height={150}
				className={styles.productImage}
				priority
			/>
			<div id="productInfo" className={styles.info}>
				<p>
					{product.from} | {product.size} g | {product.price} €
				</p>
			</div>
			<div className={styles.quantity}>
				<button onClick={handleRemoveItem}>-</button>
				<div>{itemAmount ? itemAmount.amount : 0}</div>
				<button onClick={handleAddItem}>+</button>
			</div>
		</div>
	);
}

export default ProductSlot;
