import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ToyEdit from './ToyEdit';

const FETCH_TOY = gql`
	query FetchToy($id: ID!) {
		toy(_id: $id) {
			_id
			name
			color
		}
	}
`;

const ToyDetail = props => (
	<Query query={FETCH_TOY} variables={{ id: props.match.params.toyId }}>
		{({ loading, error, data }) => {
			if (loading) return <h1>Loading...</h1>;
			if (error) return <h1>{error}</h1>;
			return (
				<div>
					<h1>Name: {data.toy.name}</h1>
					<p>Color: {data.toy.color}</p>
					<ToyEdit toy={data.toy} />
				</div>
			);
		}}
	</Query>
);

export default ToyDetail;
