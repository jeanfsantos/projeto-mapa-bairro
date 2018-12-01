import React from 'react';
import update from 'immutability-helper';
import queryString from 'query-string';

import Error from '../Error/index';
import GoogleMap from '../../components/GoogleMap/index';
import Menu from '../../components/Menu/index';
import Navbar from '../../components/Navbar/index';
import Modal from '../../components/Modal/index';
import Loading from '../../components/Loading/index';

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
            errorMessage: null
        };
        this.elementRef = React.createRef();
    }

    componentDidMount() {
        this.setInitialMarkers();
    }

    // metodo para buscar os pontos iniciais da api,
    // em caso de erro sera mostrado o container Erro com messagem
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
                    errorMessage: 'não foi possível buscar os locais'
                });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    // metodo para mostrar a janela de informacao do lugar
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

    // metodo para filtra a listagem de lugares
    filterMarkers = marker => {
        const { searchMarkerValue: value } = this.state;
        if (!value) {
            return true;
        }
        const regex = new RegExp(value, 'i');
        return regex.test(marker.title);
    };

    // metodo para buscar no endpoint mais informacoes
    // da api yelp
    getInfoLocation(marker) {
        return new Promise((resolve, reject) => {
            const query = queryString.stringify(marker);
            fetch(`/api/info-location?${query}`)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    // metodo responsavel para mostrar o modal com detalhes do lugar
    // em caso de erro sera mostrado o container erro com mensagem
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
                this.setState({
                    errorMessage: 'não foi possível carregar o detalhe do ponto'
                });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    // metodo responsavel para limpar e fechar o modal
    onCloseModal = () => {
        this.setState({ detail: null });
    };

    // metodo para fazer o toggle do burger e menu
    onToggleMenu = () => {
        this.setState(prevState => ({
            ...prevState,
            showMenu: !prevState.showMenu
        }));
    };

    // metodo para popular o valor do search
    onChangeSearchMarker = ({ target }) => {
        this.setState(prevState => ({
            ...prevState,
            searchMarkerValue: target.value
        }));
    };

    // metodo responsavel pelo fallback na autenticacao do google maps
    handleAuthMapError = errorMessage => {
        this.setState({ errorMessage });
    };

    render() {
        const {
            markers,
            center,
            detail,
            loading,
            showMenu,
            errorMessage
        } = this.state;
        return (
            <div className="wrapper">
                {errorMessage ? (
                    <Error message={errorMessage} />
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
                                    handleAuthMapError={this.handleAuthMapError}
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
                        <Loading loading={loading} />
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default App;
