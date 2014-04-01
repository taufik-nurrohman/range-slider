Simple Custom Range Slider
==========================

> The Simplest JavaScript Custom Range Slider Ever!

[View Demo](https://rawgithub.com/tovic/simple-custom-range-slider/master/index.html)

Basic Usage
-----------

The required HTML is:

``` .html
<div id="range-slider-1"></div>
```

Execution&hellip;

``` .javascript
rangeSlider(document.getElementById('range-slider-1'), {
    // Configuration here...
});
```

Configurations
--------------

| Option         | Usage                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------- |
| `value`        | Set default value on initiation. Only accept number from `0` to `100` (percentage based). |
| `vertical`     | Set to `true` if you want to make the range slider become vertically oriented.            |
| `rangeClass`   | Used to add extra class for the range slider track.                                       |
| `draggerClass` | Used to add extra class for the range slider dragger.                                     |
| `drag`         | Function to return the range slider value into something.                                 |

Examples
--------

Showing the range slider value into a particular area:

``` .javascript
rangeSlider(document.getElementById('range-slider-1'), {
    drag: function(v) {
        document.getElementById('result-area').innerHTML = v + '%';
    }
});
```

Set default value on initiation:

``` .javascript
rangeSlider(document.getElementById('range-slider-1'), {
    value: 10, // 10% of total width
    drag: function(v) {
        document.getElementById('result-area').innerHTML = v + '%';
    }
});
```

Creating custom `min` and `max` value in range slider as pixels:

``` .javascript
var min = 2, max = 40;

function pixelToPercent(pixel) {
    return ((pixel - min) / (max - min)) * 100;
}

function percentToPixel(percent) {
    return ((percent / 100) * (max - min)) + min;
}

rangeSlider(document.getElementById('range-slider-1'), {
    value: pixelToPercent(10),
    drag: function(v) {
        document.getElementById('result-area').innerHTML = Math.round(percentToPixel(v));
    }
});
```

Playground
----------

 * http://jsbin.com/qebisaso/1/edit
