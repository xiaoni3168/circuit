import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Example extends Component {
    constructor () {
        super();
    }

    componentDidMount () {

    }

    render () {
        return (
            <AppContext.Consumer>
            {
                (context) => {
                    return (
                        <div>{context.test}</div>
                    )
                }
            }
            </AppContext.Consumer>
        )
    }
}

export default Example;