import React, { useContext } from "react";
import ProductSlot from "./ProductSlot";

import ShowcaseContext from "../../../data/ShowcaseContext";

import shopStyles from "./Shop.module.css";
import styles from "./ShopGallery.module.css";

function ProductGallery({ products }) {
	const showcaseCtx = useContext(ShowcaseContext);

	const allProducts = (
		<div className={styles.shopGallerySection} id="showcase">
			{showcaseCtx.itemsShowcased.length > 0 ? (
				showcaseCtx.itemsShowcased
					.sort((a, b) => (a.title > b.title ? 1 : -1))
					.map((a) => <ProductSlot product={a} key={a.title} />)
			) : (
				<p>No items...</p>
			)}
		</div>
	);
	return (
		<div
			className={shopStyles.ProductGallerySection}
			id="productGallerySection"
		>
			<h3>ProductGallery</h3>
			{allProducts}
		</div>
	);
}

export default ProductGallery;
