import React, { createContext, useState } from "react";

const ToolsContext = createContext({
	dropdownOpen: "",
	setDropdownOpen: () => {},
});

export function ToolsContextProvider(props) {
	const [dropdownOpen, setDropdownOpen] = useState("");

	const toolsContext = { dropdownOpen, setDropdownOpen };
	return (
		<ToolsContext.Provider value={toolsContext}>
			{props.children}
		</ToolsContext.Provider>
	);
}

export default ToolsContext;
