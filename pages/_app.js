import "../styles/globals.css";

import { CartContextProvider } from "../data/CartContext";

import Navbar from "../components/Header/Navbar/Navbar";

function MyApp({ Component, pageProps }) {
	return (
		<CartContextProvider>
			<Navbar />
			<Component {...pageProps} />
		</CartContextProvider>
	);
}

export default MyApp;
