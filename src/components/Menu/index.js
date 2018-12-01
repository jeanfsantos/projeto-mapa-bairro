import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import Input from '../Input/index';
import PlaceList from '../PlaceList/index';

class Menu extends React.Component {
    render() {
        const {
            markers,
            filterMarkers,
            handleToggleInfoWindow,
            onChangeSearchMarker
        } = this.props;
        return (
            <aside className="menu menu-section">
                {markers.length && (
                    <React.Fragment>
                        <div>
                            <h1>Projeto - Mapa do bairro</h1>
                            <br />
                            <form>
                                <Input
                                    placeholder="Filtrar"
                                    onChangeSearchMarker={onChangeSearchMarker}
                                    ariaLabel="Filtrar lugares"
                                />
                            </form>
                            <p className="menu-label">Lugares</p>
                            <PlaceList
                                places={markers.filter(filterMarkers)}
                                handleToggleInfoWindow={handleToggleInfoWindow}
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
        );
    }
}

Menu.propTypes = {
    markers: PropTypes.array.isRequired,
    filterMarkers: PropTypes.func.isRequired,
    handleToggleInfoWindow: PropTypes.func.isRequired,
    onChangeSearchMarker: PropTypes.func.isRequired
};

export default Menu;
