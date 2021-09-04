# React Multiple Choice Practice Quiz, Week 14

```js
function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const onSubmit = (e) => {
        const contactInfo = {
            name,
            email,
            phone
        };

        console.log(contactInfo);
        setName('');
        setEmail('');
        setPhone('');
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="name" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="phone" value={phone} onChange={e => setPhone(e.target.value)} />
            <button type="submit">Submit<button>
        </form>
    );
}

```

<quiz>
    <question>
        <p>The above submit component causes the page to reload upon submission. However, we want to prevent this behavior. How would you fix this?</p>
        <answer>Add an `onClick` attribute to the button</answer>
        <answer correct>Add `e.preventDefault()`</answer>
        <answer>Pass in props into the component</answer>
        <answer>Add a `useEffect` hook.</answer>
        <explanation>The `e.preventDefault()` prevents the event's default action of reloading the page.</explanation>
    </question>
</quiz>

<quiz>
    <question>
        <p>What allows you to pass data through the component tree without having to manually thread props?</p>
        <answer>`Switch` component</answer>
        <answer>`useState` hook</answer>
        <answer>`BrowserRouter` component</answer>
        <answer correct>React Context</answer>
        <explanation>Context gives you a way to pass data through the component tree without having to manually thread props.</explanation>
    </question>
</quiz>

<quiz>
    <question>
        <p>What causes the real DOM to change in React?</p>
        <answer correct>Changes in React’s virtual DOM.</answer>
        <answer>Controlled inputs.</answer>
        <answer>Reloading the real DOM.</answer>
        <answer>When you switch routes.</answer>
        <explanation>Whenever the virtual DOM changes it converts the real DOM.</explanation>
    </question>
</quiz>

<quiz>
    <question>
        <p>What converts virtual DOM elements into real DOM elements?</p>
        <answer>`create-react-app`</answer>
        <answer correct>The `ReactDOM.render` method.</answer>
        <answer>`document.querySelector`</answer>
        <answer>`document.getElementById`</answer>
        <explanation>`ReactDOM.render` will convert the virtual DOM node into a real DOM and nest it under the given real DOM node.</explanation>
    </question>
</quiz>

<quiz>
    <question>
        <p>What does React use to create the virtual DOM?</p>
        <answer correct>JSX elements</answer>
        <answer>HTML</answer>
        <answer>Javascript</answer>
        <answer>`localStorage`</answer>
        <explanation>React takes your JSX elements and builds its virtual DOM from them and that React takes that virtual DOM and inserts it into the living HTML document.</explanation>
    </question>
</quiz>

<quiz>
    <question>
        <p>In a form, what type of component is created when you have both an `onChange` event listener and a `value` attribute?</p>
        <answer>An `onSubmit` component</answer>
        <answer>An event listener</answer>
        <answer correct>A controlled component</answer>
        <answer>An `input` HTML element</answer>
        <explanation>Inputs in a controlled component are called controlled inputs.</explanation>
    </question>
</quiz>

<quiz>
  <question multiple>
    <p>What are the ways to create links with relative paths to routes in your application?</p>
    <answer>`Redirect` component</answer>
    <answer correct>`Link` component</answer>
    <answer correct>`NavLink` component</answer>
    <answer>`a` element</answer>
    <answer>`useHistory` hook</answer>
    <explanation>`Link` or `NavLink` creates links with relative paths to routes in your application (like "/users/1").</explanation>
  </question>
</quiz>

<quiz>
  <question multiple>
    <p>What are the ways to create links with absolute paths to routes outside your application?</p>
    <answer>`Redirect` component</answer>
    <answer>`Link` component</answer>
    <answer>`NavLink` component</answer>
    <answer correct>`a` element</answer>
    <answer>`useHistory` hook</answer>
    <explanation>To create a link with absolute paths to routes outside your application, use the `a` element with an `href` attribute.</explanation>
  </question>
</quiz>

<quiz>
    <question>
        <p>In the rendering cycle when does `useEffect` run?</p>
        <answer correct>After the first render and any time an item in its dependency array changes on a rerender.</answer>
        <answer>After the first render only.</answer>
        <answer>Never.</answer>
        <answer>After the virtual DOM reloads.</answer>
        <explanation>By default, useEffect runs both after the first render and any time an item in its dependency array changes on a rerender.</explanation>
    </question>
</quiz>