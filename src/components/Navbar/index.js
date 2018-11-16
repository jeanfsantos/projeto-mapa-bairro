import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './styles.scss';

const Navbar = props => (
    <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <div className="navbar-title">{props.title}</div>
            <a
                role="button"
                className={classnames('navbar-burger', {
                    'is-active': !props.showMenu
                })}
                aria-label="menu"
                aria-expanded="false"
                onClick={props.onToggleMenu}
            >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
            </a>
        </div>
    </nav>
);

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    onToggleMenu: PropTypes.func.isRequired,
    showMenu: PropTypes.bool.isRequired
};

export default Navbar;
