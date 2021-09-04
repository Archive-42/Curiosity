import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const UPDATE_TOY = gql`
	mutation UpdateToy($_id: ID!, $name: String!, $color: String!) {
		updateToy(_id: $_id, name: $name, color: $color) {
			_id
			name
			color
		}
	}
`;

class ToyEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.toy.name,
			color: this.props.toy.color
		};
	}

	update(field) {
		return e => this.setState({ [field]: e.target.value });
	}

	handleSubmit(e, updateToy) {
		e.preventDefault();
		updateToy({
			variables: {
				_id: this.props.toy._id,
				name: this.state.name,
				color: this.state.color
			}
		});
	}

	render() {
		return (
			<Mutation mutation={UPDATE_TOY}>
				{updateToy => (
					<div>
						<h1>Toy Edit Form</h1>
						<form onSubmit={e => this.handleSubmit(e, updateToy)}>
							<input value={this.state.name} onChange={this.update('name')} />
							<input value={this.state.color} onChange={this.update('color')} />
							<button type="submit">Update Toy</button>
						</form>
					</div>
				)}
			</Mutation>
		);
	}
}

export default ToyEdit;
