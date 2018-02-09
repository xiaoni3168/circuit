import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header   from '../components/Header';
import Editor   from '../components/Editor';
import Toolbox  from '../components/Toolbox';

import '../styles/pages/dashboard.scss';

class Dashboard extends Component {
    constructor () {
        super();
    }

    componentDidMount () {
        console.log(123)
    }

    render () {
        return (
            <AppContext.Consumer>
            {
                context => {
                    return (
                        <div className="dashboard">
                            <AppContext.Provider value={context}>
                                <Header></Header>
                                <div className="dashboard-content">
                                    <Editor></Editor>
                                    <Toolbox></Toolbox>
                                </div> 
                            </AppContext.Provider>
                        </div>
                    )
                }
            }
            </AppContext.Consumer>
        )
    }
}

export default Dashboard;