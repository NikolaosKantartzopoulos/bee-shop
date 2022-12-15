import React, { useContext, useEffect, useReducer } from "react";
import ProductSidebar from "../../components/Main/Shop/ProductSidebar";
import ProductGallery from "../../components/Main/Shop/ProductGallery";

import { connectDatabase, getAllDocuments } from "../../helper/db";

import CartContext from "../../data/CartContext";
import ShowcaseContext from "../../data/ShowcaseContext";

// import path from "path";
// import fs from "fs/promises";

import styles from "../../components/Main/Shop/Shop.module.css";

function Shop({ products }) {
	const cartCtx = useContext(CartContext);
	const showcaseCtx = useContext(ShowcaseContext);

	const cartInventory = (
		<p style={{ height: "2rem" }}>
			{cartCtx.items.map((item) => (
				<span key={item.title}>
					{item.title} - {item.amount} ,
				</span>
			))}
		</p>
	);

	useEffect(() => {
		showcaseCtx.setShowcaseDatabase(products);
		showcaseCtx.resetShowcase(products);
	}, []);

	return (
		<div className={styles.shopComponent}>
			<ProductSidebar products={products} />
			<ProductGallery products={products} />
		</div>
	);
}

export async function getStaticProps() {
	// const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
	// const jsonData = await fs.readFile(filePath);
	// const data = JSON.parse(jsonData);

	// let products = [];
	// let loadedProducts = data.products;
	// for (let key in loadedProducts) {
	// 	products.push({
	// 		title: key,
	// 		id: loadedProducts[key].id,
	// 		from: loadedProducts[key].from,
	// 		price: loadedProducts[key].price,
	// 		size: loadedProducts[key].size,
	// 		url: loadedProducts[key].url,
	// 	});
	// }

	const client = await connectDatabase();
	const documents = await getAllDocuments(client, "products");

	const products = documents.map((item) => ({
		id: `${item._id}`,
		size: item.size,
		title: item.title,
		from: item.harvestedFrom,
		price: item.price,
		url: `${item.url}`,
	}));
	console.log(products);
	return {
		props: { products },
	};
}

export default Shop;
