import React from 'react';
import { Mutation } from 'react-apollo';
import Queries from '../../graphql/queries';
const { FETCH_ABODES } = Queries;
import Mutations from '../../graphql/mutations';
const { NEW_ABODE } = Mutations;

class AbodeCreate extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: '', coordinates: '', message: '' };

		this.updateCache = this.updateCache.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	updateCache(cache, { data: { newAbode } }) {
		let abodes;
		try {
			abodes = cache.readQuery({ query: FETCH_ABODES });
		} catch (err) {
			return;
		}

		if (abodes) {
			let abodeArray = abodes.abodes;
			cache.writeQuery({ query: FETCH_ABODES, data: { abodes: abodeArray.concat(newAbode) } });
		}
	}

	updateInput(field) {
		return event => {
			this.setState({ [field]: event.target.value });
		};
	}

	handleSubmit(event, newAbode) {
		event.preventDefault();
		const name = this.state.name;

		newAbode({ variables: { name: name, coordinates: this.state.coordinates } }).then(data => {
			this.setState({ message: `New abode "${name}" created successfully`, name: '', coordinates: '' });
		});
	}

	render() {
		return (
			<Mutation mutation={NEW_ABODE} update={(cache, data) => this.updateCache(cache, data)}>
				{(newAbode, { data }) => {
					return (
						<div>
							<form onSubmit={e => this.handleSubmit(e, newAbode)}>
								<input type="text" value={this.state.name} onChange={this.updateInput('name')} />
								<input
									type="text"
									value={this.state.coordinates}
									onChange={this.updateInput('coordinates')}
								/>
								<button type="submit">Submit</button>
							</form>
							<p>{this.state.message}</p>
						</div>
					);
				}}
			</Mutation>
		);
	}
}

export default AbodeCreate;
