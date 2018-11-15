import React from 'react';
import update from 'immutability-helper';

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

    handleToggleInfoWindow = index => {
        this.setState({
            markers: update(this.state.markers, {
                [index]: {
                    isShowInfoWindow: {
                        $set: !this.state.markers[index].isShowInfoWindow
                    }
                }
            })
        });
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
                        .map((marker, index) => (
                            <li
                                key={marker.id}
                                onClick={() =>
                                    this.handleToggleInfoWindow(index)
                                }
                            >
                                {marker.title}
                            </li>
                        ))}
                </ul>
                <br />
                <GoogleMap
                    markers={this.state.markers.filter(this.filterMarkers)}
                    handleToggleInfoWindow={this.handleToggleInfoWindow}
                />
            </div>
        );
    }
}

export default App;
