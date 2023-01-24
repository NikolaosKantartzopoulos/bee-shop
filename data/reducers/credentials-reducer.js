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
