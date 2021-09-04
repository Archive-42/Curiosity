import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../../styles/event_index_item.css'
import { toggleLikeEvent } from '../../actions/user_actions'
import { connect } from 'react-redux'
import { isLiked } from '../../selectors'
import { formatMonth, formatLongDateNum } from '../../util/format_util'

const mstp = (state, ownProps) => ({
	isLiked: isLiked(state, ownProps.event._id)
})

const mdtp = dispatch => ({
	toggleLikeEvent: id => dispatch(toggleLikeEvent(id))
})

class EventIndexItem extends React.Component {
	render() {
		const { event, toggleLikeEvent, isLiked } = this.props

		const locationTerms = []
		if (event.location) {
			if (event.location.location_name) {
				locationTerms.push(event.location.location_name)
			}
			if (event.location.location_address) {
				locationTerms.push(event.location.location_address)
			}
			if (event.location.city) {
				locationTerms.push(event.location.city.city, event.location.city.state)
			}
		}
		if (event.online_url) {
			locationTerms.push('Online')
		}
		const formattedLocation = locationTerms.join(', ')

		let formattedPrice
		let freeIndicator
		if (event.price === 0) {
			formattedPrice = 'Free'
			freeIndicator = <div className="free-indicator">Free</div>
		} else {
			formattedPrice = `Starting at $${event.price}`
		}

		const dateOptions = {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		}
		let formattedDate = new Date(event.start_date).toLocaleString('en-US', dateOptions)
		formattedDate = formattedDate.slice(0, -3).concat(formattedDate.slice(-2).toLowerCase())

		let monthDay = null
		if (this.props.location.pathname === '/') {
			monthDay = (
				<div className="event-index-list__item__shortdate">
					<div className="month-day">
						<h4>{formatMonth(event.start_date).toUpperCase()}</h4>
						<h3>{formatLongDateNum(event.start_date)}</h3>
					</div>
				</div>
			)
		}

		return (
			<li className="event-index-list__item">
				<div className="event-index-list__item__content-outer-container">
					<div className="event-index-list__item__content-container">
						<aside className="event-index-list__item__image-link">
							<Link className="event-index-list__item__image-link__link" to={`events/${event._id}`}>
								<img
									className="event-index-list__item_image-link__image"
									src={event.image_url}
									alt={`${event.title}`}
								/>
							</Link>
							{freeIndicator}
						</aside>
						<main className="event-index-list__item__title-link">
							{monthDay}
							<div className="event-index-list__item__title-link__container">
								<Link className="event-index-list__item__title-link__link" to={`events/${event._id}`}>
									<h3 className="event-index-list__item__title-link__title">{event.title}</h3>
								</Link>
								<div className="event-index-list__item__info">
									<p className="event-index-list__item__info__date">{formattedDate}</p>
									<p className="event-index-list__item__info__location">{formattedLocation}</p>
									<p className="event-index-list__item__info__price">{formattedPrice}</p>
								</div>
								<button
									className="event-index-list__item__like-button"
									onClick={() => toggleLikeEvent(event._id)}
								>
									<div className={isLiked ? 'like-icon--active' : 'like-icon'} />
								</button>
							</div>
						</main>
					</div>
				</div>
			</li>
		)
	}
}

export default connect(mstp, mdtp)(withRouter(EventIndexItem))
