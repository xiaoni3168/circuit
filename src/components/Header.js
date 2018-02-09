import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../styles/components/header.scss';

class Header extends Component {
    constructor () {
        super();
    }

    render () {
        return (
            <AppContext.Consumer>
            {
                context => {
                    return (
                        <div className="header">
                            {context.app}
                        </div>
                    )
                }
            }
            </AppContext.Consumer>
        )
    }
}

export default Header;