/*!
 *
 * ================================================================================
 *  THE SIMPLEST JAVASCRIPT CUSTOM RANGE SLIDER
 *  Author: Taufik Nurrohman <https://github.com/tovic>
 * ================================================================================
 *
 * Copyright © 2016 Taufik Nurrohman
 * ---------------------------------
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

// `RS(target, {})`
function RS(target, event, vertical) {

    var win = window,
        doc = document,
        range = doc.createElement('div'),
        dragger = doc.createElement('span'),
        drag = false,
        rangeSize = 0,
        draggerSize = 0,
        rangeDistance = 0,
        cacheValue = 0,
        vertical = vertical || event.vertical || false,
        dir = vertical ? 'top' : 'left';

    function isSet(x) {
        return typeof x !== "undefined";
    }

    function isFunction(x) {
        return typeof x === "function";
    }

    function coord(el) {
        var distance = el[vertical ? 'offsetTop' : 'offsetLeft'];
        if (el.offsetParent) {
            while(el = el.offsetParent) {
                distance += el[vertical ? 'offsetTop' : 'offsetLeft'];
            }
        }
        return distance;
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
        if (el.addEventListener) {
            el.removeEventListener(ev, fn);
        } else if (el.attachEvent) {
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
    addClass('range-slider-track', range);
    addClass('dragger', dragger);

    // `RS(target, function(a, b) {})`
    if (isFunction(event)) {
        event = {
            drag: event
        };
    }

    function edge(a, b, c) {
        if (a < b) {
            a = b;
        } else if (a > c) {
            a = c;
        }
        return a;
    }

    function preventDefault(e) {
        if (e.preventDefault) e.preventDefault();
        return false;
    }

    function setSize() {
        rangeSize = range[vertical ? 'offsetHeight' : 'offsetWidth'];
        rangeDistance = coord(range);
        draggerSize = dragger[vertical ? 'offsetHeight' : 'offsetWidth'];
    }

    function dragInit() {
        cacheValue = edge(isSet(event.value) ? event.value : 0, 0, 100);
        dragger.style[dir] = (((cacheValue / 100) * rangeSize) - (draggerSize / 2)) + 'px';
        if (isFunction(event.create)) event.create(cacheValue, target);
        if (isFunction(event.drag)) event.drag(cacheValue, target);
    }

    function dragStart(e) {
        setSize(), drag = true, dragUpdate(e);
        on("touchmove", doc, dragMove);
        on("mousemove", doc, dragMove);
        if (isFunction(event.start)) event.start(cacheValue, target, e);
        return preventDefault(e);
    }

    function dragMove(e) {
        dragUpdate(e);
        if (isFunction(event.drag)) event.drag(cacheValue, target, e);
        return preventDefault(e);
    }

    function dragStop(e) {
        drag = false;
        off("touchmove", doc, dragMove);
        off("mousemove", doc, dragMove);
        if (isFunction(event.stop)) event.stop(cacheValue, target, e);
        return preventDefault(e);
    }

    function dragUpdate(e) {
        e = e || win.event;
        var pos = e.touches ? e.touches[0][vertical ? 'pageY' : 'pageX'] : e[vertical ? 'pageY' : 'pageX'],
            move = edge(pos - rangeDistance, 0, rangeSize),
            value = edge(((pos - rangeDistance) / rangeSize) * 100, 0, 100);
        if (!pos) {
            pos = e[vertical ? 'clientY' : 'clientX'] + doc.body[vertical ? 'scrollTop' : 'scrollLeft'] + doc.documentElement[vertical ? 'scrollTop' : 'scrollLeft'];
        }
        if (drag) {
            dragger.style[dir] = (move - (draggerSize / 2)) + 'px';
            cacheValue = Math.round(value);
        }
    }

    on("touchstart", range, dragStart);
    on("mousedown", range, dragStart);

    on("touchend", doc, dragStop);
    on("mouseup", doc, dragStop);

    on("resize", win, function(e) {
        setSize(), drag = false;
        dragger.style[dir] = (((cacheValue / 100) * rangeSize) - (draggerSize / 2)) + 'px';
    });

    range.appendChild(dragger);
    target.insertBefore(range, target.firstChild || null);

    setSize(), dragInit();

}