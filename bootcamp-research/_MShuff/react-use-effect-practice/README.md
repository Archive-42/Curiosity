# React `useEffect` Practice Project

This starter includes the foundation a simple project with controls to configure
display of a turkey drawing for kids.

It includes function components for image (_src/components/PictureDisplay_) and
message (_src/components/Message_), including appropriate props (`size` string, 
`featherCount` number, and `featherColors` array).

The project also includes user controls (in _src/App.js_) connected using 
`onClick` and `onChange` events to state variables (set up with the `useState` 
hook).

The goal of this project is to practice different use cases for `useEffect` in 
*React* to improve your understanding and build confidence in your skills.

* Debugging prop changes
* Debugging state changes
* Catching state changes to generate another state value programmatically
* Catching prop changes to generate a state value programmatically

## Phase 0: Orientation

Look through the existing JavaScript and CSS files to familiarize yourself with
the project.

Run `npm install` and `npm start` to see what is available. At this time, it is 
okay to receive warnings about variables that are "assigned a value but never 
used". Through the steps outlined in this project, you will correct these 
problems. 

Go ahead and click on the controls to see what `console.log` messages have been 
included. Also, look for warnings or errors appearing in the *JavaScript 
Console* (found in the *Developer Tools* you can open in your browser).

As you probably noticed, there are two function components in this project:

* _src/components/PictureDisplay_
* _src/components/Message_

Each one has at least one prop passed to it from _src/App.js_, and a 
`console.log` which writes out the component's name and each of its props.

## Phase 1: Improve debugging

Problem: Every click in the UI - even on unrelated elements - causes the 
`console.log` in each of the two components to display. This can make it 
difficult to debug because changed values get lost in the middle of values that
did not change.

Solution: Wrap each `console.log` inside a `useEffect` hook, so it is only 
executed when the prop actually changes.

### Step-by-step - `Message` component

The easiest place to begin is with the `Message` component.

* Run the application (`npm install`, if you've not done so already, then 
`npm start`).
* Look at the console in the browser (3-dot button on the right side of the 
toolbar -> More Tools -> Developer Tools).
* Click in the page to modify the feather count, feather color(s) and/or 
display size. Notice that TWO outputs appear each time - one for 
`PictureDisplay` and one for `Message`. For example:

```plaintext
PictureDisplay m 0 []
Message m
```

*There is one time when no output happens on clicking. Did you find it?*

