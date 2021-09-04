import React from 'react';
import { ApolloConsumer, Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Queries from '../../graphql/queries';
const { IS_LOGGED_IN } = Queries;

const MainNav = props => {
	return (
		<ApolloConsumer>
			{client => (
				<div>
					<Query query={IS_LOGGED_IN}>
						{({ data }) => {
							if (data.isLoggedIn) {
								return (
									<nav className="nav">
										<h1 className="app-header">Question Queue</h1>
										<button
											className="log-out-button"
											onClick={e => {
												e.preventDefault();
												localStorage.removeItem('auth-token');
												client.writeData({
													data: {
														isLoggedIn: false,
														currentUserId: null
													}
												});
												props.history.push('/');
											}}
										>
											Log out
										</button>
									</nav>
								);
							} else {
								return (
									<nav className="nav">
										<Link to="/signin">Sign In</Link>
										<Link to="/signup">Sign Up</Link>
									</nav>
								);
							}
						}}
					</Query>
				</div>
			)}
		</ApolloConsumer>
	);
};

export default withRouter(MainNav);
