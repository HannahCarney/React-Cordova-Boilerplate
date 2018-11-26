import React from 'react';
import PropTypes from 'prop-types';

export default function Button({loading, children, ...props}) {
    let text = children;
    if (loading) {
        text = <span className="fa fa-spinner fa-spin"></span>;
    }

    return (
        <button className="btn" {...props}>
            {text}
        </button>
    );
}
Button.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.node
};