import React, { useContext, useEffect } from "react";
import ProductSidebar from "../../components/Main/Shop/ProductSidebar";
import ProductGallery from "../../components/Main/Shop/ProductGallery";

import CartContext from "../../data/CartContext";

import path from "path";
import fs from "fs/promises";

import styles from "../../components/Main/Shop/Shop.module.css";

function Shop({ products }) {
	const cartCtx = useContext(CartContext);

	const cartInventory = (
		<p>
			{cartCtx.items.map((item) => (
				<span key={item.title}>
					{item.title} - {item.amount} ,
				</span>
			))}
		</p>
	);

	return (
		<>
			<div>------------------------</div>
			{cartInventory}
			<div>
				<span>Total amount: </span>
				{cartCtx.totalAmount}
			</div>
			<div>------------------------</div>
			<div className={styles.shopComponent}>
				<ProductSidebar products={products} />
				<ProductGallery products={products} />
			</div>
		</>
	);
}

export async function getStaticProps() {
	const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	let products = [];
	let loadedProducts = data.products;
	for (let key in loadedProducts) {
		products.push({
			title: key,
			id: loadedProducts[key].id,
			from: loadedProducts[key].from,
			price: loadedProducts[key].price,
			size: loadedProducts[key].size,
			url: loadedProducts[key].url,
		});
	}

	return {
		props: { products },
	};
}

export default Shop;
