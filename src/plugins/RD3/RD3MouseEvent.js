import * as d3 from 'd3';
import { event } from 'd3-selection';
import * as RD3Rect from './RD3Rect';
import Utils from '../../utils/utils';

class MouseEvent {
    constructor (container, RD3) {
        this.container = container;
        this.RD3 = RD3;

        this.onMouseUpFuncs     = [];
        this.onMouseDownFuncs   = [];
        this.onMouseMoveFuncs   = [];
        this.onMouseLeaveFuncs  = [];
        this.onMouseWheelFuncs  = [];
    }

    init () {
        const _this = this;

        this.container
            .on('mousedown', function () {
                _this.onMouseDownFuncs.forEach(f => {
                    f.call(this, _this.D3);
                })
            })
            .on('mouseup', function () {
                _this.onMouseUpFuncs.forEach(f => {
                    f.call(this, _this.D3);
                });
            })
            .on('mousemove', function () {
                _this.onMouseMoveFuncs.forEach(f => {
                    f.call(this, _this.D3);
                });
            })
            .on('mouseleave', function () {
                _this.onMouseLeaveFuncs.forEach(f => {
                    f.call(this, _this.D3);
                });
            })
            .on('wheel.zoom', function () {
                noevent();
                _this.onMouseWheelFuncs.forEach(f => {
                    f.call(this, _this.D3);
                });
            });
        
        this._drawElementsInit();
    }

    destroy () {
        this.onMouseUpFuncs     = [];
        this.onMouseDownFuncs   = [];
        this.onMouseMoveFuncs   = [];
        this.onMouseLeaveFuncs  = [];
        this.onMouseWheelFuncs  = [];
    }

    addMouseDownStack (f) {
        this.onMouseDownFuncs.push(f);
    }

    addMouseUpStack (f) {
        this.onMouseUpFuncs.push(f);
    }

    addMouseMoveStack (f) {
        this.onMouseMoveFuncs.push(f);
    }

    addMouseLeaveStack (f) {
        this.onMouseLeaveFuncs.push(f);
    }

    addMouseWheelStack (f) {
        this.onMouseWheelFuncs.push(f);
    }

    _drawElementsInit () {
        const _t = this;
        this.addMouseDownStack(function () {
            if (_t.RD3.canDraw) {
                _t.container
                    .selectAll('rect.drawer')
                    .data([
                        {
                            x: _t.RD3.getCoords().x,
                            y: _t.RD3.getCoords().y,
                            height: 0,
                            width: 0
                        }
                    ])
                    .enter()
                    .append('rect')
                    .classed('drawer', true)
                    .attr('x', d => d.x)
                    .attr('y', d => d.y)
                    .attr('height', d => d.height)
                    .attr('width', d => d.width)
                    .attr('fill', 'rgba(40, 136, 229, 0.2)');
                _t.container
                    .selectAll('text.drawer')
                    .data([
                        {
                            x: _t.RD3.getCoords().x,
                            y: _t.RD3.getCoords().y
                        }
                    ])
                    .enter()
                    .append('text')
                    .classed('drawer', true)
                    .attr('x', d => d.x + 5)
                    .attr('y', d => d.y + 5)
                    .attr('font-size', 10)
                    .text('0x0');
            }
        });
        this.addMouseMoveStack(function () {
            if (_t.RD3.canDraw) {
                d3.select('rect.drawer')
                    .attr('x', d => {
                        return _t.RD3.getCoords().x > d.x ? d.x : _t.RD3.getCoords().x;
                    })
                    .attr('y', d => {
                        return _t.RD3.getCoords().y > d.y ? d.y : _t.RD3.getCoords().y;
                    })
                    .attr('height', d => {
                        return d.height = Math.abs(_t.RD3.getCoords().y - d.y);
                    })
                    .attr('width', d => {
                        return d.width = Math.abs(_t.RD3.getCoords().x - d.x);
                    })
                    .each(d => {
                        d3.select('text.drawer')
                            .attr('x', _d => _d.x = _t.RD3.getCoords().x + 5)
                            .attr('y', _d => _d.y = _t.RD3.getCoords().y + 5)
                            .text(`${d.height}x${d.width}`);
                    });
            }
        });
        this.addMouseUpStack(function () {
            if (_t.RD3.canDraw) {
                let rect = d3.select('rect.drawer').data();
                d3.select('rect.drawer').remove();
                d3.select('text.drawer').remove();
                
                rect = Object.assign([], rect, [{
                    x: _t.RD3.getCoords().x > rect[0].x ? rect[0].x : _t.RD3.getCoords().x,
                    y: _t.RD3.getCoords().y > rect[0].y ? rect[0].y : _t.RD3.getCoords().y,
                    height: rect[0].height,
                    width: rect[0].width,
                    uid: Utils.uuid()
                }]);

                RD3Rect.addRect.call(_t.RD3, rect);
                
                _t.RD3.dispatcher.call('drawend', _t.RD3, true);
            }
        });
    }
}

export default MouseEvent;