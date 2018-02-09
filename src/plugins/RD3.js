import * as d3 from 'd3';
import { event } from 'd3-selection';

import MouseEvent from './RD3/RD3MouseEvent';
import * as RD3Util from './RD3/RD3Util';
import * as RD3Rect from './RD3/RD3Rect';

class RD3 {
    constructor () {
        this.dispatcher = d3.dispatch(
            'onload',
            'drawend'
        );

        this.viewPercent = 1;
        this.containerTop = 50;
        this.containerLeft = 0;
        this.canDraw = false;
        
        this.RD3MouseEvent = null;
    }

    init ({ dom, config = {} }) {
        this.dom = dom;
        this.config = config;

        this.instance = d3.select(dom).append('svg');

        this.instance.attr('viewBox', `0 0 ${+config.width.split('%')[0] / 100 * d3.select(dom).node().offsetWidth} ${+config.height.split('%')[0] / 100 * d3.select(dom).node().offsetHeight}`);

        this.RD3MouseEvent = new MouseEvent(this.instance, this);
        this.RD3MouseEvent.init();

        this.dispatcher.call('onload', this, true);
    }

    draw () {
        this.canDraw = true;
    }

    on (type, cb) {
        this.dispatcher.on(type, cb);
    }

    getCoords (event, fix) {
        return RD3Util.getCoords(fix, this.viewPercent, this.instance, this.containerLeft, this.containerTop, event);
    }
}

export default RD3;