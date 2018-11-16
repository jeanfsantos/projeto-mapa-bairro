import React from 'react';
import update from 'immutability-helper';
import axios from 'axios';

import GoogleMap from './components/GoogleMap/index';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: null,
            markers: [],
            searchMarkerValue: '',
            loading: false,
            detail: null
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios
            .get('/api/initial-markers')
            .then(response => response.data)
            .then(data => {
                const markers = data.markers.map(marker => ({
                    ...marker,
                    isShowInfoWindow: false
                }));
                this.setState({ loading: false, markers, center: data.center });
            });
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
        !isShowInfoWindow && this.onCloseModal();
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
        return new Promise((resolve, reject) => {
            axios
                .get('/api/info-location', { params: { marker } })
                .then(response => response.data)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    handleOpenModalWithDetail = marker => {
        this.setState({ loading: true, detail: null });
        this.getInfoLocation(marker).then(detail => {
            this.setState({ loading: false, detail });
        });
    };

    onCloseModal = () => {
        this.setState({ detail: null });
    };

    render() {
        const { markers, center, detail } = this.state;
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
                {markers.length && (
                    <React.Fragment>
                        <ul>
                            {markers.filter(this.filterMarkers).map(marker => (
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
                            markers={markers.filter(this.filterMarkers)}
                            center={center}
                            handleToggleInfoWindow={this.handleToggleInfoWindow}
                            handleOpenModalWithDetail={
                                this.handleOpenModalWithDetail
                            }
                        />
                    </React.Fragment>
                )}
                {this.state.loading && <div>Carregando...</div>}
                {detail && (
                    <div>
                        <div>{detail.name}</div>
                        <img src={detail.image_url} />
                        <div>{detail.review_count}</div>
                        <div>{detail.rating}</div>
                        <div>{detail.display_phone}</div>
                        <div>
                            <a
                                href={detail.url}
                                title={`Detalhes do ${detail.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ver mais
                            </a>
                        </div>
                        <div>
                            {detail.display_address &&
                                detail.display_address.join(', ')}
                        </div>
                        <button type="button" onClick={this.onCloseModal}>
                            fechar
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
