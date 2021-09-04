# CSS Properties

- For shorthand properties:
  - 4 arguments tend to go clockwise: top, right, bottom, left
  - 3 arguments tend to go: top, left & right, bottom
  - 2 arguments tend to go: top & bottom, left & right
  - 1 argument sets all sides

## A

- **[align-content](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content)**: Sets the distribution of space between and around content items along a flexbox's cross-axis or a grid's block axis

## B

- **[background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color)**: Background color of element
- **[border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)**: Shorthand that sets *border-width*, *border-style*, and *border-color*
- **[border-width](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width)**: Shorthand that sets *border-top-width*, *border-right-width*, *border-bottom-width*, and *border-left-width*
- **[border-style](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style)**: Shorthand that sets *border-top-style*, *border-right-style*, *border-bottom-style*, and *border-left-style*
- **[border-color](https://developer.mozilla.org/en-US/docs/Web/CSS/border-color)**: Shorthand that sets *border-top-color*, *border-right-color*, *border-bottom-color*, and *border-left-color*
- **[box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)**: Sets how the total width and height of an element is calculated
  - `border-box` is much more preferrable and easy to visualize than `content-box`

## C

- **[color](https://developer.mozilla.org/en-US/docs/Web/CSS/color)**: Sets foreground color of element's text and text decorations

## W

- **[width](https://developer.mozilla.org/en-US/docs/Web/CSS/width)**: Sets an element's width. By default, it sets the width of the content area, but if [box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) is set to border-box, it sets the width of the [border area](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model#border-area).
  - Can NOT be applied to *inline elements*, if you wish to, you can set the display property to *inline-block*
  - [min-width](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width) and [max-width](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width) override width
- **[height](https://developer.mozilla.org/en-US/docs/Web/CSS/height)**: Sets the height of an element
  - Can NOT be applied to *inline elements*, if you wish to, you can set the display property to *inline-block*
  - *min-height* and *max-height* override height