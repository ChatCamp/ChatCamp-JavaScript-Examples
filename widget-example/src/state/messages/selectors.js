export const getThreadMessages = (state, threadId) => {
  debug("messages", state.messages.getIn([threadId]))
	return state.messages.getIn([threadId])
};
