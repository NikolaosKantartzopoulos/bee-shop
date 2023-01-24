export function cartReducer(state, action) {
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
		case "EMPTY":
			return defaultCartState;
	}
}

export const defaultCartState = {
	items: [],
	totalAmount: 0,
};
