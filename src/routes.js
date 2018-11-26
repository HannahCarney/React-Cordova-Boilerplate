import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    HashRouter,
    Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumb } from 'react-breadcrumbs';
import Home from './views/home.js';
import Item1 from './views/item1.js';
import Item2 from './views/item2.js';

export const CrumbRoute = ({ component, includeSearch = false, render, ...props }) => {
    let Component = component;
    return (
        <Route {...props} render={routeProps => (
            <Breadcrumb data={{
                title: props.title,
                pathname: routeProps.match.url,
                search: includeSearch ? routeProps.location.search : null
            }}>
                {Component ? <Component {...routeProps} /> : render(routeProps)}
            </Breadcrumb>
        )} />
    );
};
CrumbRoute.propTypes = {
    object: PropTypes.object,
    component: PropTypes.func,
    includeSearch: PropTypes.bool,
    render: PropTypes.func
};

function Routes({ authState }) {
    //container

    return (
        <HashRouter>
          <div>
            <h1>Simple SPA</h1>
            <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/item1">Stuff</NavLink></li>
            <li><NavLink to="/item2">Contact</NavLink></li>
            </ul>
            <div className="content">
            <Route path="/" component={Home}/>
            <Route path="/item1" component={Item1}/>
            <Route path="/item2" component={Item2}/>
          </div>
          </div>
        </HashRouter>
      );
    // return (
        // <Router>
        //     <div className={classNames.join(' ')}>
        //         <Route exact path="/" render={(props) => (
        //             authState !== 'signedIn' ? (<div />) : (
        //                 <Redirect to={{
        //                     pathname: '/home',
        //                     state: { from: props.location }
        //                 }} />
        //             )
        //         )} />
        //         <CrumbRoute title="Home" path="/home" component={Home} />
        //         <CrumbRoute title="Item 1" path="/item1" component={Item1} />
        //         <CrumbRoute title="Item 2" path="/item2" component={Item2} />
        //     </div>
        // </Router>
    // );
}

Routes.propTypes = {
    authState: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(Routes);
