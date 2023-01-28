import React, { createRef, useContext, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import ToolsContext from "../../data/context/tools-context";

import styles from "./InfoPanel.module.css";

function InfoPanel() {
	const { info } = useContext(ToolsContext);
	const nodeRef = createRef(null);
	const [inProp, setInProp] = useState(false);

	const [infoText, setInfoText] = useState("");
	const [infoType, setInfoType] = useState("");

	useEffect(() => {
		if (info) {
			setInfoText(info.text);
			setInfoType(info.type);
			setInProp(true);
			setTimeout(() => {
				setInProp(false);
				setInfoText(null);
			}, 3000);
		} else {
			setInProp(false);
			setInfoText(null);
		}
	}, [info]);

	return (
		<CSSTransition
			in={inProp}
			timeout={300}
			classNames={{ ...styles }}
			nodeRef={nodeRef}
			mountOnEnter
			unmountOnExit
		>
			<div
				ref={nodeRef}
				style={{
					backgroundColor:
						infoType == "error"
							? "darkred"
							: infoType == "ok"
							? "green"
							: "darkorange",
				}}
				className={styles.infoPanel}
			>
				{/* {info.text} */}
				<div>{infoText}</div>
			</div>
		</CSSTransition>
	);
}

export default InfoPanel;
