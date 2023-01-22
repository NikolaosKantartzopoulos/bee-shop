import React from "react";
import Link from "next/link";

import styles from "./Navbar.module.css";

function Navbar() {
	return (
		<nav className={styles.mainNavbar}>
			<Link href={"/shop"}>Shop</Link>
			<Link href={"/about-us"}>About us</Link>
			<Link href={"/contact"}>Contact</Link>
			<Link href={"/admin"}>Admin</Link>
		</nav>
	);
}

export default Navbar;