(It's the click on the "Small" button after refreshing.)

*Do you know why this behavior is occurring?*

(First, the default value for the `size` is "s". Then clicking the "Small" 
button tries to set the value to `'s'`. That means the state doesn't actually 
change. Therefore, *React* does NOT rerender the component, or its 
subcomponents with the `console.log`.)

* Open _src/components/Message.js_.
* Import `useEffect` from the `react` package at the top of the file.

```javascript
import { useEffect } from 'react';
```

* Immediately before the `console.log`, declare the `useEffect` hook with the 
handler function (e.g. `function () {` or `() => {`). After the `console.log`, 
end the function (`}`), close the hook (`)`), and end the statement (`;`).

* Verify your code looks something like this.

```javascript
    useEffect(() => {
        console.log('Message', size);
    });
```

* Refresh the browser and click a bunch of UI elements again. The `Message` log 
is still showing each time! Can you guess why?

> HINT: The `useEffect` hook takes a second parameter which is a list of 
> "dependencies", or `deps`, which are variables the function uses (a.k.a 
> "depends on").

* Before the closing parenthesis (`)`), add a comma then declare an array with 
only variable the `console.log outputs` (`size`). Now, your code should look 
like this (starting at the top of the file).

```javascript
import { useEffect } from 'react';

function Message({ size }) {
    useEffect(() => {
        console.log('Message', size);
    }, [size]);

    return (
    // NOTE: The rest has been omitted since it is unchanged
```

* Refresh and click in the UI again. Now, the `Message` log will only display
when you modify the `size`. Awesome!

### Step-by-step - `PictureDisplay` component

Begin by following the same pattern.

* Open _src/components/PictureDisplay.js_.
* Import `useEffect` from the `react` package.
* Wrap a `useEffect` hook around the `console.log`, including the three 
dependencies (`deps`). Your code should look something like this:

```javascript
    useEffect(() => {
        console.log('PictureDisplay', size, featherCount, featherColors);
    }, [size, featherCount, featherColors]);
```

* Test using your browser to ensure it's still working.
* Notice that the color checkboxes no longer cause any log statement to display.
This is because their `onChange` events modify state variables that are **NOT** 
passed to any of the components as props. Don't worry, you'll be addressing this
shortcoming soon. For now, stay focused on the debugging, so you can check that 
off the to-do list.

There is an alternative approach to debugging props with 
`useEffect`. Specifically, you can declare a separate instance of `useEffect` 
for each prop individually.

* Comment out the `useEffect` you just made (all 3 lines).
* Write a new `useEffect` with console.log for the `size` prop.
* Write another `useEffect` for the `featherCount` prop.
* Then, write a third `useEffect` for the `featherColors` prop.

```javascript
function PictureDisplay ({ size, featherCount, featherColors }) {
    // useEffect(() => {
    //     console.log('PictureDisplay', size, featherCount, featherColors);
    // }, [size, featherCount, featherColors]);
    
    useEffect(() => {
        console.log('PictureDisplay size', size);
    }, [size]);

    useEffect(() => {
        console.log('PictureDisplay feather count', featherCount);
    }, [featherCount]);

    useEffect(() => {
        console.log('PictureDisplay feather colors', featherColors);
    }, [featherColors]);

    return (
    // NOTE: The rest has been omitted since it is unchanged
```

Now, you'll see the following in the browser's console as you interact with the 
settings.


Click one of the size buttons ("Medium", for example).

```plaintext
PictureDisplay size m
Message m
```

Click the up arrow on the feather count.

```plaintext
PictureDisplay feather count 1
```

Check or uncheck any of the colors. Nothing happens.

## Phase 2: Finishing the color checkboxes

Now, it's time to dig in and get those color checkboxes working. This will 
involve defining a `useEffect` hook which responds to one or more state 
variables to update another state variable.

### Debugging state variable changes

* Open _src/App.js_.
* Notice the state variables (declared with the `useState` hook).
* After these (and before the `return`), declare one `useEffect` hook which 
writes out a `console.log` for each of boolean state variables associated with
the color checkboxes.
* Remember to also add `useEffect` to the import for `react` elements.

> HINT: You will learn more from this practice if you try it on your own before
> looking at the solution that follows.

Seriously, try it now. Then, compare to the following possible solution.

```javascript
  useEffect(() => {
    console.log('Color Change :: red?', isRed);
    console.log('Color Change :: orange?', isOrange);
    console.log('Color Change :: brown?', isBrown);
    console.log('Color Change :: light brown?', isLightBrown);
    console.log('Color Change :: yellow?', isYellow);
  }, [isRed, isOrange, isBrown, isLightBrown, isYellow]);
```

* Run the application in the browser and verify the logs are working.
** In this approach, every checkbox change will display all fine lines, and 
that's okay because you're about to do something with them.
** Alternatively, you may have made five separate `useEffect` declarations, so 
that only one `console.log` shows at a time. This is also fine. However, now
you'll need to declare another `useEffect` with all 5 booleans for its
dependencies, so you can take the next step.

### Calculating new state from state changes

In the function the `useEffect` hook which depends on all 5 state variables
for the colors, you need to now calculate an array of colors which reflects 
which boxes are checked. There's no need to get fancy here unless you really feel 
like it. The simplest approach is as follows.

* Declare a new constant which is an empty array.
* Put in a conditional (`if` statement) to `push` the color word "red" onto
that array whenever `isRed` is `true`.
* Repeat for each of the colors.
** IMPORTANT: The existing code inside `PictureDisplay` depends on the color 
word for light brown to be spelled with a hyphen (`'light-brown'`).
* Assign the result to the `featherColors` state variable.
* When you're ready, you can comment out the `console.log` statement(s) you used
for exploring/debugging the state variable changes.

Again, you can choose to challenge yourself to follow these instructions without
looking at the solution that follows.

> Remember: This is not the only possible solution. If your code works, then
> it's good code!

```javascript
  useEffect(() => {
    // console.log('Color Change :: red?', isRed);
    // console.log('Color Change :: orange?', isOrange);
    // console.log('Color Change :: brown?', isBrown);
    // console.log('Color Change :: light brown?', isLightBrown);
    // console.log('Color Change :: yellow?', isYellow);

    const colors = [];
    if (isRed) colors.push('red');
    if (isOrange) colors.push('orange');
    if (isBrown) colors.push('brown');
    if (isLightBrown) colors.push('light-brown');
    if (isYellow) colors.push('yellow');
    setFeatherColors(colors);
  }, [isRed, isOrange, isBrown, isLightBrown, isYellow]);
```

Because the `featherCount` variable was previously set as the value for the 
corresponding prop on the `PictureDisplay`, you'll now see the `console.log` you 
added earlier when you test in the browser. Also, if you spelled all the color
names correctly, you'll see the feathers in those colors.

Excellent work!

## Phase 3: Adjusting picture and message size

The last use case in this project for `useEffect` is to calculate the value of 
a state variable based on a prop.

If you look carefully, you'll notice that `size` is one of the props on the
`PictureDisplay` components. As you look closer, you'll see that the size appears
only in the `console.log` (and corresponding `useEffect` dependencies).

Upon further digging, you'll find 4 classes in the CSS (_src/index.css) with 
appropriate widths for 4 different sizes (`small`, `medium`, `large`, `xlarge`).
That means it should be possible to write some code to calculate those values
from the "s", "m", "l" and "xl" values used by the `size` prop.

### Calculating Image Size

* Open _src/components/PictureDisplay.js_
* In the `useEffect` the depends on the `size` prop, add several lines of code
to calculate the class name to use for each size.

> Hint: The `switch...case` pattern is useful in this situation, but it is not
> the only possibility.

If you can, write some code and test it using `console.log` before looking at 
the solution below.

```javascript
    useEffect(() => {
        console.log('PictureDisplay size', size);
        let cname = '';
        switch (size) {
            case 'm':
                cname = 'medium';
                break;
            case 'l':
                cname = 'large';
                break;
            case 'xl':
                cname = 'xlarge';
                break;
            default:
                cname = 'small';
                break;
        }
        console.log(cname);
    }, [size]);
```

Now, you need to add a state variable and use it in the appropriate place.

* Add `useState` to the import from `react` at the top of the file.

```javascript
import { useEffect, useState } from 'react';
```

* Declare a state variable for the class name to use for the size. Place it at 
the start of the class definition (after `function PictureDisplay...`, shown 
below, and before every `useEffect`).

```javascript
function PictureDisplay ({ size, featherCount, featherColors }) {
    const [sizeClass, setSizeClass] = useState('');
    
    // useEffect(() => {
    // The rest is omitted because it hasn't changed (yet)
```

* Finally, replace your call to the `console.log` at the end of the new 
`useEffect`'s function with a call to the setter for the new state variable.

```
        // console.log(cname);
        setSizeClass(cname);
```
* Modify the `className` for the `<div>` to replace `medium` with your new
state variable. Here is one way to accomplish this.

```javascript
<div className={`image-area ${sizeClass}`}>
```

* Test in the browser and debug until the picture area changes size when 
clicking the size buttons (as long as it's a different size - remember "Small"
is the default).

In case you get stuck, here's what the class function should look like in 
_src/components/PictureDisplay.js_.

```javascript
function PictureDisplay ({ size, featherCount, featherColors }) {
  const [sizeClass, setSizeClass] = useState('');

  // useEffect(() => {
  //   console.log('PictureDisplay', size, featherCount, featherColors);
  // }, [size, featherCount, featherColors]);

  useEffect(() => {
    console.log('PictureDisplay size', size);
    let cname = '';
    switch (size) {
      case 'm':
        cname = 'medium';
        break;
      case 'l':
        cname = 'large';
        break;
      case 'xl':
        cname = 'xlarge';
        break;
      default:
        cname = 'small';
        break;
    }
    setSizeClass(cname);
  }, [size]);

  useEffect(() => {
    console.log('PictureDisplay feather count', featherCount);
  }, [featherCount]);

  useEffect(() => {
    console.log('PictureDisplay feather colors', featherColors);
  }, [featherColors]);

  // TODO: Wrap in useEffect
  const colors = [];
  if (!featherColors || featherColors.length === 0) featherColors = [''];
  for (let i=0; i<featherCount; i++) {
    colors.push(featherColors[i % featherColors.length]);
  }

  return (
    <div className={`image-area ${sizeClass}`}>
      {colors.map((c, i) =>
        <img src={feathers[i]} className={`image-feather ${c}`} alt="" />
      )}

      <img src={turkey} className="image-turkey" alt="turkey" />
    </div>
  );
}
```

### Calculating Message Area Size

Now, you can repeat the calculation inside `useEffect` and the state change
in the `Message` component (that is, _src/components/Message.js_).

> Hint: Copy and paste will speed up this work!

(The only difference is the `<div>` tag which uses `message` as its base css
class name instead of `image-area`.)

## Phase 4: User-friendly messaging

Finally, you can complete the minimum functionality for this application by 
setting the message below the picture based on the number of feathers selected.

The current message only works well when there are no feathers (meaning the 
`count` is zero).

* Open _App.js_.
* Pass the `size` prop into the `Message` component.

### Solution (if you need it)

Here in one possible solution. Yours will likely vary somewhat; and, that's a 
good thing. :)

