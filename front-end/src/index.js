import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routing';
import IconSystem from './services/IconSystem.Service';
import './assets/IconSystem.Assets';
import './assets/Image.Assets';
import './public/styles/base.scss';

window.onload = () => {
    const body = document.getElementsByTagName('body')[0];
    const div = document.createElement('div');
    div.setAttribute('id', 'main');
    body.appendChild(div);
    ReactDOM.render(<AppRoutes />, document.getElementById('main'));
    IconSystem.render('/public/images/sprites.svg');
};