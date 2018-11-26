import React from 'react';
import PropTypes from 'prop-types';
import {
    Route,
    NavLink,
    HashRouter,
    Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './views/home.js';
import Item1 from './views/item1.js';
import LoginView from './views/login.js';
import Logout from './views/logout.js';


function Routes({ authState }) {
    //container

    return (
        <HashRouter>
          <div>
            <h1>React Cordova Boilerplate</h1>
            <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/item1">Stuff</NavLink></li>
            <li><NavLink to="/logout">Logout</NavLink></li>
            </ul>
            <div className="content">
            <Route exact path="/" render={(props) => (
                    authState === true ? (<div />) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }} />
                    )
                )} />
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={LoginView}/>
            <Route path="/item1" component={Item1}/>
            <Route path="/logout" component={Logout}/>
          </div>
          </div>
        </HashRouter>
      );
}

Routes.propTypes = {
    authState: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    authState: !!state.login.token
});

export default connect(mapStateToProps)(Routes);
