export const isRequesting = (state) => {
	return state.app.getIn(['isRequesting'])
};

export const appInitiated = (state) => {
	return state.app.getIn(['appInitiated'])
};

export const appFailure = (state) => {
	return state.app.getIn(['appFailure'])
};

export const isRequestingAppValid = (state) => {
	return state.app.getIn(['isRequestingAppValid'])
};

export const isAppValid = (state) => {
	console.log(state)
	return state.app.getIn(['isAppValid'])
};
