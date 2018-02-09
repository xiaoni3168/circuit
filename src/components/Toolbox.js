import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classname from 'classname';

import '../styles/components/toolbox.scss';

const elements = require('./config/element.json').elements;

class Toolbox extends Component {
    constructor () {
        super();

        this.state = {
            elements: elements
        }
    }

    componentDidMount () {
        
    }

    render () {
        return (
            <AppContext.Consumer>
            {
                context => (
                    <div className="toolbox">
                        <div className="toolbox-content">
                        {
                            this.state.elements.map((els, i) => {
                                return (
                                    <div className={classname('toolbox-content_group', {'open': els.open})} key={els.id} onClick={
                                        () => {
                                            this.setState(Object.assign({}, this.state.elements, this.state.elements.map(e => {
                                                if (e.id == els.id) {
                                                    e.open = !e.open;
                                                }
                                            })));
                                        }
                                    }>
                                        <span>{els.label}</span>
                                        <div className={classname('toolbox-content_group--wrap', {'open': els.open})} onClick={
                                            e => {
                                                e.stopPropagation();
                                            }
                                        }>
                                        {
                                            els.children.map((el, i) => {
                                                return (
                                                    <div key={el.id} className={classname('toolbox-content_group--wrap-item', {'selected': el.selected})} onClick={
                                                        () => {
                                                            this.setState(Object.assign({}, this.state.elements, this.state.elements.map(e => {
                                                                if (e.id == els.id) {
                                                                    e = Object.assign({}, e, e.children.map(item => {
                                                                        if (item.id == el.id) {
                                                                            item.selected = !item.selected;
                                                                            if (item.selected) {
                                                                                context.$d3.draw();
                                                                            } else {
                                                                                context.$d3.canDraw = false;
                                                                            }
                                                                        } else {
                                                                            item.selected = false;
                                                                        }
                                                                    }));
                                                                } else {
                                                                    e = Object.assign({}, e, e.children.map(item => {
                                                                        item.selected = false;
                                                                    }));
                                                                }
                                                            })));
                                                        }
                                                    }></div>
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                )
            }
            </AppContext.Consumer>
        )
    }
}

export default Toolbox;