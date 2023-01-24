import React, { useReducer, useContext, useState, useEffect } from "react";
import ShowcaseContext from "../../../data/context/showcase-context";
import SidebarFrom from "./PoductSidebarComponents/SidebarFrom";
import SidebarPrice from "./PoductSidebarComponents/SidebarPrice";
import SidebarSize from "./PoductSidebarComponents/SidebarSize";
import Button from "../../UI/Button";
import styles from "./Shop.module.css";

function inputStateReducer(state, action) {
	switch (action.type) {
		case "setLowerPrice":
			return { ...state, lowerPrice: action.lowerPrice };
		case "setHigherPrice":
			return { ...state, higherPrice: action.higherPrice };
		case "setFrom":
			return { ...state, selectedFrom: action.fromInputValue };
		case "setSizeLowest":
			return { ...state, sizeLowest: action.sizeLowest };
		case "setSizeHighest":
			return { ...state, sizeHighest: action.sizeHighest };
		case "resetInputs":
			return {
				selectedFrom: "All",
				lowerPrice: 0,
				higherPrice: 50,
				sizeLowest: 0,
				sizeHighest: 1000,
			};
	}
}

function ProductSidebar() {
	const showcaseCtx = useContext(ShowcaseContext);

	const [inputState, dispatchInputStateAction] = useReducer(inputStateReducer, {
		selectedFrom: "All",
		lowerPrice: 0,
		higherPrice: 50,
		sizeLowest: 0,
		sizeHighest: 1000,
	});

	function handleFromSelection(e) {
		dispatchInputStateAction({
			type: "setFrom",
			fromInputValue: e.target.value,
		});
	}

	function handleSubmitForm(e) {
		e.preventDefault();
		showcaseCtx.filter(
			inputState.selectedFrom,
			inputState.lowerPrice,
			inputState.higherPrice,
			inputState.sizeLowest,
			inputState.sizeHighest
		);
	}

	return (
		<form className={styles.sidebarSection} onSubmit={handleSubmitForm}>
			<SidebarFrom
				handleFromSelection={handleFromSelection}
				inputState={inputState}
				products={showcaseCtx.showcaseDatabase}
			/>
			<SidebarPrice
				dispatchInputStateAction={dispatchInputStateAction}
				inputState={inputState}
			/>
			<SidebarSize
				dispatchInputStateAction={dispatchInputStateAction}
				inputState={inputState}
			/>
			<h3>Search!</h3>
			<Button onClick={() => dispatchInputStateAction({ type: "resetInputs" })}>
				Clear All
			</Button>
			<Button type="submit">Submit</Button>
		</form>
	);
}

export default ProductSidebar;
