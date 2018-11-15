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
            }))
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

    render() {
        return (
            <div>
                <h1>Projeto - Mapa do bairro</h1>
                <GoogleMap
                    markers={this.state.markers}
                    handleToggleInfoWindow={this.handleToggleInfoWindow}
                />
            </div>
        );
    }
}

export default App;
