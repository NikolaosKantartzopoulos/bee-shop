import React, { createContext, useReducer, useState } from "react";

import { urlReducer } from "../helper/reducerFn";

const UrlContext = createContext({ dbURL: "" });

export function URLContextProvider(props) {
	const dbURL =
		"mongodb+srv://NikolaosKantartzopoulos:Kalamarakia_1234@cluster0.pvjhsk4.mongodb.net/?retryWrites=true&w=majority";
	const urlContext = { dbURL };
	return (
		<UrlContext.Provider value={urlContext}>
			{props.children}
		</UrlContext.Provider>
	);
}

export default UrlContext;
