import React from 'react';
import PropTypes from 'prop-types';

const PlaceList = props => (
    <ul className="menu-list" role="listbox" aria-label="Lugares" tabIndex="0">
        {props.places.map(marker => (
            <li
                key={marker.id}
                onClick={() => props.handleToggleInfoWindow(marker)}
                role="none"
            >
                <a
                    className={marker.isShowInfoWindow ? 'is-active' : ''}
                    tabIndex="0"
                    role="option"
                    aria-selected={marker.isShowInfoWindow}
                >
                    {marker.title}
                </a>
            </li>
        ))}
    </ul>
);

PlaceList.propTypes = {
    places: PropTypes.array.isRequired,
    handleToggleInfoWindow: PropTypes.func.isRequired
};

export default PlaceList;
