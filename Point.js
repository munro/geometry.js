/* vim: ts=4 sw=4 sts=4 et:
 *
 * Copyright 2011 Ryan Munro.
 * http://github.com/munro/
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/*jslint white: true, devel: false, onevar: true, browser: true, undef: false,
  nomen: false, regexp: true, plusplus: true, continue: true, bitwise: true,
  unparam: true, newcap: true, maxerr: 50, indent: 4 */
define(function (require) {
    var Rect = require('./Rect'), Point;
    
    function pointDecorator(func) {
        return function (point) {
            if (typeof point === 'number') {
                return func.call(this, Array.prototype.slice.call(arguments,
                        0));
            } else {
                return func.call(this, point);
            }
        };
    }

    Point = pointDecorator(function (point) {
        this.point = point;
    });

    Point.prototype.position = pointDecorator(function (point) {
        if (point) {
            this.point = point;
            return this;
        } else {
            return this.point;
        }
    });

    Point.prototype.translate = pointDecorator(function (point) {
        var i, dimensions = Math.min(this.point.length, point.length);
        for (i = 0; i < dimensions; i += 1) {
            this.point[i] += point[i];
        }
        return this;
    });

    Point.prototype.intersects = function (shape, checked) {
        var i, dimensions;
        
        if (typeof shape === 'object') {
            dimensions = Math.min(this.point.length, shape.length ||
                    shape.point.length);
        }

        if (shape instanceof Point) {
            shape = shape.point;
        }

        if (shape instanceof Array) {
            for (i = 0; i < dimensions; i += 1) {
                if (this.point[i] !== shape[i]) {
                    return false;
                }
            }
            return true;
        } else if (shape instanceof Rect) {
            for (i = 0; i < dimensions; i += 1) {
                if (this.point[i] < shape.point[i] || this.point[i] >
                        (shape.size[i] + shape.point[i])) {
                    return false;
                }
            }
            return true;
        } else if (!checked && typeof shape.intersects === 'function') {
            try {
                return shape.intersects(this, true);
            } catch (e) {
            }
        }
        throw new Error('geometry.Point does not know how to intersect with shape: ' +
                shape);
    };
    
    return Point;
});
