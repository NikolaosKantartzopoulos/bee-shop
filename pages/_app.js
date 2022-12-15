import "../styles/globals.css";

import { CartContextProvider } from "../data/CartContext";
import { ShowcaseContextProvider } from "../data/ShowcaseContext";
import { URLContextProvider } from "../data/url-context";

import Layout from "../components/Header/Layout";

function MyApp({ Component, pageProps }) {
	return (
		<URLContextProvider>
			<ShowcaseContextProvider>
				<CartContextProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</CartContextProvider>
			</ShowcaseContextProvider>
		</URLContextProvider>
	);
}

export default MyApp;
