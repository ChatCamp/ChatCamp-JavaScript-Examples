export const getThreads = (state) => {
	return state.threads
};
export const getThreadState = (state, threadId) => {
	return state.threads.getIn([threadId,"threadState"])
};
