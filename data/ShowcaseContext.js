import React, { createContext, useReducer, useState } from "react";

import { showcaseReducer } from "../data/reducerFn";

const ShowcaseContext = createContext({
	itemsShowcased: [],
	showcaseDatabase: [],
	resetShowcase: (items) => {},
	filter: (
		selectedFrom,
		lowerPrice,
		higherPrice,
		sizeLowest,
		sizeHighest
	) => {},
	setShowcaseDatabase: (items) => {},
});

export function ShowcaseContextProvider(props) {
	const [showcaseDatabase, setShowcaseDatabase] = useState([]);
	const [itemsShowcased, dispatchShowcaseAction] = useReducer(showcaseReducer, {
		itemsShowcased: [],
	});

	function resetShowcase(products) {
		if (products) {
			dispatchShowcaseAction({ type: "default", items: products });
		} else {
			dispatchShowcaseAction({ type: "default", items: showcaseDatabase });
		}
	}

	function filter(
		selectedFrom,
		lowerPrice,
		higherPrice,
		sizeLowest,
		sizeHighest
	) {
		resetShowcase();
		dispatchShowcaseAction({
			type: "filter",
			selectedFrom: selectedFrom,
			lowerPrice: lowerPrice,
			higherPrice: higherPrice,
			sizeLowest: sizeLowest,
			sizeHighest: sizeHighest,
		});
	}

	const showcaseContext = {
		itemsShowcased: itemsShowcased,
		showcaseDatabase: showcaseDatabase,
		resetShowcase: resetShowcase,
		setShowcaseDatabase: setShowcaseDatabase,
		filter: filter,
	};

	return (
		<ShowcaseContext.Provider value={showcaseContext}>
			{props.children}
		</ShowcaseContext.Provider>
	);
}

export default ShowcaseContext;
