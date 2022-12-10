import "../styles/globals.css";

import { CartContextProvider } from "../data/CartContext";
import { ShowcaseContextProvider } from "../data/ShowcaseContext";

import Layout from "../components/Header/Layout";

function MyApp({ Component, pageProps }) {
	return (
		<ShowcaseContextProvider>
			<CartContextProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</CartContextProvider>
		</ShowcaseContextProvider>
	);
}

export default MyApp;
