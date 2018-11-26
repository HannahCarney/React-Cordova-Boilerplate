import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import {connect} from 'react-redux';

import LoginView from './views/login.js';
import HomeView from './views/home.js';

const PrivateRoute = ({ component, authenticated, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            authenticated ? React.createElement(component, props) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}/>
            )
        )}/>
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    location: PropTypes.string
};

function Routes({authenticated}) {
    return (
        <Router>
            <div className="container">
                <Route path="/login" component={LoginView} />
                <PrivateRoute exact path="/" component={HomeView} authenticated={authenticated} />
            </div>
        </Router>
    );
}

Routes.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    authenticated: !!state.login.token
});

export default connect(mapStateToProps)(Routes);