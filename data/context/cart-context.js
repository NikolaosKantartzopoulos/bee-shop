import React, { createContext, useReducer } from "react";
import { cartReducer, defaultCartState } from "../reducers/cart-reducer";

const CartContext = createContext({
	cartState: {},
	totalAmount: 0,
	addItem: (item) => {},
	removeItem: (item) => {},
	getAmountOfItemsInCart: () => {},
	emptyCart: () => {},
});

export function CartContextProvider(props) {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	function addItemToCartHandler(item) {
		// console.log(item);
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
			(accumulator, item) => accumulator + item.numberOfItems,
			0
		);
	}

	function emptyCart() {
		dispatchCartAction({
			type: "EMPTY",
		});
	}

	const cartContext = {
		cartState: cartState,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		getAmountOfItemsInCart: getAmountOfItemsInCart,
		emptyCart: emptyCart,
	};
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
}

export default CartContext;
