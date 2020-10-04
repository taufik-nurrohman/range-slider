Simple Custom Range Slider
==========================

> The simplest JavaScript custom range slider ever!

[![View Demo](https://cloud.githubusercontent.com/assets/1669261/17064930/5fd9e440-5069-11e6-9f61-071b0be5bd56.png)](https://taufik-nurrohman.github.io/range-slider/range-slider.html "View Demo")

Basic Usage
-----------

The required HTML is:

~~~ .html
<div id="range-slider-1"></div>
~~~

Execution…

### Basic

~~~ .js
// horizontal slider
RS(document.getElementById('range-slider-1'), function(value, target, event) {
    console.log(value);
});

// vertical slider
RS(document.getElementById('range-slider-1'), function(value, target, event) {
    console.log(value);
}, true);
~~~

### Advance

~~~ .js
RS(document.getElementById('range-slider-1'), {
    value: 1, // initial value
    vertical: false, // vertical or horizontal slider?
    create: function(value, target) { … }, // create event
    start: function(value, target, event) { … }, // start event
    drag: function(value, target, event) { … }, // drag event
    stop: function(value, target, event) { … } // stop event
});
~~~

Examples
--------

 - [No Idea?](https://taufik-nurrohman.github.io/range-slider/range-slider.noob.html)
 - [Custom Classes](https://taufik-nurrohman.github.io/range-slider/range-slider.custom.html)
 - [Fallback to HTML5 `<input type="range">` if JavaScript is Disabled](https://taufik-nurrohman.github.io/range-slider/range-slider.replace.html)
 - [Custom `min` and `max` Value in Range Slider as Pixel](https://taufik-nurrohman.github.io/range-slider/range-slider.custom-range.html)
 - [Tooltip](https://taufik-nurrohman.github.io/range-slider/range-slider.tip.html)

Folks
-----

> **Update 2016/07/21:** Is now has support for touch devices by default.

 - Added support for touch devices by @beard86 → [link](https://github.com/beard86/simple-custom-range-slider)
