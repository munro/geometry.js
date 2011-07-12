/* Copyright 2011 Ryan Munro.
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
define(['./Point'], function (Point) {
    function Rect(point, size) {
        this.point = point;
        this.size = size;
    }

    Rect.prototype = Object.create(Point);

    Rect.prototype.pos = function (position) {
        if (typeof position === 'undefined') {
            return this.position;
        } else {
            this.position = position;
        }
    };
    
    Rect.prototype.size = function (size) {
        if (typeof size === 'undefined') {
            return this.size;
        } else {
            this.size = size;
        }
    };
    
    Rect.prototype.intersects = function (shape, reverse) {
        var i, j, value, found, points, dimensions;
        
        if (typeof shape === 'object') {
            dimensions = Math.min(this.point.length, shape.length ||
                    shape.point.length);
        }
        
        if (shape instanceof Array) {
            return (new Point([shape])).intersects(this);
        } else if (shape instanceof Rect) {
            points = Math.pow(2, dimensions);
            for (i = 0; i < points; i += 1) {
                found = true;
                for (j = 0; j < dimensions; j += 1) {
                    value = this.point[j];
                    if ((1 << j) & i) {
                        value += this.size[j];
                    }
                    if (value <= shape.point[j] || value >= shape.point[j] +
                            shape.size[j]) {
                        found = false;
                        break;
                    }
                }
                
                if (found) {
                    return true;
                }
            }
            if (!reverse) {
                return shape.intersects(this, true);
            } else {
                return false;
            }
        } else if (!reverse && typeof shape.intersects === 'function') {
            return shape.intersects(this, true);
        }
        throw new Error('geometry.Rect does not know how to intersect with shape: ' +
                shape);
    };
    
    Rect.prototype.clone = function () {
        return new Rect(this.point, this.size);
    };
    
    return Rect;
});

/*jslint white: true, devel: false, onevar: true, browser: true, undef: false,
  nomen: false, regexp: true, plusplus: true, continue: true, bitwise: false,
  unparam: true, newcap: true, maxerr: 50, indent: 4 */
// vim: ts=4 sw=4 sts=4 et:
