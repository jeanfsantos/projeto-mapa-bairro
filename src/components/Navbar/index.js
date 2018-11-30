import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Navbar = props => (
    <nav className="navbar is-link">
        <div className="navbar-brand">
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
    onToggleMenu: PropTypes.func.isRequired,
    showMenu: PropTypes.bool.isRequired
};

export default Navbar;
