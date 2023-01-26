export function cartReducer(state, action) {
	switch (action.type) {
		case "ADD":
			let distinctItemIds = state.items.map((i) => i._id);
			if (!distinctItemIds.includes(action.item._id)) {
				return {
					items: [...state.items, { ...action.item, numberOfItems: 1 }],
					totalCost: Number(state.totalCost) + Number(action.item.price),
				};
			} else {
				let editThisItem = state.items.find((i) => i._id == action.item._id);
				return {
					items: [
						...state.items.filter((i) => i._id != action.item._id),
						{ ...editThisItem, numberOfItems: editThisItem.numberOfItems + 1 },
					],
					totalCost: Number(state.totalCost) + Number(editThisItem.price),
				};
			}
			break;
		case "REMOVE":
			let selectedItemInCart = state.items.find(
				(i) => i._id == action.item._id
			);
			let filteredItems = [
				...state.items.filter((i) => i._id != action.item._id),
			];
			if (selectedItemInCart.numberOfItems == 1) {
				return {
					items: filteredItems,
					totalCost: Number(state.totalCost) - Number(selectedItemInCart.price),
				};
			} else {
				return {
					items: [
						...filteredItems,
						{
							...selectedItemInCart,
							numberOfItems: selectedItemInCart.numberOfItems - 1,
						},
					],
					totalCost: Number(state.totalCost) - Number(selectedItemInCart.price),
				};
			}
		case "EMPTY":
			return defaultCartState;
	}
}

export const defaultCartState = {
	items: [],
	totalCost: 0,
};
