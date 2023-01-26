import React, { useContext, useEffect, useState } from "react";

import Image from "next/image";

import ProductSidebar from "../../components/Main/Shop/ProductSidebar";
import ProductGallery from "../../components/Main/Shop/ProductGallery";

import { connectDatabase } from "../../data/databaseFunctions";

import CartContext from "../../data/context/cart-context";
import ShowcaseContext from "../../data/context/showcase-context";

import SearchIcon from "../../public/assets/images/search.svg";

import styles from "../../components/Main/Shop/Shop.module.css";

function Shop({ allProducts }) {
	const cartCtx = useContext(CartContext);
	const showcaseCtx = useContext(ShowcaseContext);

	const [sidebarVisible, setSidebarVisible] = useState(false);

	const cartInventory = (
		<p style={{ height: "2rem" }}>
			{cartCtx.cartState.items.map((item) => (
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
			<Image
				src={SearchIcon}
				alt="Search Products"
				className={styles.searchImage}
				onClick={() => setSidebarVisible(!sidebarVisible)}
			/>
			<ProductSidebar
				sidebarVisible={sidebarVisible}
				setSidebarVisible={setSidebarVisible}
			/>
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
