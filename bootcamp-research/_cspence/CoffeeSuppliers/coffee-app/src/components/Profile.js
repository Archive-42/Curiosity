import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FavoritesPanel from './FavoritesPanel';
import ReviewsPanel from './ReviewsPanel';
import OrdersPanel from './OrdersPanel';

const Profile = (props) => {
    return (
        <>
            <h1>
                Profile
            </h1>
            <Switch>
                <Route path='/profile/favorites' component={FavoritesPanel} />
                <Route path='/profile/reviews' component={ReviewsPanel} />
                <Route path='/profile/orders' component={OrdersPanel} />
            </Switch>
        </>
    );
}

export default Profile;
