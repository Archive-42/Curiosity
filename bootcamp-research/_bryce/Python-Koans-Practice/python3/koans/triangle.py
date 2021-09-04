#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Triangle Project Code.

# Triangle analyzes the lengths of the sides of a triangle
# (represented by a, b and c) and returns the type of triangle.
#
# It returns:
#   'equilateral'  if all sides are equal
#   'isosceles'    if exactly 2 sides are equal
#   'scalene'      if no sides are equal
#
# The tests for this method can be found in
#   about_triangle_project.py
# and
#   about_triangle_project_2.py
#


def triangle(a, b, c):
    if not all(side > 0 for side in [a, b, c]):
        raise TriangleError(AttributeError(
            'All sides should be greater than 0'))
    if a + b + c <= 2 * max(a, b, c):
        raise TriangleError(AttributeError(
            'The sum of any two sides should be greater than the third one'))

    if len({a, b, c}) == 1:
        return 'equilateral'
    elif len({a, b, c}) == 2:
        return 'isosceles'
    else:
        return 'scalene'

# Error class used in part 2.  No need to change this code.


class TriangleError(Exception):
    pass
