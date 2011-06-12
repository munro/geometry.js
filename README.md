geometry.js
===========

Shapes
------

### Point

Creates a point in space.

    var geometry = require('geometry');
    var tmg = new geometry.Point([x, y, z, ...]);

### Rect

Creates a box derived from a point.

    var geometry = require('geometry');
    var foo = new geometry.Rect([x, y, z, ...], [width, height, depth, ...]); 

Methods
-------

### Intersections

    var geometry = require('geometry');
    var ryan = geometry.Rect([10, 10], [20, 20]);
    var karl = geometry.Rect([ 5,  5], [30, 30]);

    console.log(ryan.intersects(karl)); // true

License
-------

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

