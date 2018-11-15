import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';
import { compose, withProps, withHandlers } from 'recompose';

const MapWithAMarker = compose(
    withProps({
        googleMapURL:
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyAe3FaSbC6tpAAnbQiE0HQX0nBuQBGEyWM&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withHandlers({
        onToggleInfoWindow: props => index => () => {
            props.handleToggleInfoWindow(index);
        }
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: props.markers[0].lat, lng: props.markers[0].lng }}
    >
        {props.markers.map((mark, index) => (
            <Marker
                key={mark.id}
                position={{ lat: mark.lat, lng: mark.lng }}
                onClick={props.onToggleInfoWindow(index)}
            >
                {mark.isShowInfoWindow && (
                    <InfoWindow onCloseClick={props.onToggleInfoWindow(index)}>
                        <div>{mark.title}</div>
                    </InfoWindow>
                )}
            </Marker>
        ))}
    </GoogleMap>
));

export default MapWithAMarker;
