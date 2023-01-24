import React, { useContext, useEffect, useReducer } from "react";
import ProductSidebar from "../../components/Main/Shop/ProductSidebar";
import ProductGallery from "../../components/Main/Shop/ProductGallery";

import { connectDatabase } from "../../data/db";

import CartContext from "../../data/CartContext";
import ShowcaseContext from "../../data/ShowcaseContext";

// import path from "path";
// import fs from "fs/promises";

import styles from "../../components/Main/Shop/Shop.module.css";

function Shop({ allProducts }) {
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
		showcaseCtx.setShowcaseDatabase(allProducts);
		showcaseCtx.resetShowcase(allProducts);
	}, []);

	return (
		<div className={styles.shopComponent}>
			<ProductSidebar />
			<ProductGallery />
		</div>
	);
}

export async function getStaticProps() {
	const [client, db] = await connectDatabase();
	const documents = await db.collection("products").find().toArray();

	const allProducts = documents.map((p) => ({ ...p, _id: p._id.toString() }));
	return {
		props: { allProducts },
	};
}

export default Shop;
