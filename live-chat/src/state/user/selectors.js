export const getUsername = (state) => {
	return state.user.getIn(['user_name'])
};
export const getUserId = (state) => {
	return state.user.getIn(['id'])
};
