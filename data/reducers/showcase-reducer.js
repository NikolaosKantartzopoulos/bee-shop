export function showcaseReducer(state, action) {
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
