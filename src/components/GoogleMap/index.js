import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';
import { compose, withProps, withHandlers } from 'recompose';

import './styles.scss';

const MapWithAMarker = compose(
    withProps({
        googleMapURL:
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyAe3FaSbC6tpAAnbQiE0HQX0nBuQBGEyWM&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `calc(100vh - 3.25rem)` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withHandlers({
        onToggleInfoWindow: props => marker => () => {
            props.handleToggleInfoWindow(marker);
        },
        onOpenModalWithDetail: props => marker => () => {
            props.handleOpenModalWithDetail(marker);
        }
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap defaultZoom={15} defaultCenter={props.center}>
        {props.markers.map(marker => (
            <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={props.onToggleInfoWindow(marker)}
                animation={marker.isShowInfoWindow ? 1 : 0}
            >
                {marker.isShowInfoWindow && (
                    <InfoWindow onCloseClick={props.onToggleInfoWindow(marker)}>
                        <div>
                            <div className="google-map-title">
                                {marker.title}
                            </div>
                            <button
                                type="button"
                                className="button is-success is-small"
                                onClick={props.onOpenModalWithDetail(marker)}
                            >
                                show detail
                            </button>
                        </div>
                    </InfoWindow>
                )}
            </Marker>
        ))}
    </GoogleMap>
));

export default MapWithAMarker;
