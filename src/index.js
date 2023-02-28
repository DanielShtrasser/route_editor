import ReactDOM from 'react-dom/client';
import init from './init.jsx'

import './index.css';

function render() {
    const vdom = init()

    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(vdom)
}

render()
