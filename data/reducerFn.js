export function addProductReducer(state, action) {
	switch (action.type) {
		case "setTitle": {
			return { ...state, title: action.title };
		}
		case "setHarvestedFrom": {
			return { ...state, harvestedFrom: action.harvestedFrom };
		}
		case "setPrice": {
			return { ...state, price: action.price };
		}
		case "setSize": {
			return { ...state, size: action.size };
		}
		case "setUrl": {
			return { ...state, url: action.url };
		}
	}
}

export function credentialsReducer(state, action) {
	switch (action.type) {
		case "setUsername": {
			return { ...state, username: action.username };
		}
		case "setEmail": {
			return { ...state, email: action.email };
		}
		case "setPassword": {
			return { ...state, password: action.password };
		}
	}
}

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

export function urlReducer(state, action) {
	return;
}
