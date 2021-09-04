import { connect } from "react-redux";
import ManageEvents from "./manage_events";
import { fetchCurrentUsersEvents } from "../../actions/event_actions";

const mstp = state => {
  return {
    currentUser: state.session.user,
    currentUsersEvents: state.events.current_users_events
  };
};

const mdtp = dispatch => {
  return {
    fetchCurrentUsersEvents: currentUserId => dispatch(fetchCurrentUsersEvents(currentUserId))
  };
};

export default connect(mstp, mdtp)(ManageEvents);