import React from 'react';
import { Mutation } from 'react-apollo';
import Queries from '../../graphql/queries';
const { FETCH_EMBLEMS } = Queries;
import Mutations from '../../graphql/mutations';
const { NEW_EMBLEM } = Mutations;

class EmblemCreate extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: '', message: '' };

		this.updateCache = this.updateCache.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	updateCache(cache, { data: { newEmblem } }) {
		let emblems;
		try {
			emblems = cache.readQuery({ query: FETCH_EMBLEMS });
		} catch (err) {
			return;
		}

		if (emblems) {
			let emblemArray = emblems.emblems;
			cache.writeQuery({ query: FETCH_EMBLEMS, data: { emblems: emblemArray.concat(newEmblem) } });
		}
	}

	updateInput(event) {
		this.setState({ name: event.target.value });
	}

	handleSubmit(event, newEmblem) {
		event.preventDefault();
		const name = this.state.name;

		newEmblem({ variables: { name: name } }).then(data => {
			this.setState({ message: `New emblem "${name}" created successfully`, name: '' });
		});
	}

	render() {
		return (
			<Mutation mutation={NEW_EMBLEM} update={(cache, data) => this.updateCache(cache, data)}>
				{(newEmblem, { data }) => {
					return (
						<div>
							<form onSubmit={e => this.handleSubmit(e, newEmblem)}>
								<input type="text" value={this.state.name} onChange={this.updateInput} />
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

export default EmblemCreate;
