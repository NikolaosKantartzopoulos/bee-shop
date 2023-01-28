import React, { useContext, useEffect, useState } from "react";

import Image from "next/image";
import { getSession } from "next-auth/react";

import ProductSidebar from "../../components/Main/Shop/ProductSidebar";
import ProductGallery from "../../components/Main/Shop/ProductGallery";

import { connectDatabase } from "../../data/databaseFunctions";

import CartContext from "../../data/context/cart-context";
import ShowcaseContext from "../../data/context/showcase-context";

import SearchIcon from "../../public/assets/images/search.svg";

import styles from "../../components/Main/Shop/Shop.module.css";
import ToolsContext from "../../data/context/tools-context";

function Shop({ allProducts, session }) {
	const cartCtx = useContext(CartContext);
	const toolsCtx = useContext(ToolsContext);
	const showcaseCtx = useContext(ShowcaseContext);

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

	function handleFilterSidebarVisibility() {
		if (toolsCtx.dropdownOpen === "") {
			toolsCtx.setDropdownOpen("filterSidebarVisible");
		} else {
			toolsCtx.setDropdownOpen("");
		}
	}

	return (
		<div className={styles.shopComponent}>
			<Image
				src={SearchIcon}
				alt="Search Products"
				className={styles.searchImage}
				onClick={handleFilterSidebarVisibility}
			/>
			<ProductSidebar />
			<ProductGallery />
		</div>
	);
}

export default Shop;

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	const [client, db] = await connectDatabase();
	const documents = await db.collection("products").find().toArray();

	const allProducts = documents.map((p) => ({ ...p, _id: p._id.toString() }));

	if (!session) {
		return {
			redirect: {
				destination: "/about-us",
				permanent: false,
			},
		};
	}

	return {
		props: { allProducts, session },
	};
}
