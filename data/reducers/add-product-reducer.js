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
