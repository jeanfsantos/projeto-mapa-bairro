import React from 'react';
import { render } from 'react-dom';

import './styles.scss';
import App from './app.js';

render(<App />, document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
}
