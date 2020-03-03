/**
 * The entry point
 */

import 'babel-polyfill';
import render from './components/app';
import register from 'cors-proxy-webpack-plugin/dist/runtime';
register();

window.addEventListener('load', () => {
    const app = document.getElementById('app')
    render(app);
});
