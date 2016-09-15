/*!
 * ==========================================================
 *  RANGE SLIDER 2.0.1
 * ==========================================================
 * Author: Taufik Nurrohman <https://github.com/tovic>
 * License: MIT
 * ----------------------------------------------------------
 */

function RS(target, event, vertical) {

    event = event || {};

    var win = window,
        doc = document,
        ranger = doc.createElement('div'),
        dragger = doc.createElement('span'),
        drag = false,
        rangerSize = 0,
        draggerSize = 0,
        rangerDistance = 0,
        cacheValue = 0,
        vertical = vertical || event.vertical || false,
        size = vertical ? 'offsetHeight' : 'offsetWidth',
        css = vertical ? 'top' : 'left',
        page = vertical ? 'pageY' : 'pageX',
        offset = vertical ? 'offsetTop' : 'offsetLeft',
        client = vertical ? 'clientY' : 'clientX',
        scroll = vertical ? 'scrollTop' : 'scrollLeft';

    function isSet(x) {
        return typeof x !== "undefined";
    }

    function isFunc(x) {
        return typeof x === "function";
    }

    function getCoordinate(el) {
        var x = el[offset];
        while (el = el.offsetParent) {
            x += el[offset];
        }
        return x;
    }

    function on(ev, el, fn) {
        if (el.addEventListener) {
            el.addEventListener(ev, fn, false);
        } else if (el.attachEvent) {
            el.attachEvent('on' + ev, fn);
        } else {
            el['on' + ev] = fn;
        }
    }

    function off(ev, el, fn) {
        if (el.removeEventListener) {
            el.removeEventListener(ev, fn);
        } else if (el.detachEvent) {
            el.detachEvent('on' + ev, fn);
        } else {
            el['on' + ev] = null;
        }
    }

    function addClass(s, el) {
        if (el.classList) {
            el.classList.add(s);
        } else {
            el.className += ' ' + s;
        }
    }

    addClass('range-slider', target);
    addClass('range-slider-' + (vertical ? 'vertical' : 'horizontal'), target);
    addClass('range-slider-track', ranger);
    addClass('dragger', dragger);

    // `RS(target, function(a, b, c) {})`
    if (isFunc(event)) {
        event = {
            drag: event
        };
    }

    function edge(a, b, c) {
        if (a < b) return b;
        if (a > c) return c;
        return a;
    }

    function preventDefault(e) {
        if (e.preventDefault) e.preventDefault();
        return false;
    }

    function setSize() {
        rangerSize = ranger[size];
        rangerDistance = getCoordinate(ranger);
        draggerSize = dragger[size];
    }

    function dragInit() {
        cacheValue = edge(isSet(event.value) ? event.value : 0, 0, 100);
        dragger.style[css] = (((cacheValue / 100) * rangerSize) - (draggerSize / 2)) + 'px';
        if (isFunc(event.create)) event.create(cacheValue, target);
        if (isFunc(event.drag)) event.drag(cacheValue, target);
    }

    function dragStart(e) {
        setSize(), drag = true, dragUpdate(e);
        on("touchmove", doc, dragMove);
        on("mousemove", doc, dragMove);
        if (isFunc(event.start)) event.start(cacheValue, target, e);
        return preventDefault(e);
    }

    function dragMove(e) {
        dragUpdate(e);
        return preventDefault(e);
    }

    function dragStop(e) {
        drag = false;
        off("touchmove", doc, dragMove);
        off("mousemove", doc, dragMove);
        if (isFunc(event.stop)) event.stop(cacheValue, target, e);
        return preventDefault(e);
    }

    function dragUpdate(e) {
        e = e || win.event;
        var pos = e.touches ? e.touches[0][page] : e[page],
            move = edge(pos - rangerDistance, 0, rangerSize),
            value = edge(((pos - rangerDistance) / rangerSize) * 100, 0, 100);
        if (!pos) pos = e[client] + doc.body[scroll] + doc.documentElement[scroll];
        if (drag) {
            dragger.style[css] = (move - (draggerSize / 2)) + 'px';
            cacheValue = Math.round(value);
            if (isFunc(event.drag)) event.drag(cacheValue, target, e);
        }
    }

    on("touchstart", ranger, dragStart);
    on("mousedown", ranger, dragStart);

    on("touchend", doc, dragStop);
    on("mouseup", doc, dragStop);

    on("resize", win, function(e) {
        setSize(), drag = false;
        dragger.style[css] = (((cacheValue / 100) * rangerSize) - (draggerSize / 2)) + 'px';
    });

    ranger.appendChild(dragger);
    target.appendChild(ranger);

    return setSize(), dragInit(), target;

}