import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Overlay = props => (
    <div className="overlay-wrap">
        <div className="overlay">{props.children}</div>
    </div>
);

Overlay.propTypes = {
    children: PropTypes.node
};

export default Overlay;
