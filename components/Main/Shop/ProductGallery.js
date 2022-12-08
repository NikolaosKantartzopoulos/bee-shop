import React from "react";
import ProductSlot from "./ProductSlot";

import shopStyles from "./Shop.module.css";
import styles from "./ShopGallery.module.css";

function ProductGallery({ products }) {
	const allProducts = (
		<div className={styles.shopGallerySection}>
			{products.map((a) => (
				<ProductSlot product={a} key={a.title} />
			))}
		</div>
	);
	return (
		<div className={shopStyles.ProductGallerySection}>
			<h3>ProductGallery</h3>
			{allProducts}
		</div>
	);
}

export default ProductGallery;
