import React from 'react';
import PropTypes from 'prop-types';

const PlaceList = props => (
    <ul className="menu-list">
        {props.places.map(marker => (
            <li
                key={marker.id}
                onClick={() => props.handleToggleInfoWindow(marker)}
            >
                <a className={marker.isShowInfoWindow ? 'is-active' : ''}>
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
