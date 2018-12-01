import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import Overlay from '../../components/Overlay/index';

const ErrorContainer = ({ message }) => {
    return (
        <Overlay>
            <div className="wrapper-error">
                <article className="message is-danger">
                    <div className="message-header">
                        <p>Erro</p>
                    </div>
                    <div className="message-body">
                        Ops, {message}. Favor recarregar a página, caso o erro
                        persistir tente mais tarde. (:
                    </div>
                </article>
            </div>
        </Overlay>
    );
};

ErrorContainer.propTypes = {
    message: PropTypes.string
};

ErrorContainer.defaultProps = {
    message: 'ocorreu um erro'
};

export default ErrorContainer;
