import React from 'react';
import { Mutation } from 'react-apollo';

import Queries from '../../graphql/queries';
const { FETCH_GODS } = Queries;
import Mutations from '../../graphql/mutations';
const { DELETE_GOD } = Mutations;

const linkStyle = {
	cursor: 'pointer',
	fontSize: '10px',
	color: 'red'
};

const DeleteGod = props => {
	return (
		<Mutation
			mutation={DELETE_GOD}
			refetchQueries={() => {
				return [
					{
						query: FETCH_GODS
					}
				];
			}}
		>
			{(deleteGod, { data }) => (
				<a
					style={linkStyle}
					onClick={e => {
						e.preventDefault();
						deleteGod({ variables: { id: props.id } });
					}}
				>
					<p>Delete</p>
				</a>
			)}
		</Mutation>
	);
};

export default DeleteGod;
