export const getThreadMessages = (state, threadId) => {
  console.log("messages", state.messages.getIn([threadId]))
	return state.messages.getIn([threadId])
};
