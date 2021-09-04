import React from "react";

class Clock extends React.Component {
	constructor() {
		super();
		this.state = {
			time: new Date(),
		};
	}

	tick = (e) => {
		this.setState({
			time: new Date(),
		});
	};

	componentDidMount() {
		this.interval = setInterval(this.tick, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		let { time } = this.state;
		return (
			<div className="time_date-container">
				<div className="time-container">
					<div>Time</div>
					<div>
						{time.getHours()}:{time.getMinutes()}:
						{time.getSeconds()}
					</div>
				</div>
				<div className="date-container">
					<div>Date</div>
					<div>{time.toDateString()}</div>
				</div>
			</div>
		);
	}
}

export default Clock;
