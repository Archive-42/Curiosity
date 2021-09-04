import React from 'react';
import { Redirect } from 'react-router';

class ServerForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			imageFile: null,
			imageUrl: null
		};
		this.handleInput = this.handleInput.bind(this);
		this.handleFile = this.handleFile.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleScreenClick = this.handleScreenClick.bind(this);
		this.clearInput = this.clearInput.bind(this);
	}

	componentWillUnmount() {
		this.props.clearErrors();
	}

	clearInput() {
		this.setState({
			name: '',
			imageFile: null,
			imageUrl: null
		});
	}

	handleScreenClick(e) {
		if (e.target.className === 'server-creation-modal-screen') {
			this.props.closeModal();
			this.clearInput();
		}
	}

	handleInput(e) {
		this.setState({ name: e.currentTarget.value });
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
		const formData = new FormData();
		formData.append('server[name]', this.state.name);
		if (this.state.imageFile) {
			formData.append('server[icon_image]', this.state.imageFile);
		}
		this.props.createServer(formData);
		this.clearInput();
	}

	render() {
		let modalClassName = 'server-creation-modal';
		if (this.props.modalOpen) {
			modalClassName = modalClassName.concat(' open');
		}

		let errorsList;
		if (this.props.errors.length) {
			errorsList = this.props.errors.map((error, idx) => {
				return <li key={idx}>{error}</li>;
			});
		}

		const preview = this.state.imageUrl ? (
			<img className="server-icon-preview" src={this.state.imageUrl} alt="server_icon_image_preview" />
		) : (
			<img className="server-icon-preview" src={window.defaultIcon} alt="default_server_icon_image_preview" />
		);

		return (
			<div id="server-creation-modal" className={modalClassName}>
				<div className="server-creation-modal-screen" onClick={this.handleScreenClick}>
					<div className="server-creation-modal-form-container">
						<form onSubmit={this.handleSubmit} className="server-creation-modal-form">
							<div className="server-creation-form-header-container">
								<h3 className="server-creation-form-header">Create your server</h3>
								<h5 className="server-creation-form-subheader">
									By creating a server, you will have access to free voice and text chat to use
									amongst your friends.
								</h5>
							</div>
							<div className="server-creation-form-content-input">
								<div className="server-creation-form-input-name">
									<label>Server Name</label>
									<input
										type="text"
										value={this.state.name}
										onChange={this.handleInput}
										placeholder="Enter a server name"
									/>
								</div>
								<div className="server-creation-form-input-file">
									{preview}
									<input type="file" onChange={this.handleFile} />
								</div>
							</div>
							<ul className="server-errors-list">{errorsList}</ul>
							<input className="server-creation-form-input-submit" type="submit" value="Create" />
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default ServerForm;
