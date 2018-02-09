import * as d3 from 'd3';
import { event } from 'd3-selection';

export function rect (datas = [], func = {}) {
    const _t = this;

    let rectData = this.instance
        .selectAll('g[d-uid]')
        .data(datas)
        .enter()
        .append('g')
        .attr('d-uid', d => d.uid)
        .append('rect')
        .attr('d-uid', d => d.uid)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('height', d => d.height)
        .attr('width', d => d.width)
    
    rectData.call(
        d3.drag()
            .on('start', function (d) { dragstarted.call(this, d, _t) })
            .on('drag', function (d) { draged.call(this, d, _t) })
            .on('end', function (d) { dragended.call(this, d, _t) })
    );
}

export function addRect (rects) {
    let arr = [];
    this.instance.selectAll('rect[d-uid]').each(r => {
        arr.push(r);
    });

    rect.call(this, arr.concat(rects));
}

export function moveRect (d, poi, animation = 0) {
    d3.select(`rect[d-uid="${d.uid}"]`).attr('x', d.x = poi.x).attr('y', d.y = poi.y);
}

function dragstarted (d, RD3) {
    d3.select(`g[d-uid="${d.uid}"]`).raise().selectAll('*');
}

function draged (d, RD3) {
    moveRect.call(RD3, d, event);
}

function dragended (d, RD3) {

}