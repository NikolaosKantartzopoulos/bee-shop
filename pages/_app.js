import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";

import { CartContextProvider } from "../data/context/cart-context";
import { ShowcaseContextProvider } from "../data/context/showcase-context";
import { URLContextProvider } from "../data/context/url-context";
import { ToolsContextProvider } from "../data/context/tools-context";

import Layout from "../components/Helper/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<URLContextProvider>
			<ToolsContextProvider>
				<ShowcaseContextProvider>
					<CartContextProvider>
						<SessionProvider session={session}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</SessionProvider>
					</CartContextProvider>
				</ShowcaseContextProvider>
			</ToolsContextProvider>
		</URLContextProvider>
	);
}

export default MyApp;
