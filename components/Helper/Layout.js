import Header from "../Header/Header";
import Footer from "../Footer/Footer.js";

export default function Layout({ children }) {
	return (
		<div style={{ minHeight: "100vh", position: "relative" }}>
			<Header />
			<main style={{ paddingBottom: "2.5rem" }}>{children}</main>
			<Footer />
		</div>
	);
}
