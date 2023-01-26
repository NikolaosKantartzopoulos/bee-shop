import React, { useReducer, useContext, useState, useEffect } from "react";
import ShowcaseContext from "../../../data/context/showcase-context";
import SidebarFrom from "./PoductSidebarComponents/SidebarFrom";
import SidebarPrice from "./PoductSidebarComponents/SidebarPrice";
import SidebarSize from "./PoductSidebarComponents/SidebarSize";
import Button from "../../UI/Button";
import styles from "./PoductSidebarComponents/ProductsSidebarComponents.module.css";
import ToolsContext from "../../../data/context/tools-context";

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

function ProductSidebar({ sidebarVisible, setSidebarVisible }) {
	const showcaseCtx = useContext(ShowcaseContext);
	const toolsCtx = useContext(ToolsContext);

	const [inputState, dispatchInputStateAction] = useReducer(inputStateReducer, {
		selectedFrom: "All",
		lowerPrice: 0,
		higherPrice: 50,
		sizeLowest: 0,
		sizeHighest: 1000,
	});

	function handleFromSelection(e) {
		console.log(e.target.value);
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
		<form
			className={`${styles.sidebarSection} ${
				toolsCtx.dropdownOpen == "filterSidebarVisible"
					? styles.sidebarVisible
					: styles.sidebarHidden
			}`}
			onSubmit={handleSubmitForm}
		>
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
			<div className={styles.controlButtonsDiv}>
				<Button onClick={() => showcaseCtx.resetShowcase()}>Clear</Button>
				<Button type="submit">Search</Button>
			</div>
		</form>
	);
}

export default ProductSidebar;
