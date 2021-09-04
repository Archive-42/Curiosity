import React from 'react'
import { AuthRoute, ProtectedRoute } from '../util/route_util'
import { Switch, Route } from 'react-router-dom'

import MainPageContainer from './main/main_page_container.js'

import NavBarContainer from './nav/navbar_container'
import LoginFormContainer from './session/login_form_container'
import RegisterFormContainer from './session/register_form_container'
import EventIndexContainer from './events/event_index_container'
import EventShowContainer from './events/event_show_container'
import LikeIndexContainer from './likes/like_index_container'
import RegistrationsPage from './registrations/registrations_page'
import ManageEventsContainer from "./events/manage_events_container"
import CreateEventContainer from './events/event_create_form_container'
import EditEventContainer from './events/event_edit_form_container'

import SignInErrorModal from './modals/signin_error_modal'

const style = {
	fontFamily: `Neue Plak,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif`
}

const App = () => (
	<div style={style}>
		<SignInErrorModal />
		<NavBarContainer />
		<Switch>
			<Route exact path="/" component={MainPageContainer} />
			<AuthRoute exact path="/login" component={LoginFormContainer} />
			<AuthRoute exact path="/register" component={RegisterFormContainer} />
			<Route exact path="/events" component={EventIndexContainer} />
			<Route exact path="/events/:eventId" component={EventShowContainer} />
			<ProtectedRoute exact path="/events/:eventId/edit" component={EditEventContainer} />
			<ProtectedRoute exact path="/likes" component={LikeIndexContainer} />
			<ProtectedRoute exact path="/registrations" component={RegistrationsPage} />
			<ProtectedRoute exact path="/myevents/create" component={CreateEventContainer} />
      <ProtectedRoute exact path="/myevents" component={ManageEventsContainer} />
		</Switch>
	</div>
)

export default App
