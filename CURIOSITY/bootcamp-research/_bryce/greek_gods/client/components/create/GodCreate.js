import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Queries from '../../graphql/queries';
const { FETCH_GODS } = Queries;

import Mutations from '../../graphql/mutations';
const { NEW_GOD } = Mutations;

class GodCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			type: '',
			description: '',
			message: ''
		};

		this.updateCache = this.updateCache.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	updateCache(cache, { data: { newGod } }) {
		let gods;
		try {
			// we'll try to read from our cache but if the query isn't in there no sweat!
			// We only want to update the data if it's in the cache already - totally fine if the data will
			// be fetched fresh later
			gods = cache.readQuery({ query: FETCH_GODS });
		} catch (err) {
			return;
		}

		// then our writeQuery will only run IF the cache already has data in it
		if (gods) {
			let godArray = gods.gods;

			cache.writeQuery({
				query: FETCH_GODS,
				data: { gods: godArray.concat(newGod) }
			});
		}
	}

	updateInput(field) {
		return event => {
			this.setState({ [field]: event.target.value });
		};
	}

	handleSubmit(e, newGod) {
		e.preventDefault();
		const name = this.state.name;
		// our newGod function will accept an object with the key of "variables" pointing to an object with all our passed in variables.
		newGod({
			variables: {
				name: name,
				type: this.state.type,
				description: this.state.description
			}
		})
			// after our mutation has run we want to reset our state and show our user the success message
			.then(data => {
				console.log(data);
				this.setState({
					message: `New god "${name}" created successfully`,
					name: '',
					type: '',
					description: ''
				});
			});
	}

	render() {
		return (
			<Mutation mutation={NEW_GOD} update={(cache, data) => this.updateCache(cache, data)}>
				{(newGod, { data }) => {
					return (
						<div>
							<form onSubmit={e => this.handleSubmit(e, newGod)}>
								<input type="text" value={this.state.name} onChange={this.updateInput('name')} />
								<textarea value={this.state.description} onChange={this.updateInput('description')} />
								<select defaultValue="" onChange={this.updateInput('type')}>
									<option value="" disabled={true}>
										Select a type
									</option>
									<option value="God">God</option>
									<option value="Goddess">Goddess</option>
								</select>
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

export default GodCreate;
