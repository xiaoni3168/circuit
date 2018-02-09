import React, { createContext } from 'react';
import { render } from 'react-dom';

import Dashboard from './pages/Dashboard';

import './styles/base.scss';

window.AppContext = createContext();

render(
    <AppContext.Provider value={{app: ''}}>
        <Dashboard></Dashboard>
    </AppContext.Provider>,
    document.querySelector('#app')
)