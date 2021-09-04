# React App from the Ground Up

Notes for video idea based on starter project for practicing `useEffect` hooks 
(a.k.a. "Turkey Creator").

## CRA

Run `create-react-app` 

* with a/A's simple template
* using `npm`

```sh
npx create-react-app solution --template @appacademy/react-v17 --use-npm
```

## Frame out

Using _App.js_ & _index.css_

- framework
  - h1 = title
  - list of ideas for buttons
  - image area
  - message area
- css
  - html: font-family, background
  - h1: color
  - image: size, border, flex
  - message: center
  - sizes: multiples, moved from image
    - test by changing `className`
  - rename image -> image-area
  
## Split to components

- Message
  - copy content only
  - create function component
  - paste
  - update app.js
  - move div using copy+paste into component
- PictureDisplay (don't want confusion over using "Image")
  - Likewise

## Controls

- sizes layout
  - 1st size button with `onClick` using` console.log` (s, m, l, xl)
  - duplicate to others
  - put className on div
  - display (flex), align-items (center), gap (8px)
- `size` state variable
  - `useState`
  - replace `console.log` with `setSize`
  - add `size={size}` attribute to `<PictureDisplay />` while still in _App.js_
  - prop & console.log in `PictureDisplay`
  - view in dev tools console
  - prop & console.log in `Message`
  - test again to see 'undefined'
  - fix 'undefined' with attribute back in _App.js_
- layout for Feather Color controls
  - div & buttons with console.log
  - switch to input type `checkbox` wrapped in label
- layout for Feather Count control
  - input type `number`
  - min & max
- `featherCount` state (in _App.js_) & prop (in _components/PictureDisplay.js_)
- multiple state variables (boolean) for feather colors in _App.js_
 
## Layout enhancements

- comment out placeholder list (`cmd+/` or `ctrl+/`)
- `h3` color & padding
- left-align image area & message
- center `html` (body) with `max-width` same as largest image size

## `useEffect` project solution

See steps outlined in the README in React `useEffect` Practice 
[starter project].


[starter project]: https://github.com/appacademy-starters/react-use-effect-practice
