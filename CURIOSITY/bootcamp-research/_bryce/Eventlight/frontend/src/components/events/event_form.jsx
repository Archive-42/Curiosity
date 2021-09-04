import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import ReactQuill from 'react-quill';
import { merge } from 'lodash';
import 'react-quill/dist/quill.snow.css';
import '../../styles/event_form.css';
import { withRouter } from 'react-router-dom';

class EventForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			event: props.event,
			locationType: 'Venue',
			activeForm: 'basicInfo'
		};

		const type = this.state.event.type;
		this.state.event.type = typeof type === 'object' ? type._id : type;
		const category = this.state.event.category;
		this.state.event.category = typeof type === 'object' ? category._id : category;

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFile = this.handleFile.bind(this);
		this.handlePrevious = this.handlePrevious.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
	}

	componentDidMount() {
		this.props.fetchTypes();
		this.props.fetchCategories();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.event !== this.props.event) {
			this.setState(merge({}, this.state, { event: this.props.event }));
		}
	}

	handleChange(field) {
		return e => {
			this.setState(merge({}, this.state, { event: { [field]: e.target.value } }));
		};
	}

	handleThirdPartyChange(field) {
		return e => this.setState(merge({}, this.state, { event: { [field]: e } }));
	}

	handleLocationChange(field) {
		return e => this.setState(merge({}, this.state, { event: { location: { [field]: e.target.value } } }));
	}

	handleCityStateChange(field) {
		return e => this.setState(merge({}, this.state, { event: { location: { city: { [field]: e.target.value } } } }));
	}

	handleFile(e) {
		const file = e.currentTarget.files[0];
		const fileReader = new FileReader();
		fileReader.onloadend = () => {
			this.setState({ imageFile: file, imageUrl: fileReader.result });
		};
		if (file) {
			fileReader.readAsDataURL(file);
		}
	}

	handleSubmit(e) {
		e.preventDefault();

		if (this.state.activeForm === 'basicInfo') {
			this.setState({ activeForm: 'details' });
		} else if (this.state.activeForm === 'details') {
			this.setState({ activeForm: 'tickets' });
		} else {
			const formData = new FormData();
			Object.keys(this.state.event).forEach(key => formData.append(key, this.state.event[key]));
			formData.append('location[location_address]', this.state.event.location.location_address);
			formData.append('location[city][city]', this.state.event.location.city.city);
			formData.append('location[city][state]', this.state.event.location.city.state);
			if (this.state.imageFile) {
				formData.append('file', this.state.imageFile);
			}
			this.props.submit(formData).then(() => this.props.history.push('/myevents'));
		}
	}

	handlePrevious(e) {
		e.preventDefault();

		if (this.state.activeForm === 'details') {
			this.setState({ activeForm: 'basicInfo' });
		} else {
			this.setState({ activeForm: 'details' });
		}
	}

	render() {
		const event = this.state.event;
		if (event) {
			const typeOptions = Object.keys(this.props.availableTypes).map(typeId => {
				return this.state.event.type === this.props.availableTypes[typeId] ? (
					<option className="type-option" key={typeId} value={typeId} selected={true}>
						{this.props.availableTypes[typeId].name}
					</option>
				) : (
					<option key={typeId} value={typeId}>
						{this.props.availableTypes[typeId].name}
					</option>
				);
			});
			const categoryOptions = Object.keys(this.props.availableCategories).map(categoryId => {
				return event.category === this.props.availableCategories[categoryId] ? (
					<option key={categoryId} value={categoryId} selected={true}>
						{this.props.availableCategories[categoryId].name}
					</option>
				) : (
					<option className="category-option" key={categoryId} value={categoryId}>
						{this.props.availableCategories[categoryId].name}
					</option>
				);
			});
			const locationInputs =
				this.state.locationType === 'Venue' ? (
					<div className="event-form__location__inputs__venue">
						<div className="event-form__location__inputs__location-name">
							<label className="event-form__location__inputs__location-name__label">Venue Name</label>
							<input
								className="event-form__location__inputs__location-name__input"
								type="text"
								placeholder="e.g. Madison Square Garden"
								value={event.location.location_name}
								onChange={this.handleLocationChange('location_name')}
							/>
						</div>
						<div className="event-form__location__inputs__street-address">
							<h2 className="event-form__location__inputs__street-address__header">Street Address</h2>
							<div className="event-form__location__inputs__location-address">
								<label className="event-form__location__inputs__location-address__label">Address</label>
								<input
									className="event-form__location__inputs__location-address__input"
									type="text"
									placeholder="e.g. 155 5th Street"
									value={event.location.location_address}
									onChange={this.handleLocationChange('location_address')}
								/>
							</div>
							<div className="event-form__location__inputs__city">
								<label className="event-form__location__inputs__city__label">City</label>
								<input
									type="text"
									value={event.location.city.city}
									className="event-form__location__inputs__city__input"
									placeholder="e.g. San Francisco"
									onChange={this.handleCityStateChange('city')}
								/>
								<label className="event-form__location__inputs__state__label">State</label>
								<input
									type="text"
									value={event.location.city.state}
									className="event-form__location__inputs__state__input"
									placeholder="e.g. CA"
									onChange={this.handleCityStateChange('state')}
								/>
							</div>
						</div>
					</div>
				) : (
					<div className="event-form__location__inputs__online">
						<label className="event-form__location__inputs__online__label">Event URL</label>
						<input
							className="event-form__location__inputs__online__input"
							type="text"
							placeholder="URL at which your event is being hosted."
							value={event.online_url}
							onChange={this.handleChange('online_url')}
						/>
					</div>
				);

			const basicInfoForm = (
				<form className="event-form__basic-info-form" onSubmit={this.handleSubmit}>
					<div className="event-form__basic-info">
						<div className="event-form__basic-info__instructions">
							<h1 className="event-form__basic-info__instructions__header">Basic Info</h1>
							<p className="event-form__basic-info__instructions__details">
								Name your event and tell event-goers why they should come. Add details that highlight what makes it
								unique.
							</p>
						</div>
						<div className="event-form__basic-info__inputs">
							<div className="event-form__basic-info__inputs__title">
								<label className="event-form__basic-info__inputs__title__label">
									Event Title <span className="input__required">*</span>
								</label>
								<input
									className="event-form__basic-info__inputs__title__input"
									type="text"
									placeholder="Be clear and descriptive."
									value={event.title}
									onChange={this.handleChange('title')}
								/>
							</div>
							<div className="event-form__basic-info__select__container">
								<div className="type-select-container">
									<select className="type-select" onChange={this.handleChange('type')} value={event.type}>
										<option className="type-option" value="" disabled={true}>
											Type
										</option>
										{typeOptions}
									</select>
								</div>
								<div className="category-select-container">
									<select className="category-select" onChange={this.handleChange('category')} value={event.category}>
										<option className="category-option" value="" disabled={true}>
											Category
										</option>
										{categoryOptions}
									</select>
								</div>
							</div>
							<div className="event-form__basic-info__inputs__organizer-name">
								<label className="event-form__basic-info__inputs__organizer-name__label">Organizer</label>
								<input
									className="event-form__basic-info__inputs__organizer-name__input"
									type="text"
									placeholder="Be clear and descriptive."
									value={event.organizer_name}
									onChange={this.handleChange('organizer_name')}
								/>
							</div>
						</div>
					</div>
					<div className="event-form__location">
						<div className="event-form__location__instructions">
							<h1 className="event-form__location__instructions__header">Location</h1>
							<p className="event-form__location__instructions__details">
								Help people in the area discover your event and let attendees know where to show up.
							</p>
						</div>
						<div className="event-form__location__inputs">
							<div className="event-form__location__inputs__location-type">
								<select
									className="location-type-select"
									onChange={e => this.setState({ locationType: e.target.value })}
									value={this.state.locationType}
								>
									<option className="location-type-option" value="Venue">
										Venue
									</option>
									<option className="location-type-option" value="Online">
										Online event
									</option>
								</select>
								{locationInputs}
							</div>
						</div>
					</div>
					<div className="event-form__date">
						<div className="event-form__date__instructions">
							<h1 className="event-form__date__instructions__header">Date and Time</h1>
							<p className="event-form__date__instructions__details">
								Tell event-goers when your event starts and ends so they can make plans to attend.
							</p>
						</div>
						<div className="event-form__date__inputs">
							<div className="event-form__date__inputs__start-date">
								<label className="event-form__date__inputs__start-date__label">
									Event Starts <span className="input__required">*</span>
								</label>
								<DateTimePicker
									className="start-date"
									calendarClassName="start-date calendar"
									clockClassName="start-date clock"
									disableClock={true}
									amPm={true}
									onChange={this.handleThirdPartyChange('start_date')}
									value={event.start_date && new Date(event.start_date || null)}
								/>
							</div>
							<div className="event-form__date__inputs__end-date">
								<label className="event-form__date__inputs__end-date__label">
									Event Ends <span className="input__required">*</span>
								</label>
								<DateTimePicker
									className="end-date"
									calendarClassName="end-date calendar"
									clockClassName="end-date clock"
									disableClock={true}
									amPm={true}
									onChange={this.handleThirdPartyChange('end_date')}
									value={event.end_date && new Date(event.end_date || null)}
								/>
							</div>
						</div>
					</div>
					<input className="event-form__submit-button" type="submit" value="Save" />
				</form>
			);
			const preview =
				this.state.imageUrl || this.state.event.image_url ? (
					<img
						className="server-icon-preview"
						src={this.state.imageUrl || this.state.event.image_url}
						alt="server_icon_image_preview"
					/>
				) : null;
			const detailsForm = (
				<form className="event-form__details-form" onSubmit={this.handleSubmit}>
					<div className="event-form__details">
						<div className="event-form__details__event-image">
							<div className="event-form__details__event-image__instructions">
								<h1 className="event-form__details__event-image__instructions__header">Main Event Image</h1>
								<p className="event-form__details__event-image__instructions__details">
									This is the first image attendees will see at the top of your listing. Use a high quality image:
									2160x1080px (2:1 ratio).
								</p>
							</div>
							<div className="event-form__details__event-image__inputs">
								{preview}
								<input type="file" onChange={this.handleFile} />
							</div>
						</div>
						<div className="event-form__details__description">
							<div className="event-form__details__description__instructions">
								<h1 className="event-form__details__description__instructions__header">Description</h1>
								<p className="event-form__details__description__instructions__details">
									Add more details to your event like your schedule, sponsors, or featured guests.
								</p>
							</div>
							<div className="event-form__details__quill-container">
								<ReactQuill
									placeholder="Write a description about your event."
									value={event.description}
									onChange={this.handleThirdPartyChange('description')}
								/>
							</div>
						</div>
					</div>
					<div className="event-form__nav-buttons">
						<button className="event-form__previous-button" onClick={this.handlePrevious}>
							Previous
						</button>
						<input className="event-form__submit-button" type="submit" value="Save" />
					</div>
				</form>
			);

			const ticketsForm = (
				<form className="event-form__tickets-form" onSubmit={this.handleSubmit}>
					<div className="event-form__tickets">
						<div className="event-form__tickets__instructions">
							<h1 className="event-form__tickets__instructions__header">Create your tickets</h1>
							<p className="event-form__tickets__instructions__details">
								Add information about ticket availability and price.
							</p>
						</div>
						<div className="event-form__tickets__inputs__quantity">
							<label className="event-form__tickets__inputs__quantity__label">Quantity</label>
							<input
								className="event-form__tickets__inputs__quantity__input"
								type="text"
								placeholder="Number of tickets available."
								value={event.capacity}
								onChange={this.handleChange('capacity')}
							/>
						</div>
						<div className="event-form__tickets__inputs__price">
							<label className="event-form__tickets__inputs__price__dollar_label">$</label>
							<label className="event-form__tickets__inputs__price__label">Price</label>
							<input
								className="event-form__tickets__inputs__price__input"
								type="text"
								placeholder="0.00"
								value={event.price}
								onChange={this.handleChange('price')}
							/>
						</div>
					</div>
					<div className="event-form__nav-buttons">
						<button className="event-form__previous-button" onClick={this.handlePrevious}>
							Previous
						</button>
						<input className="event-form__submit-button" type="submit" value="Finish" />
					</div>
				</form>
			);

			let activeForm;
			switch (this.state.activeForm) {
				case 'basicInfo':
					activeForm = basicInfoForm;
					break;
				case 'details':
					activeForm = detailsForm;
					break;
				case 'tickets':
					activeForm = ticketsForm;
					break;
				default:
					activeForm = basicInfoForm;
			}

			return <div className="event-form__container">{activeForm}</div>;
		} else {
			return <div className="event-form__container">Fetching Event</div>;
		}
	}
}

export default withRouter(EventForm);
