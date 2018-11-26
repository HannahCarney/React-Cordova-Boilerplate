import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Button from '../components/button.js';

import {fakeLogin, LOGIN} from '../redux/login.js';

function FormGroup({valid, children, ...props}) {
    let classnames = ['form-group'];
    if (!valid) {
        classnames = classnames.concat('error');
    }

    return (
        <div className={classnames.join(' ')} {...props}>
            {children}
        </div>
    );
}
FormGroup.propTypes = {
    valid: PropTypes.bool.isRequired,
    children: PropTypes.node
};

class ToggleablePasswordInput extends React.PureComponent {
    state = {
        visible: false
    };

    toggleVisibility = () => this.setState((state) => ({visible: !state.visible}));

    render() {
        let type = 'password';
        let iconClass = 'fa-eye-slash';
        if (this.state.visible) {
            type = 'text';
            iconClass = 'fa-eye';
        }

        return (
            <div className="toggleable-password">
                <input type={type} {...this.props} />
                <span className={`fa ${iconClass}`} onClick={this.toggleVisibility}/>
            </div>
        );
    }
}

class LoginView extends React.PureComponent {
    static propTypes = {
        fakeLogin: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
            replace: PropTypes.func.isRequired
        }).isRequired,
        networkErrored: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.object
        ]),
        networkLoading: PropTypes.bool,
        token: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ])
    };

    state = {
        username: '',
        password: '',
        errors: {}
    };
    onChangeField = (fieldName) => (e) => this.setState({[fieldName]: e.target.value});
    onChangeUsername = this.onChangeField('username');
    onChangePassword = this.onChangeField('password');
    onSubmitLogin = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            //fake login used for testing
            this.props.fakeLogin(this.state.username, this.state.password)
                .then(() => this.props.history.push('/'));
        }
    };

    componentWillMount() {
        if (this.props.token) {
            this.props.history.replace('/');
        }
    }

    validateForm() {
        let errors = {};

        if (this.state.username === '') {
            errors.username = true;
        }

        if (this.state.password === '') {
            errors.password = true;
        }

        this.setState({errors});
        return Object.keys(errors).length === 0;
    }

    renderServerErrors() {
        let classnames = ['status'];
        let statusText;

        if (this.props.networkErrored) {
            classnames = classnames.concat('error');

            statusText = `
                We're having trouble logging you in. 
                Please try again later
            `;
        }

        return (
            <div className={classnames.join(' ')}>
                {statusText}
                &nbsp;
            </div>
        );
    }
 
    render() {
        return (
            <div className="view login-view">
                <form className="login-form panel" onSubmit={this.onSubmitLogin}>
                    <h2>Log in</h2>
                    <FormGroup valid={!this.state.errors.username && !this.props.networkErrored}>
                        <span className="fa fa-envelope" />
                        <input className="form-control" placeholder="Email" value={this.state.username} onChange={this.onChangeUsername} />
                    </FormGroup>
                    <FormGroup valid={!this.state.errors.password && !this.props.networkErrored}>
                        <span className="fa fa-lock" />
                        <ToggleablePasswordInput className="form-control" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} />
                    </FormGroup>

                    {this.renderServerErrors()}

                    <Button onClick={this.onSubmitLogin} loading={this.props.networkLoading}>
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let networkLoading = state.network.loading[LOGIN];
    let networkErrored = state.network.errored[LOGIN];

    return {
        networkLoading, 
        networkErrored,
        token: state.login.token
    };
};

const mapDispatchToProps = (dispatch) => ({
    fakeLogin: (username, password) => dispatch(fakeLogin(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);