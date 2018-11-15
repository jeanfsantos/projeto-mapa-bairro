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
        onToggleInfoWindow: props => marker => () => {
            props.handleToggleInfoWindow(marker);
        }
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: props.markers[0].lat, lng: props.markers[0].lng }}
    >
        {props.markers.map(marker => (
            <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={props.onToggleInfoWindow(marker)}
            >
                {marker.isShowInfoWindow && (
                    <InfoWindow onCloseClick={props.onToggleInfoWindow(marker)}>
                        <div>{marker.title}</div>
                    </InfoWindow>
                )}
            </Marker>
        ))}
    </GoogleMap>
));

export default MapWithAMarker;
