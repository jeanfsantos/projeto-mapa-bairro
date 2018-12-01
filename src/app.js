import React from 'react';
import update from 'immutability-helper';
import queryString from 'query-string';

import GoogleMap from './components/GoogleMap/index';
import Menu from './components/Menu/index';
import Navbar from './components/Navbar/index';
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
        this.elementRef = React.createRef();
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
                this.setState({ detail }, () => {
                    this.elementRef.current.focus();
                });
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

    onChangeSearchMarker = ({ target }) => {
        this.setState(prevState => ({
            ...prevState,
            searchMarkerValue: target.value
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
                            <Menu
                                markers={markers}
                                filterMarkers={this.filterMarkers}
                                handleToggleInfoWindow={
                                    this.handleToggleInfoWindow
                                }
                                onChangeSearchMarker={this.onChangeSearchMarker}
                            />
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
                                modalRef={this.elementRef}
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
