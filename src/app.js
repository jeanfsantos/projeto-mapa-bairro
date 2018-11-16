import React from 'react';
import update from 'immutability-helper';
import axios from 'axios';

import DATA from './data.json';
import GoogleMap from './components/GoogleMap/index';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: DATA.markers.map(marker => ({
                ...marker,
                isShowInfoWindow: false
            })),
            searchMarkerValue: ''
        };
    }

    handleToggleInfoWindow = marker => {
        const index = this.state.markers.findIndex(
            mark => mark.id === marker.id
        );
        const isShowInfoWindow = !this.state.markers[index].isShowInfoWindow;
        this.setState({
            markers: update(this.state.markers, {
                [index]: {
                    isShowInfoWindow: {
                        $set: isShowInfoWindow
                    }
                }
            })
        });
        isShowInfoWindow && this.getInfoLocation(marker);
    };

    onChangeSearchMarker = ({ target }) => {
        this.setState(prevState => ({
            ...prevState,
            searchMarkerValue: target.value
        }));
    };

    filterMarkers = marker => {
        const { searchMarkerValue: value } = this.state;
        if (!value) {
            return true;
        }
        const regex = new RegExp(value, 'i');
        return regex.test(marker.title);
    };

    getInfoLocation(marker) {
        axios
            .get('/api/info-location', { params: { marker } })
            .then(response => response.data)
            .then(data => console.log(data));
    }

    render() {
        return (
            <div>
                <h1>Projeto - Mapa do bairro</h1>
                <form>
                    <label htmlFor="search-marker" />
                    <input
                        type="text"
                        id="search-marker"
                        onChange={this.onChangeSearchMarker}
                    />
                </form>
                <ul>
                    {this.state.markers
                        .filter(this.filterMarkers)
                        .map(marker => (
                            <li
                                key={marker.id}
                                onClick={() =>
                                    this.handleToggleInfoWindow(marker)
                                }
                            >
                                {marker.title}
                            </li>
                        ))}
                </ul>
                <br />
                <GoogleMap
                    markers={this.state.markers.filter(this.filterMarkers)}
                    center={DATA.center}
                    handleToggleInfoWindow={this.handleToggleInfoWindow}
                />
            </div>
        );
    }
}

export default App;
