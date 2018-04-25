export const isSmartChatOpen = (state) => {
	return state.smartChat.getIn(['isSmartChatOpen'])
};

export const isSmartChatListOpen = (state) => {
	return state.smartChat.getIn(['isSmartChatListOpen'])
};
