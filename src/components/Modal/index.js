import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Modal = props => (
    <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">{props.detail.name}</p>
                <button
                    className="delete"
                    aria-label="close"
                    onClick={props.onCloseModal}
                />
            </header>
            <section className="modal-card-body">
                <div className="modal-card-body-wrap">
                    <div className="modal-card-body-content">
                        <img src={props.detail.image_url} />
                    </div>
                    <div>
                        {props.detail.review_count && (
                            <div>Reviews: {props.detail.review_count}</div>
                        )}
                        {props.detail.rating && (
                            <div>Avaliação: {props.detail.rating}</div>
                        )}
                        {props.detail.display_phone && (
                            <div>Telefone: {props.detail.display_phone}</div>
                        )}
                        {props.detail.display_address && (
                            <div>
                                Endereço:{' '}
                                {props.detail.display_address &&
                                    props.detail.display_address.join(', ')}
                            </div>
                        )}
                        {props.detail.url && (
                            <div>
                                <a
                                    href={props.detail.url}
                                    title={`Detalhes do ${props.detail.name}`}
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
);

Modal.propTypes = {
    detail: PropTypes.object.isRequired,
    onCloseModal: PropTypes.func.isRequired
};

export default Modal;
