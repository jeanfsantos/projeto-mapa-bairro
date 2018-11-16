import React from 'react';
import update from 'immutability-helper';
import axios from 'axios';

import GoogleMap from './components/GoogleMap/index';
import Navbar from './components/Navbar/index';
import Input from './components/Input/index';
import PlaceList from './components/PlaceList/index';
import Modal from './components/Modal/index';
import Overlay from './components/Overlay/index';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: null,
            markers: [],
            searchMarkerValue: '',
            detail: null,
            loading: false
        };
    }

    componentDidMount() {
        this.setInitialMarkers();
    }

    setInitialMarkers() {
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
        const { markers, center, detail, loading } = this.state;
        return (
            <div className="wrapper">
                <aside className="menu menu-section">
                    {markers.length && (
                        <React.Fragment>
                            <form>
                                <Input
                                    placeholder="Pesquisar"
                                    onChangeSearchMarker={
                                        this.onChangeSearchMarker
                                    }
                                />
                            </form>
                            <p className="menu-label">Lugares</p>
                            <PlaceList
                                places={markers.filter(this.filterMarkers)}
                                handleToggleInfoWindow={
                                    this.handleToggleInfoWindow
                                }
                            />
                        </React.Fragment>
                    )}
                </aside>
                <div className="content-section">
                    <Navbar title="Projeto - Mapa do bairro" />
                    {markers.length && (
                        <GoogleMap
                            markers={markers.filter(this.filterMarkers)}
                            center={center}
                            handleToggleInfoWindow={this.handleToggleInfoWindow}
                            handleOpenModalWithDetail={
                                this.handleOpenModalWithDetail
                            }
                        />
                    )}
                </div>
                {detail && (
                    <Modal detail={detail} onCloseModal={this.onCloseModal} />
                )}
                {loading && (
                    <Overlay>
                        <div className="wrapper-loading">
                            <progress
                                className="progress is-large is-info"
                                max="100"
                            >
                                60%
                            </progress>
                        </div>
                    </Overlay>
                )}
            </div>
        );
    }
}

export default App;
