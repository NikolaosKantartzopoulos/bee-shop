import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./Navbar.module.css";

function Navbar() {
	const router = useRouter();
	return (
		<nav className={styles.mainNavbar}>
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
				About us
			</Link>
			<Link
				href={"/contact"}
				style={{
					backgroundColor: router.pathname === "/contact" ? "red" : null,
				}}
			>
				Contact
			</Link>
			<Link
				href={"/admin"}
				style={{ backgroundColor: router.pathname === "/admin" ? "red" : null }}
			>
				Admin
			</Link>
		</nav>
	);
}

export default Navbar;
