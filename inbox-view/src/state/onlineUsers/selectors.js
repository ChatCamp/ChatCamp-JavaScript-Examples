export const getGlobalOnlineUsers = (state) => {
	return state.onlineUsers.get('global')
};
export const getOnlineUsersCount = (state) => {
	return state.onlineUsers.get('global').size
};
