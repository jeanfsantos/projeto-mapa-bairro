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
            detail: null
        };
    }

    componentDidMount() {
        axios
            .get('/api/initial-markers')
            .then(response => response.data)
            .then(data => {
                const markers = data.markers.map(marker => ({
                    ...marker,
                    isShowInfoWindow: false
                }));
                this.setState({ markers, center: data.center });
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
        this.setState({ detail: null });
        this.getInfoLocation(marker).then(detail => {
            this.setState({ detail });
        });
    };

    onCloseModal = () => {
        this.setState({ detail: null });
    };

    render() {
        const { markers, center, detail } = this.state;
        return (
            <div style={{ display: 'flex' }}>
                <aside
                    className="menu"
                    style={{ width: '300px', margin: '1rem' }}
                >
                    {markers.length && (
                        <React.Fragment>
                            <form>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Pesquisar"
                                        onChange={this.onChangeSearchMarker}
                                    />
                                </div>
                            </form>
                            <p className="menu-label">Lugares</p>
                            <ul className="menu-list">
                                {markers
                                    .filter(this.filterMarkers)
                                    .map(marker => (
                                        <li
                                            key={marker.id}
                                            onClick={() =>
                                                this.handleToggleInfoWindow(
                                                    marker
                                                )
                                            }
                                        >
                                            <a
                                                className={
                                                    marker.isShowInfoWindow
                                                        ? 'is-active'
                                                        : ''
                                                }
                                            >
                                                {marker.title}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </React.Fragment>
                    )}
                </aside>
                <div style={{ width: '100%' }}>
                    <nav
                        className="navbar"
                        role="navigation"
                        aria-label="main navigation"
                    >
                        <div className="navbar-brand">
                            <div style={{ lineHeight: '52px' }}>
                                Projeto - Mapa do bairro
                            </div>
                            <a
                                role="button"
                                className="navbar-burger"
                                aria-label="menu"
                                aria-expanded="false"
                            >
                                <span aria-hidden="true" />
                                <span aria-hidden="true" />
                                <span aria-hidden="true" />
                            </a>
                        </div>
                    </nav>
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
                    <div className="modal is-active">
                        <div className="modal-background" />
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">
                                    {detail.name}
                                </p>
                                <button
                                    className="delete"
                                    aria-label="close"
                                    onClick={this.onCloseModal}
                                />
                            </header>
                            <section className="modal-card-body">
                                <div style={{ display: 'flex' }}>
                                    <div
                                        style={{
                                            maxWidth: '300px',
                                            marginRight: '2rem'
                                        }}
                                    >
                                        <img src={detail.image_url} />
                                    </div>
                                    <div>
                                        {detail.review_count && (
                                            <div>
                                                Reviews: {detail.review_count}
                                            </div>
                                        )}
                                        {detail.rating && (
                                            <div>
                                                Avaliação: {detail.rating}
                                            </div>
                                        )}
                                        {detail.display_phone && (
                                            <div>
                                                Telefone: {detail.display_phone}
                                            </div>
                                        )}
                                        {detail.display_address && (
                                            <div>
                                                Endereço:{' '}
                                                {detail.display_address &&
                                                    detail.display_address.join(
                                                        ', '
                                                    )}
                                            </div>
                                        )}
                                        {detail.url && (
                                            <div>
                                                <a
                                                    href={detail.url}
                                                    title={`Detalhes do ${
                                                        detail.name
                                                    }`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Ver mais
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
