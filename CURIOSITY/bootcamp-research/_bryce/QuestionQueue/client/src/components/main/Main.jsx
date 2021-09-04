// import './main.scss';
import React from 'react';
import { ApolloConsumer, Query } from 'react-apollo';
import { Switch, Redirect } from 'react-router-dom';
import AuthRoute from '../../util/route_util';
import MainNav from './main_nav';
import Questions from '../questions/questions_index';
import Queries from '../../graphql/queries';
const { IS_LOGGED_IN, CURRENT_USER } = Queries;

class Main extends React.Component {
	render() {
		return (
			<ApolloConsumer>
				{client => (
					<div>
						<Query query={IS_LOGGED_IN}>
							{({ data }) => {
								if (data.isLoggedIn) {
									return (
										<Query query={CURRENT_USER}>
											{({ data }) => {
												const currentUserId = data.currentUserId;
												return (
													<div className="main-page-container">
														<MainNav className="main-page-nav" currentUserId={currentUserId} />
														<Switch>
															<AuthRoute
																exact
																path="/questions"
																component={Questions}
																routeType="protected"
																currentUserId={currentUserId}
															/>
															{/* <Redirect from="/" to="/signin" /> */}
														</Switch>
													</div>
												);
											}}
										</Query>
									);
								} else {
									return <div />;
								}
							}}
						</Query>
					</div>
				)}
			</ApolloConsumer>
		);
	}
}

export default Main;
