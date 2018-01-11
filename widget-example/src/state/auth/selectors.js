export const isLoggedIn = (state) => {
	return state.auth.getIn(['isLoggedIn'])
};

export const getAppId = (state) => {
	return state.auth.getIn(['appId'])
};

export const getApiKey = (state) => {
	return state.auth.getIn(['apiKey'])
};
