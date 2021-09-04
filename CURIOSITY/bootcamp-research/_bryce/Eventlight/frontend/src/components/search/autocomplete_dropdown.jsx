import React from 'react';
import { Link } from 'react-router-dom';
const moment = require('moment');

class AutocompleteDropdown extends React.Component {
	runAutocomplete(value) {
		return event => {
			this.props.autocomplete(value);
		};
	}

	render() {
		const { dropdownType } = this.props;
		const listItems = this.props[dropdownType].map(val => {
			if (dropdownType === 'events') {
				return (
					<li key={val._id} className="autocomplete-dropdown-list-item">
						<Link to={`/events/${val._id}`}>
							<div className="autocomplete-dropdown-list-item-img-container">
								<img className="autocomplete-dropdown-image" src={`${val.image_url}`} alt="event preview" />
							</div>
							<div className="autocomplete-dropdown-list-item-primary">
								{val.title}
								<div className="autocomplete-dropdown-list-item-secondary">
									{moment(new Date(val.start_date)).format('llll')}
								</div>
								<div className="autocomplete-dropdown-list-item-tertiary">
									{`${val.location.location_name || val.location.location_address} ${val.city_info.city}, ${val
										.city_info.state}`}
								</div>
							</div>
						</Link>
					</li>
				);
			} else {
				return (
					<li key={val._id} className="autocomplete-dropdown-list-item" onClick={this.runAutocomplete(val.city)}>
						<div className="autocomplete-dropdown-list-item-text-container">
							<div className="autocomplete-dropdown-list-item-primary">
								{val.city}
								<div className="autocomplete-dropdown-list-item-secondary">{val.state}, United States</div>
							</div>
						</div>
					</li>
				);
			}
		});

		return (
			<div
				className={`autocomplete-dropdown-${this.props.dropdownShow} autocomplete-dropdown-${this.props.dropdownType}`}
			>
				<h3>{dropdownType === 'events' ? 'Events' : 'Locations'}</h3>
				<ul className="autocomplete-dropdown-list">
					{listItems.length ? (
						listItems
					) : (
						<li className="autocomplete-dropdown-list-item-none">{`No ${dropdownType} found`}</li>
					)}
				</ul>
			</div>
		);
	}
}

export default AutocompleteDropdown;
