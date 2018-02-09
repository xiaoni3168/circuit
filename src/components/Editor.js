import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RD3 from '../plugins/RD3';

import '../styles/components/editor.scss';

class Editor extends Component {
    constructor () {
        super();

        this.state = {
            rd3: new RD3()
        }
    }

    componentDidMount () {
        setTimeout(() => {
            this.state.rd3.init({
                dom: '#canvas',
                config: {
                    height: '100%',
                    width: '100%'
                }
            });
        });
    }

    render () {
        return (
            <AppContext.Consumer>
            {
                context => {
                    context.$d3 = this.state.rd3;
                    return (
                        <div className="editor">
                            <div className="editor-canvas" id="canvas"></div>
                        </div>
                    )
                }
            }
            </AppContext.Consumer>
        )
    }
}

export default Editor;