Modify in _src/App.js_.

```javascript
<Message size={size} featherCount={featherCount} />
```

Add to _src/components/Message.js_.

```javascript
    const [message, setMessage] = useState('');

    useEffect(() =>{
        if (featherCount <= 0)
            setMessage('Oh my! Your bird is naked!');
        else if (featherCount >= 10) {
            setMessage('Full turkey!');
        } else {
            setMessage('Coming along...');
        }
    }, [featherCount])
```

Modify in _src/components/Message.js_.

```javascript
    return (
        <div className={`message ${sizeClass}`}>
            {message}
        </div>
    );
```

## Bonus Phase A: Additional practice with `useEffect`

Write code for another `useEffect` to address the "TODO" comment in 
_src/components/PictureDisplay.js_.

```javascript
// TODO: Wrap in useEffect
```

> Hint: The guts of the effect handler function are already done. You need only
> employ the `useEffect` before, and set an appropriate `deps` array after (or
> copy/paste the code into the appropriate debugging `useEffect` you coded 
> earlier).

## Bonus Phase B: Refactoring

Sometimes, you might change your mind on the best implementation while you're 
working. It is a best practice to get SOMETHING working first, then *refactor* 
your code to make improvements.

For example, perhaps you'd like to calculate the class name to use for the 
`size` in only one place. You probably remember copying and pasting (or 
retyping) the calculation for the `className` to use for the size of the 
`PictureDisplay` and `Message` components. Now is your chance to change this 
decision.

* Copy the `sizeClass` state variable and corresponding `useEffect` with the 
calculation to _App.js_.
* Switch the prop passed to both _Message_ and _PictureDisplay_ from 
`size` to `sizeClass`.
** In _src/App.js_
** In _src/components/Message.js_
** In _src/components/PictureDisplay.js_
* Remove the `useState` and `useEffect` definitions that are no longer needed
** In _src/components/Message.js_
** In _src/components/PictureDisplay.js_
* If possible, remove any imports that are no longer in use. (There might not be
any, but it's good practice to check anyways!)

## Bonus Phase C: Additional practice with `React` props, state, layouts, etc.

There are a number of other enhancements you can make to this application to get
additional practice the with various aspects you've learned in *React*. Below, 
you'll find a few ideas to get you started. The steps for each are left for you
to discover.

* *Trivial*: Set default `size` to medium.
* *Easy*: Size button reflecting selection (Hint: Use the `disabled` prop).
* *Moderate*: Prevent the count text entry < 0 or > 10 (Hint: Refactor the input 
to a controlled form element by assigning its `value`).
* *Challenging*: Improve the layout for settings elements. What to do is up to 
you! (Hint: It will probably involve a mix of JSX and CSS.)
