import React from 'react';
import { render } from 'react-dom';

import GoogleMap from './components/GoogleMap/index';

render(
    <div>
        <h1>Projeto - Mapa do bairro</h1>
        <GoogleMap
            googleMapURL={
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyAe3FaSbC6tpAAnbQiE0HQX0nBuQBGEyWM&v=3.exp&libraries=geometry,drawing,places'
            }
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    </div>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept();
}
