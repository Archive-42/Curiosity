import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../Layout";
import { ReactComponent as ImageBanner } from "../../images/club.svg";
import { EventList } from "../EventsPage";
import "./HomePage.css";
import * as eventActions from "../../store/events";

const HomePage = () => {
	const dispatch = useDispatch();
	const eventsByEventCategoryId = useSelector(
		(state) => state.events.eventsByEventCategoryId
	);

	useEffect(() => {
		dispatch(eventActions.fetchEventsIfNeeded(""));
	}, [dispatch]);

	const { isFetching, items: events } = eventsByEventCategoryId[""] || {
		isFetching: true,
		items: [],
	};

	return (
		<Layout>
			<div className="home-banner">
				<p className="home-banner__text">
					Find your next nordic ski adventure
				</p>
				<ImageBanner
					alt="nordic-skiing-events"
					className="home-banner__image"
				/>
			</div>
			<div className="event-category-links">
				<h2>Upcoming Events</h2>
				<EventList events={events.slice(0, 8)} />
			</div>
		</Layout>
	);
};

export default HomePage;
