import React, { useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./Navbar.module.css";

function Navbar() {
	const [adminTabVisible, setAdminTabVisible] = useState(true);
	const router = useRouter();
	return (
		<nav className={styles.mainNavbar}>
			{adminTabVisible && (
				<div
					className={styles.myModule}
					onClick={() => setAdminTabVisible(false)}
				></div>
			)}
			<Link
				href={"/shop"}
				style={{ backgroundColor: router.pathname === "/shop" ? "red" : null }}
			>
				Shop
			</Link>
			<Link
				href={"/about-us"}
				style={{
					backgroundColor: router.pathname === "/about-us" ? "red" : null,
				}}
			>
				About
			</Link>
			<Link
				href={"/contact"}
				style={{
					backgroundColor: router.pathname === "/contact" ? "red" : null,
				}}
			>
				Contact
			</Link>
			<div
				className={styles.linkPlaceholder}
				onClick={() => setAdminTabVisible(!adminTabVisible)}
			>
				{/* <Link
					href={"/admin"}
					style={{
						backgroundColor: router.pathname === "/admin" ? "red" : null,
					}}
				> */}
				Admin
				{/* </Link> */}
				<div
					className={
						adminTabVisible ? styles.hoverTabVisible : styles.hoverTabHidden
					}
				>
					<Link href="/admin/add-product">Add product</Link>
					<Link href="/admin/products-table">Handle products</Link>
					<Link href="/admin/handle-newsletter">Newsletter</Link>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
