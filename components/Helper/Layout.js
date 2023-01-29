import { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

import { CSSTransition } from "react-transition-group";

import Header from "../Header/Header";
import Footer from "../Footer/Footer.js";
import ToolsContext from "../../data/context/tools-context.js";
import { useContext } from "react";

import InfoPanel from "../UI/InfoPanel";

import styles from "./Layout.module.css";

export default function Layout({ children }) {
	const router = useRouter();

	const toolsCtx = useContext(ToolsContext);

	const [inProp, setInProp] = useState(false);
	const nodeRef = useRef(null);

	useEffect(() => {
		setInProp(true);
	}, [router.pathname]);

	return (
		<>
			<InfoPanel />
			<div style={{ minHeight: "100vh", position: "relative" }}>
				<Header setInProp={setInProp} />
				<CSSTransition
					nodeRef={nodeRef}
					in={inProp}
					timeout={250}
					classNames={{ ...styles }}
					mountOnEnter
					unmountOnExit
				>
					<main style={{ minHeight: "calc(100vh - 5rem)" }} ref={nodeRef}>
						{toolsCtx.dropdownOpen && (
							<div
								style={{
									position: "absolute",
									width: "100vw",
									height: "100vh",
									zIndex: 3,
								}}
								onClick={() => toolsCtx.setDropdownOpen("")}
							/>
						)}
						{children}
					</main>
				</CSSTransition>
				<Footer />
			</div>
		</>
	);
}
