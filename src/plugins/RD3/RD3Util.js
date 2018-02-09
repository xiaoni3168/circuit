import { event } from 'd3-selection';

export function getCoords (fix, scale, container, offsetLeft, offsetTop, e) {
    let viewBox = container.attr('viewBox').split(/\s+/),
        x_trans = parseInt(viewBox[0]),
        y_trans = parseInt(viewBox[1]);

    e = e ? e : event;

    return {
        x: +((e.x + (fix ? fix : 0) - offsetLeft) / scale + x_trans).toFixed(1),
        y: +((e.y + (fix ? fix : 0) - offsetTop) / scale + y_trans).toFixed(1)
    }
}