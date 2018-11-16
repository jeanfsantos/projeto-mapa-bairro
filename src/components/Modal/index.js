import React from 'react';
import PropTypes from 'prop-types';
import AriaModal from 'react-aria-modal';

import './styles.scss';

const Modal = props => (
    <AriaModal
        titleText={`Detalhes do ${props.detail.name}`}
        onExit={props.onCloseModal}
        initialFocus="#modal-detail"
    >
        <div className="modal is-active" id="modal-detail">
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">
                        <a
                            tabIndex="-1"
                            role="none"
                            style={{ color: '#4a4a4a' }}
                            ref={props.modalRef}
                        >
                            {props.detail.name}
                        </a>
                    </p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={props.onCloseModal}
                    />
                </header>
                <section className="modal-card-body">
                    <div className="modal-card-body-wrap">
                        {props.detail.image_url && (
                            <div className="modal-card-body-content">
                                <img
                                    src={props.detail.image_url}
                                    alt={`foto tirada do local ${
                                        props.detail.name
                                    }`}
                                />
                            </div>
                        )}
                        <div
                            tabIndex="0"
                            aria-label={`Detalhes do ${props.detail.name}`}
                        >
                            {props.detail.review_count && (
                                <div tabIndex="0">
                                    Reviews: {props.detail.review_count}
                                </div>
                            )}
                            {props.detail.rating && (
                                <div tabIndex="0">
                                    Avaliação: {props.detail.rating}
                                </div>
                            )}
                            {props.detail.display_phone && (
                                <div tabIndex="0">
                                    Telefone: {props.detail.display_phone}
                                </div>
                            )}
                            {props.detail.display_address && (
                                <div tabIndex="0">
                                    Endereço:{' '}
                                    {props.detail.display_address &&
                                        props.detail.display_address.join(', ')}
                                </div>
                            )}
                            {props.detail.url && (
                                <div>
                                    <a
                                        href={props.detail.url}
                                        title={`Detalhes do ${
                                            props.detail.name
                                        }`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="ver mais detalhe na página Yelp"
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
    </AriaModal>
);

Modal.propTypes = {
    detail: PropTypes.object.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    modalRef: PropTypes.node.isRequired
};

export default Modal;
