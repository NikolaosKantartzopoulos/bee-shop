import "../styles/globals.css";

import { CartContextProvider } from "../data/context/cart-context";
import { ShowcaseContextProvider } from "../data/context/showcase-context";
import { URLContextProvider } from "../data/context/url-context";

import Layout from "../components/Helper/Layout";

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
