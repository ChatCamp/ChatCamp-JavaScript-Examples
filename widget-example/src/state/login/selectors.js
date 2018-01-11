export const isRequesting = (state) => {
	return state.login.getIn(['isRequesting'])
};
export const loginFail = (state) => {
	return state.login.getIn(['loginFail'])
};
