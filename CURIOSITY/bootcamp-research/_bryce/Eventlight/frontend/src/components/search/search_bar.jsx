import React from 'react';
import { withRouter } from 'react-router-dom';
import Calendar from 'react-calendar';
import AutocompleteDropdown from './autocomplete_dropdown';
import * as SearchUtil from '../../util/search_util';
import '../../styles/index_search.css';
import '../../styles/splash_search.css';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			event: '',
			city: '',
			date: '',
			eventsDropdownShow: 'hidden',
			citiesDropdownShow: 'hidden',
			calendarShow: false,
			calendarClass: 'hidden'
		};

		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.debouncedFetchCitiesAuto = SearchUtil.debounce(this.fetchCityValues.bind(this), 500).bind(this);
		this.debouncedFetchEventsAuto = SearchUtil.debounce(this.fetchEventValues.bind(this), 500).bind(this);
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.closeCalendar = this.closeCalendar.bind(this);
		this.handleInputFromCalendar = this.handleInputFromCalendar.bind(this);
		this.getSelectText = this.getSelectText.bind(this);
		this.clearInput = this.clearInput.bind(this);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.toggleDropdown);
		if (this.props.location.pathname === '/events') this.props.clearFilters();
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.toggleDropdown);
		setTimeout(() => this.props.fetchEventsAuto({ events: '' }), 3000);
	}

	fetchEventValues() {
		this.props.fetchEventsAuto({ events: this.state.event });
	}

	fetchCityValues() {
		this.props.fetchCitiesAuto({ city: this.state.city });
	}

	handleInput(field) {
		const pluralizedField = field === 'event' ? 'Events' : 'Cities';
		return event => {
			if (field === 'date') {
				if (event.target.value === 'Pick a date...') {
					this.setState({ calendarShow: true, calendarClass: 'active', date: '' });
				} else {
					const datesAsIntegers = event.target.value.split(',').map(date => parseInt(date));
					this.setState({ date: datesAsIntegers });
				}
			} else {
				this.setState({ [field]: event.target.value });
				this[`debouncedFetch${pluralizedField}Auto`]();
			}
		};
	}

	handleSubmit(event) {
		event.preventDefault();
		const filterParams = {
			title: this.state.event,
			city: this.state.city,
			start_date: this.state.date[0],
			end_date: this.state.date[1]
		};
		this.props.updateFilter(filterParams);
		this.props.history.push('./events');
	}

	toggleDropdown(event) {
		const eventsDropdownEles = document.getElementsByClassName('autocomplete-dropdown-events')[0];
		const citiesDropdownEles = document.getElementsByClassName('autocomplete-dropdown-cities')[0];
		if (event.target.className.includes('events-input') || eventsDropdownEles.contains(event.target)) {
			this.setState({ eventsDropdownShow: 'active', citiesDropdownShow: 'hidden' });
		} else if (event.target.className.includes('cities-input') || citiesDropdownEles.contains(event.target)) {
			this.setState({ eventsDropdownShow: 'hidden', citiesDropdownShow: 'active' });
		} else if (event.target.className.includes('react-calendar') || event.target.nodeName === 'ABBR') {
			// retain active state so do nothing
		} else if (event.target.className.includes('input-clear')) {
			// also do nothing
		} else {
			this.setState({ eventsDropdownShow: 'hidden', citiesDropdownShow: 'hidden', calendarClass: 'hidden' });
		}
	}

	autocomplete(field) {
		const pluralizedField = field === 'event' ? 'events' : 'cities';
		const pluralizedFieldCap = field === 'event' ? 'Events' : 'Cities';
		return autocompleteValue => {
			this.setState({ [field]: autocompleteValue, [`${pluralizedField}DropdownShow`]: 'hidden' });
			this[`debouncedFetch${pluralizedFieldCap}Auto`]();
		};
	}

	closeCalendar(event) {
		this.setState({ calendarShow: false, calendarClass: 'hidden', date: '' });
	}

	handleInputFromCalendar(dateRange) {
		const startDate = dateRange[0].setHours(0, 0, 0, 0);
		const endDate = dateRange[1].setHours(23, 59, 59, 999);
		this.setState({ date: [startDate, endDate] });
	}

	getSelectText() {
		if (!this.state.date) return '';
		const selectEle = document.getElementsByClassName('index-search-bar-select')[0];
		return selectEle.options[selectEle.selectedIndex].text;
	}

	clearInput(field) {
		const pluralizedField = field === 'event' ? 'Events' : 'Cities';
		return () => {
			this.setState({ [field]: '' });
			if (field === 'date') {
				const selectEle = document.getElementsByClassName('index-search-bar-select')[0];
				selectEle.selectedIndex = 0;
			} else {
				this[`debouncedFetch${pluralizedField}Auto`]();
			}
		};
	}

	render() {
		const { classPrefix } = this.props;
		const dateOptions = SearchUtil.getDates();
		const { today, tomorrow, thisWeekend, thisWeek, nextWeek, thisMonth, nextMonth } = dateOptions;

		const inputUnderline = classPrefix === 'splash' ? <div className="input-styling-underline" /> : null;
		const buttonText = classPrefix === 'splash' ? <i className="fas fa-search" /> : 'Search';

		let dateInputEle;
		if (this.state.calendarShow) {
			dateInputEle = (
				<div className={`${classPrefix}-search-bar-select-wrapper`}>
					<div className={`${classPrefix}-search-bar-date-input`}>
						{SearchUtil.formatDates(this.state.date)}
						<div className={`${classPrefix}-search-bar-select-close`} onClick={this.closeCalendar}>
							&times;
						</div>
					</div>
					<Calendar
						className={`${classPrefix}-search-bar-calendar-${this.state.calendarClass}`}
						selectRange={true}
						returnValue="range"
						onChange={this.handleInputFromCalendar}
						minDate={new Date()}
					/>
				</div>
			);
		} else {
			const unselectedOptionStyle = { display: 'none' };
			const selectedSelectStyle = { display: 'none' };
			dateInputEle = (
				<div className={`${classPrefix}-search-bar-select-wrapper`}>
					{classPrefix === 'splash' ? null : (
						<div
							className={`${classPrefix}-search-bar-date-input`}
							style={this.state.date ? {} : unselectedOptionStyle}
						>
							{this.getSelectText()}
							<div className={`${classPrefix}-search-bar-select-clear`} onClick={this.clearInput('date')}>
								&times;
							</div>
						</div>
					)}
					<select
						className={`${classPrefix}-search-bar-select`}
						onChange={this.handleInput('date')}
						defaultValue=""
						style={classPrefix === 'index' && this.state.date ? selectedSelectStyle : {}}
					>
						<option value="" disabled={true}>
							Any date
						</option>
						<option value={today}>Today</option>
						<option value={tomorrow}>Tomorrow</option>
						<option value={thisWeekend}>This weekend</option>
						<option value={thisWeek}>This week</option>
						<option value={nextWeek}>Next week</option>
						<option value={thisMonth}>This month</option>
						<option value={nextMonth}>Next month</option>
						<option>Pick a date...</option>
					</select>
					{classPrefix === 'index' && this.state.date ? null : (
						<div className={`${classPrefix}-search-bar-select-arrow`} />
					)}
				</div>
			);
		}

		return (
			<div className={`${classPrefix}-search-bar-wrapper`}>
				<form className={`${classPrefix}-search-bar-form`}>
					<div className={`${classPrefix}-search-bar-content event-content`}>
						<div className={`${classPrefix}-search-bar-input-info`}>
							{classPrefix === 'splash' ? 'Looking for' : ''}
						</div>
						<input
							type="text"
							value={this.state.event}
							className={`${classPrefix}-search-bar-events-input`}
							placeholder={classPrefix === 'splash' ? 'Event' : 'Search anything'}
							onChange={this.handleInput('event')}
							onMouseDown={this.toggleDropdown}
						/>
						{classPrefix === 'splash' && this.state.event ? (
							<div className={`${classPrefix}-search-bar-input-clear`} onClick={this.clearInput('event')}>
								&times;
							</div>
						) : null}
						{inputUnderline}
						<AutocompleteDropdown
							dropdownType="events"
							dropdownShow={this.state.eventsDropdownShow}
							events={this.props.eventsAuto}
							autocomplete={this.autocomplete('event')}
						/>
					</div>
					<div className={`${classPrefix}-search-bar-content city-content`}>
						<div className={`${classPrefix}-search-bar-input-info`}>{classPrefix === 'splash' ? 'In' : 'in'}</div>
						<input
							type="text"
							value={this.state.city}
							className={`${classPrefix}-search-bar-cities-input`}
							placeholder="Location"
							onChange={this.handleInput('city')}
							onMouseDown={this.toggleDropdown}
						/>
						{classPrefix === 'splash' && this.state.city ? (
							<div className={`${classPrefix}-search-bar-input-clear`} onClick={this.clearInput('city')}>
								&times;
							</div>
						) : null}
						{inputUnderline}
						<AutocompleteDropdown
							dropdownType="cities"
							dropdownShow={this.state.citiesDropdownShow}
							cities={this.props.citiesAuto}
							autocomplete={this.autocomplete('city')}
						/>
					</div>
					<div className={`${classPrefix}-search-bar-content date-content`}>
						<div className={`${classPrefix}-search-bar-input-info`}>{classPrefix === 'splash' ? 'On' : ''}</div>
						{dateInputEle}
						{inputUnderline}
					</div>
					<div className={`${classPrefix}-search-bar-submit`}>
						<button onClick={this.handleSubmit}>{buttonText}</button>
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(SearchBar);
