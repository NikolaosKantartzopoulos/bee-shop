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
