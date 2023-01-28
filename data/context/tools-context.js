import React, { createContext, useState } from "react";

const ToolsContext = createContext({
	dropdownOpen: "",
	setDropdownOpen: () => {},
	order: "",
	setOrder: () => {},
});

export function ToolsContextProvider(props) {
	const [dropdownOpen, setDropdownOpen] = useState("");
	const [info, setInfo] = useState(null);
	const toolsContext = { dropdownOpen, setDropdownOpen, info, setInfo };
	return (
		<ToolsContext.Provider value={toolsContext}>
			{props.children}
		</ToolsContext.Provider>
	);
}

export default ToolsContext;
