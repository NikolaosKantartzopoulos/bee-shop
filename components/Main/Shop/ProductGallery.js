import React, { useContext } from "react";
import ProductSlot from "./ProductSlot";

import ShowcaseContext from "../../../data/context/showcase-context";

import LoadingSpinner from "../../UI/LoadingSpinner";

import shopStyles from "./Shop.module.css";
import styles from "./ShopGallery.module.css";

function ProductGallery() {
	const showcaseCtx = useContext(ShowcaseContext);
	const allProducts = (
		<div className={styles.shopGallerySection} id="showcase">
			{showcaseCtx.itemsShowcased.length > 0 ? (
				showcaseCtx.itemsShowcased
					.sort((a, b) => (a.title > b.title ? 1 : -1))
					.map((a) => <ProductSlot product={a} key={a._id} />)
			) : (
				<p>No items...</p>
			)}
		</div>
	);

	if (!showcaseCtx.itemsShowcased) {
		return <LoadingSpinner />;
	}

	return (
		<div
			className={shopStyles.ProductGallerySection}
			id="productGallerySection"
		>
			{allProducts}
		</div>
	);
}

export default ProductGallery;
