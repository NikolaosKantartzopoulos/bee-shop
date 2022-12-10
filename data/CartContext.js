import React, { createContext, useReducer } from "react";

const CartContext = createContext({
	items: [],
	totalAmount: 0,
	addItem: (item) => {},
	removeItem: (item) => {},
	getAmountOfItemsInCart: () => {},
});

function cartReducer(state, action) {
	let shouldReplace = false;
	switch (action.type) {
		case "ADD":
			const newState = state.items.map((item) => {
				if (item.id === action.item.id) {
					shouldReplace = true;
					const updatedAmount = item.amount + action.item.amount;
					return { ...item, amount: updatedAmount };
				}
				return item;
			});

			const updatedTotalAmount =
				state.totalAmount + action.item.price * action.item.amount;

			if (shouldReplace) {
				return { items: newState, totalAmount: updatedTotalAmount };
			} else {
				const updatedItems = [...state.items, action.item];
				return { items: updatedItems, totalAmount: updatedTotalAmount };
			}
		case "REMOVE":
			let shouldEraseItem = false;
			let overkillBy = 0;
			const removeState = state.items.map((item) => {
				if (item.id === action.item.id) {
					shouldReplace = true;
					const updatedAmount = item.amount - action.item.amount;
					if (updatedAmount <= 0) {
						shouldReplace = false;
					}
					return { ...item, amount: updatedAmount };
				}
				return item;
			});

			const updatedDecreasedAmount =
				state.totalAmount - action.item.price * action.item.amount;

			if (shouldReplace) {
				return { items: removeState, totalAmount: updatedDecreasedAmount };
			} else {
				const updatedItems = state.items.filter((a) => a.id !== action.item.id);
				return { items: updatedItems, totalAmount: updatedDecreasedAmount };
			}
			return defaultCartState;
	}
}

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

export function CartContextProvider(props) {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	function addItemToCartHandler(item) {
		dispatchCartAction({
			type: "ADD",
			item: item,
		});
	}

	function removeItemFromCartHandler(item) {
		dispatchCartAction({
			type: "REMOVE",
			item: item,
		});
	}

	function getAmountOfItemsInCart() {
		return cartState.items.reduce(
			(accumulator, item) => accumulator + item.amount,
			0
		);
	}

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		getAmountOfItemsInCart: getAmountOfItemsInCart,
	};
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
}

export default CartContext;
