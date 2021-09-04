# HTML Tags

## Global Attributes
- Global attributes are attributes that can be used with all HTML elements
  
- `accesskey` - Specifies a shortcut key to focus on an element.  Must be a single character.  Way of accessing varies based on browser and OS. (Alt for Windows, Ctrl + Alt for Mac)
  - `<a href="https://www.mikeshuff.com" accesskey="m">My Site</a>`

- `class` - Specifies one or more class names for an element.  Used for CSS/JS.  Separate classes with a space
  - Must begin with letter A-Z/a-z and can be followed by letters(A-Za-z), digits(0-9), hyphens(-), and underscores(_)

- `contenteditable` - Specifies whether the content of an element is editable or not.  Inherits from it's parent.  `true`/`false`

- `data-*` - Used to store custom data private to the page/app.  Consists of two parts:
  - Attribute name should not contain any uppercase letters
  - Attribute value can be any string
  - `<li data-animal-type="bird">Owl</li>`
  - `<li data-animal-type="fish">Salmon</li>`

- `dir` - Specifies text direction. `ltr`, `rtl`, `auto`

- `draggable` - Specifies whether an element is draggable.  Links/Images are by default.  Often used for Drag and Drop. `true`, `false`, or `auto`

-  `hidden` - Boolean attribute indicating whether element should be hidden or not

- `id` - Specifies a unique id for HTML element and must be unique in HTML document.  Can be used to style or link to

- `lang` - Specifies language of element's content

- `spellcheck` - Specifies whether an e;ement is to have it's spelling/grammar checked or not.  You can spellcheck:
  - Text values in input fields
  - Text in `textarea` elements
  - Text in editable elements

- `style` - Used to style HTML element inline

- `tabindex` - Specifies tab order of elements, 1 is first

- `title` - Specifies extra information about an element.  Most often shown as a tooltip text on mouseover.

- `translate` - Specifies whether content should be translated or not. `yes`/`no`