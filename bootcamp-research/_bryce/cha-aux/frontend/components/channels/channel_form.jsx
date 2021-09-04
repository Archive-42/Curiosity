import React from 'react';
import { Redirect } from 'react-router';

class ChannelForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			server_id: props.serverId
		};
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleScreenClick = this.handleScreenClick.bind(this);
		this.clearInput = this.clearInput.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (this.props.serverId !== prevProps.serverId) {
			this.setState({ server_id: this.props.serverId });
		}
	}

	componentWillUnmount() {
		this.props.clearErrors();
	}

	clearInput() {
		this.setState({
			name: ''
		});
	}

	handleScreenClick(e) {
		if (
			e.target.className === 'channel-creation-modal-screen' ||
			e.target.className === 'channel-creation-form-input-cancel'
		) {
			this.props.clearErrors();
			this.props.closeModal();
			this.clearInput();
		}
	}

	handleInput(e) {
		this.setState({ name: e.currentTarget.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		const channel = Object.assign({}, this.state);
		this.props.createChannel(channel).then(({ channel }) => {
			this.clearInput();
		});
	}

	render() {
		let modalClassName = 'channel-creation-modal';
		if (this.props.modalOpen) {
			modalClassName = modalClassName.concat(' open');
		}

		let errorsList;
		if (this.props.errors.length) {
			errorsList = this.props.errors.map((error, idx) => {
				return <li key={idx}>{error}</li>;
			});
		}

		return (
			<div id="channel-creation-modal" className={modalClassName}>
				<div className="channel-creation-modal-screen" onClick={this.handleScreenClick}>
					<div className="channel-creation-modal-form-container">
						<form onSubmit={this.handleSubmit} className="channel-creation-modal-form">
							<div className="channel-creation-form-header-container">
								<h3 className="channel-creation-form-header">Create Text Channel</h3>
								<h5 className="channel-creation-form-subheader">in Text Channels</h5>
							</div>
							<div className="channel-creation-form-content-input">
								<div className="channel-creation-form-input-name">
									<label>Channel Name</label>
									<input type="text" value={this.state.name} onChange={this.handleInput} />
								</div>
							</div>
							<ul className="channel-errors-list">{errorsList}</ul>
							<div className="channel-creation-form-button-container">
								<button className="channel-creation-form-input-cancel" type="button" onClick={this.handleScreenClick}>
									Cancel
								</button>
								<input className="channel-creation-form-input-submit" type="submit" value="Create Channel" />
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default ChannelForm;
