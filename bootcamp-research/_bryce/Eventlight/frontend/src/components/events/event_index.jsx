import React from 'react';
import { withRouter } from 'react-router-dom';
import EventIndexItem from './event_index_item';
import EventIndexItemWithDate from './event_index_item_w_date';
import LikeInSquareWithDate from '../likes/likes_in_square';
import SearchBarContainer from '../search/search_bar_container';
import '../../styles/event_index.css';

class EventIndex extends React.Component {
	componentDidMount() {
		this.props.fetchEvents(this.props.searchFilters);
	}

	componentDidUpdate(prevProps) {
		if (this.props.searchFilters !== prevProps.searchFilters) {
			this.props.fetchEvents(this.props.searchFilters);
		}
	}

	render() {
		const indexType = this.props.location.pathname === '/' ? 'grid' : 'list';
		const searchBar = this.props.location.pathname === '/events' ? <SearchBarContainer classPrefix="index" /> : null;
		let eventIndexListClass = '';
		if (this.props.location.pathname === '/events' || this.props.location.pathname === '/likes') {
			eventIndexListClass = 'event-index-list__main-index';
		}

		let eventIndexItems;
		if (this.props.events.length) {
			eventIndexItems = this.props.events.map(
				event =>
					this.props.useDateComponent ? (
						<EventIndexItemWithDate key={`eventDate:${event._id}`} event={event} />
					) : this.props.useSquareComponent ? (
						<LikeInSquareWithDate key={`eventLike:${event._id}`} event={event} />
					) : (
						<EventIndexItem key={`event:${event._id}`} event={event} />
					)
			);
		} else {
			eventIndexItems = <div className="no-events-found">No Events Found</div>;
		}

		return (
			<div className="event-index-wrapper">
				{searchBar}
				<ul className={`event-index-${indexType} ${eventIndexListClass}`}>{eventIndexItems}</ul>
			</div>
		);
	}
}

export default withRouter(EventIndex);
