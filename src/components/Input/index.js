import React from 'react';
import PropTypes from 'prop-types';

const Input = props => (
    <div className="control">
        <input
            className="input"
            type="text"
            placeholder={props.placeholder}
            onChange={props.onChangeSearchMarker}
            aria-label={props.ariaLabel}
        />
    </div>
);

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string.isRequired,
    onChangeSearchMarker: PropTypes.func.isRequired
};

export default Input;
