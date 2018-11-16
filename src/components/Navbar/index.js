import React from 'react';
import PropTypes from 'prop-types';

const Navbar = props => (
    <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <div style={{ lineHeight: '52px' }}>{props.title}</div>
            <a
                role="button"
                className="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
            >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
            </a>
        </div>
    </nav>
);

Navbar.propTypes = {
    title: PropTypes.string.isRequired
};

export default Navbar;
