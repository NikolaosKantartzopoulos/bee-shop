import React, { createContext, useReducer, useState } from "react";

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

function showcaseReducer(state, action) {
	switch (action.type) {
		case "filter":
			const newState = state
				.filter((a) => {
					if (action.selectedFrom == "All") {
						return true;
					} else if (a.from == action.selectedFrom) {
						return true;
					}
				})
				.filter((a) => {
					if (a.price >= action.lowerPrice && a.price <= action.higherPrice) {
						return true;
					}
				})
				.filter((a) => {
					if (a.size >= action.sizeLowest && a.size <= action.sizeHighest) {
						return true;
					}
				});

			return newState;
		case "default":
			return action.items;
	}
}

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
