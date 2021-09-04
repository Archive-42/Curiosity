export const loggedIn = state => state.session.isAuthenticated

export const numLiked = state => (state.session.isAuthenticated ? state.session.user.liked_events.length : 0)

export const numRegistrations = state => (state.session.isAuthenticated ? state.session.user.registrations.length : 0)

export const isLiked = (state, id) => {
	if (!state.session.user || !state.session.user.liked_events) return false
	return state.session.user.liked_events.indexOf(id) >= 0
}

export const isRegistered = (state, id) => {
	if (!state.session.user || !state.session.user.registrations) return false
	return state.session.user.registrations.indexOf(id) >= 0
}
