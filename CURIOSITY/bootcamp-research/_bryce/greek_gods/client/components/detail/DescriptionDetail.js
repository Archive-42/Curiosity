import React from 'react';
import { Mutation } from 'react-apollo';
import { IconContext } from 'react-icons';
import { FaPencilAlt } from 'react-icons/fa';
import Mutations from '../../graphql/mutations';
const { UPDATE_GOD } = Mutations;

class DescriptionDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			description: this.props.god.description || ''
		};

		this.handleEdit = this.handleEdit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateInput = this.updateInput.bind(this);
	}

	handleSubmit(event, updateGodDescription) {
		event.preventDefault();
		updateGodDescription({
			variables: { id: this.props.god.id, description: this.state.description }
		}).then(() => this.setState({ editing: false }));
	}

	handleEdit(e) {
		e.preventDefault();
		this.setState({ editing: true });
	}

	updateInput(e) {
		this.setState({ description: e.target.value });
	}

	render() {
		if (this.state.editing) {
			return (
				<Mutation mutation={UPDATE_GOD}>
					{(updateGodDescription, data) => (
						<div>
							<form onSubmit={event => this.handleSubmit(event, updateGodDescription)}>
								<textarea value={this.state.description} onChange={this.updateInput} />
								<button type="submit">Update Description</button>
							</form>
						</div>
					)}
				</Mutation>
			);
		} else {
			return (
				<div>
					<div onClick={this.handleEdit} style={{ fontSize: '10px', cursor: 'pointer', display: 'inline' }}>
						<IconContext.Provider value={{ className: 'custom-icon' }}>
							<FaPencilAlt />
						</IconContext.Provider>
					</div>
					<p>{this.state.description}</p>
				</div>
			);
		}
	}
}

export default DescriptionDetail;
