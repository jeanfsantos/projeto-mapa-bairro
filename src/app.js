import React from 'react';
import update from 'immutability-helper';
import queryString from 'query-string';

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
            loading: false,
            showMenu: true,
            showError: false
        };
    }

    componentDidMount() {
        this.setInitialMarkers();
    }

    setInitialMarkers() {
        this.setState({ loading: true });
        fetch('/api/initial-markers')
            .then(response => response.json())
            .then(data => {
                const markers = data.markers.map(marker => ({
                    ...marker,
                    isShowInfoWindow: false
                }));
                this.setState({ markers, center: data.center });
            })
            .catch(() => {
                this.setState({
                    showError: true
                });
            })
            .finally(() => {
                this.setState({ loading: false });
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
            const query = queryString.stringify(marker);
            fetch(`/api/info-location?${query}`)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    handleOpenModalWithDetail = marker => {
        this.setState({ loading: true, detail: null });
        this.getInfoLocation(marker)
            .then(detail => {
                this.setState({ detail });
            })
            .catch(() => {
                this.setState({
                    showError: true
                });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    onCloseModal = () => {
        this.setState({ detail: null });
    };

    onToggleMenu = () => {
        this.setState(prevState => ({
            ...prevState,
            showMenu: !prevState.showMenu
        }));
    };

    render() {
        const {
            markers,
            center,
            detail,
            loading,
            showMenu,
            showError
        } = this.state;
        return (
            <div className="wrapper">
                {showError ? (
                    <Overlay>
                        <div className="wrapper-loading">
                            <article className="message is-danger">
                                <div className="message-header">
                                    <p>Erro</p>
                                </div>
                                <div className="message-body">
                                    Ops, ocorreu um erro favor recarregar a
                                    página, caso o erro persistir tente mais
                                    tarde. (:
                                </div>
                            </article>
                        </div>
                    </Overlay>
                ) : (
                    <React.Fragment>
                        {showMenu && (
                            <aside className="menu menu-section">
                                {markers.length && (
                                    <React.Fragment>
                                        <div>
                                            <h1>Projeto - Mapa do bairro</h1>
                                            <br />
                                            <form>
                                                <Input
                                                    placeholder="Filtrar"
                                                    onChangeSearchMarker={
                                                        this
                                                            .onChangeSearchMarker
                                                    }
                                                    ariaLabel="Filtrar lugares"
                                                />
                                            </form>
                                            <p className="menu-label">
                                                Lugares
                                            </p>
                                            <PlaceList
                                                places={markers.filter(
                                                    this.filterMarkers
                                                )}
                                                handleToggleInfoWindow={
                                                    this.handleToggleInfoWindow
                                                }
                                            />
                                        </div>
                                        <div tabIndex="0">
                                            <div>{"API's utilizadas:"}</div>
                                            <ul>
                                                <li role="none">
                                                    <a href="https://cloud.google.com/maps-platform/?hl=pt-BR">
                                                        Google Map
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://www.yelp.com/developers">
                                                        Yelp
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </React.Fragment>
                                )}
                            </aside>
                        )}
                        <div className="content-section">
                            <Navbar
                                onToggleMenu={this.onToggleMenu}
                                showMenu={showMenu}
                            />
                            {markers.length && (
                                <GoogleMap
                                    markers={markers.filter(this.filterMarkers)}
                                    center={center}
                                    handleToggleInfoWindow={
                                        this.handleToggleInfoWindow
                                    }
                                    handleOpenModalWithDetail={
                                        this.handleOpenModalWithDetail
                                    }
                                />
                            )}
                        </div>
                        {detail && (
                            <Modal
                                detail={detail}
                                onCloseModal={this.onCloseModal}
                            />
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
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default App;
