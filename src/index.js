import React from 'react';
import { render } from 'react-dom';

import './styles.scss';
import App from './containers/App/index.js';
import registerServiceWorker from './registerServiceWorker';

render(<App />, document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
}

registerServiceWorker();
