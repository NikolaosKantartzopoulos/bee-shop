import Header from "../Header/Header";
import Footer from "../Footer/Footer.js";
import ToolsContext from "../../data/context/tools-context.js";
import { useContext } from "react";

export default function Layout({ children }) {
	const toolsCtx = useContext(ToolsContext);
	return (
		<>
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
			<div style={{ minHeight: "100vh", position: "relative" }}>
				<Header />
				<main style={{ minHeight: "calc(100vh - 5rem)" }}>{children}</main>
				<Footer style={{ position: "absolute", bottom: 0 }} />
			</div>
		</>
	);
}
