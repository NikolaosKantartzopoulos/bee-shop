import React, { useState } from "react";

import { useRouter } from "next/router";

import Link from "next/link";

import styles from "./Navbar.module.css";
import { useSession } from "next-auth/react";

function Navbar({ setInProp }) {
	const { data: session } = useSession();

	const [adminTabVisible, setAdminTabVisible] = useState(false);
	const router = useRouter();
	const currentRoute = router.pathname;
	return (
		<nav className={styles.mainNavbar}>
			{adminTabVisible && (
				<div
					className={styles.myModule}
					onClick={() => setAdminTabVisible(false)}
				></div>
			)}
			{session && (
				<Link
					href={"/shop"}
					onClick={() => {
						if (currentRoute === "/shop") {
							return;
						}
						setInProp(false);
					}}
					style={{
						backgroundColor: router.pathname === "/shop" ? "red" : null,
					}}
				>
					Shop
				</Link>
			)}
			<Link
				href={"/about-us"}
				onClick={() => {
					if (currentRoute === "/about-us") {
						return;
					}
					setInProp(false);
				}}
				style={{
					backgroundColor: router.pathname === "/about-us" ? "red" : null,
				}}
			>
				About
			</Link>
			<Link
				href={"/contact"}
				onClick={() => {
					if (currentRoute === "/contact") {
						return;
					}
					setInProp(false);
				}}
				style={{
					backgroundColor: router.pathname === "/contact" ? "red" : null,
				}}
			>
				Contact
			</Link>

			{session && (
				<div
					className={styles.linkPlaceholder}
					onClick={() => setAdminTabVisible(!adminTabVisible)}
				>
					Admin
					<div
						className={
							adminTabVisible ? styles.hoverTabVisible : styles.hoverTabHidden
						}
					>
						<Link
							onClick={() => {
								if (currentRoute === "/admin/add-product") {
									return;
								}
								setInProp(false);
							}}
							href="/admin/add-product"
						>
							Add product
						</Link>
						<Link
							onClick={() => {
								if (currentRoute === "/admin/products-table") {
									return;
								}
								setInProp(false);
							}}
							href="/admin/products-table"
						>
							Handle products
						</Link>
						<Link
							onClick={() => {
								if (currentRoute === "/admin/manage-orders") {
									return;
								}
								setInProp(false);
							}}
							href="/admin/manage-orders"
						>
							Manage orders
						</Link>
						<Link
							onClick={() => {
								if (currentRoute === "/admin/handle-newsletter") {
									return;
								}
								setInProp(false);
							}}
							href="/admin/handle-newsletter"
						>
							Newsletter
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
}

export default Navbar;
