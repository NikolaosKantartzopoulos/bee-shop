import React, { createContext } from "react";

const UrlContext = createContext({ dbURL: "" });

export function URLContextProvider(props) {
	const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.${process.env.DB_STRING}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

	const urlContext = { dbURL };
	return (
		<UrlContext.Provider value={urlContext}>
			{props.children}
		</UrlContext.Provider>
	);
}

export default UrlContext;
