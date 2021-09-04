import React from 'react';
import { Mutation } from 'react-apollo';
import { IconContext } from 'react-icons';
import { FaPencilAlt } from 'react-icons/fa';
import Mutations from '../../graphql/mutations';
const { ADD_GOD_DOMAIN, REMOVE_GOD_DOMAIN } = Mutations;

class DomainDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			domains: this.props.god.domains || [],
			newDomain: ''
		};

		this.handleEdit = this.handleEdit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.removeDomain = this.removeDomain.bind(this);
	}

	removeDomain(event, removeGodDomain, domain) {
		event.preventDefault();
		removeGodDomain({
			variables: { id: this.props.god.id, domain: domain }
		}).then(() => this.setState({ domains: this.state.domains.filter(oldDomain => oldDomain !== domain) }));
	}

	handleSubmit(event, addGodDomain) {
		event.preventDefault();
		addGodDomain({
			variables: { id: this.props.god.id, domain: this.state.newDomain }
		}).then(() =>
			this.setState({ editing: false, domains: this.state.domains.concat(this.state.newDomain), newDomain: '' })
		);
	}

	handleEdit(e) {
		e.preventDefault();
		this.setState({ editing: true });
	}

	updateInput(e) {
		this.setState({ newDomain: e.target.value });
	}

	render() {
		const domainLis = this.state.domains.map((domain, idx) => (
			<li key={idx}>
				<span>{domain}</span>
				<Mutation mutation={REMOVE_GOD_DOMAIN}>
					{(removeGodDomain, data) => (
						<button onClick={event => this.removeDomain(event, removeGodDomain, domain)}>
							Remove Domain
						</button>
					)}
				</Mutation>
			</li>
		));

		let addDomainForm = (
			<div onClick={this.handleEdit} style={{ fontSize: '10px', cursor: 'pointer', display: 'inline' }}>
				<IconContext.Provider value={{ className: 'custom-icon' }}>
					<FaPencilAlt />
				</IconContext.Provider>
			</div>
		);
		if (this.state.editing) {
			addDomainForm = (
				<Mutation mutation={ADD_GOD_DOMAIN}>
					{(addGodDomain, data) => (
						<form onSubmit={event => this.handleSubmit(event, addGodDomain)}>
							<input type="text" value={this.state.newDomain} onChange={this.updateInput} />
							<button type="submit">Add Domain</button>
						</form>
					)}
				</Mutation>
			);
		}

		return (
			<div>
				<ul>{domainLis}</ul>
				{addDomainForm}
			</div>
		);
	}
}

export default DomainDetail;
