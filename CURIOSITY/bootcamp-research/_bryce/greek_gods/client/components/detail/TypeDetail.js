import React from 'react';
import { Mutation } from 'react-apollo';
import { IconContext } from 'react-icons';
import { FaPencilAlt } from 'react-icons/fa';
import Mutations from '../../graphql/mutations';
const { UPDATE_GOD } = Mutations;

class TypeDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			type: this.props.god.type || 'god'
		};

		this.handleEdit = this.handleEdit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event, updateGodType) {
		event.preventDefault();
		updateGodType({
			variables: { id: this.props.god.id, type: event.target.value }
		}).then(({ data: { updateGod: { type } } }) => this.setState({ editing: false, type: type }));
	}

	handleEdit(e) {
		e.preventDefault();
		this.setState({ editing: true });
	}

	render() {
		if (this.state.editing) {
			return (
				<Mutation mutation={UPDATE_GOD}>
					{(updateGodType, data) => (
						<div>
							<select
								defaultValue={this.state.type}
								onChange={event => this.handleSubmit(event, updateGodType)}
							>
								<option value="god">god</option>
								<option value="goddess">goddess</option>
							</select>
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
					<h2>{this.state.type}</h2>
				</div>
			);
		}
	}
}

export default TypeDetail;
