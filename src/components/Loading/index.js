import React from 'react';
import PropTypes from 'prop-types';

import Overlay from '../Overlay/index';

const Loading = ({ loading }) => {
    return (
        loading && (
            <Overlay>
                <div className="wrapper-loading">
                    <progress className="progress is-large is-info" max="100">
                        60%
                    </progress>
                </div>
            </Overlay>
        )
    );
};

Loading.propTypes = {
    loading: PropTypes.bool
};

Loading.defaultProps = {
    loading: false
};

export default Loading;
