import EventIndex from '../events/event_index';
import React from 'react';
import '../../styles/like.css';
import { withRouter, Link } from 'react-router-dom';

const LikesPage = props => {

  const ticketsLink = props.location.pathname === "/" ? null : (
    <div className="top-mini-nav">
      <i className="fas fa-chevron-left" />
      <Link to="/registrations">
        <span>Tickets</span>
      </Link>
    </div>
  );

  return (
    <div className="likes-page">
      {ticketsLink}
      <h1>Likes</h1>
      <EventIndex {...props} />
    </div>
  )
}

export default withRouter(LikesPage);