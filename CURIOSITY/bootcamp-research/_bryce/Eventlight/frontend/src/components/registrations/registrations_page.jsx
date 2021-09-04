import React from 'react'
import '../../styles/registrations.css'
import Profile from '../users/profile'
import CurrentTickets from './current_tickets'
import PastTickets from './past_tickets'
import LikesOnRegistrationPage from './likes_on_reg_page'

export default props => (
  <div className="registrations-page">
    <Profile />
    <div className="tickets-likes-section">
      <CurrentTickets />
      <PastTickets />
      <hr/>
      <LikesOnRegistrationPage />
    </div>
  </div>
)
