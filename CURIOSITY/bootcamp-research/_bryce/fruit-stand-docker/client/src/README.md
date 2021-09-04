# APP.JS

1. mapStateToProps
   - gives component access to values in our redux store
   - assigns prop "token" 
     
2. mapDispatchToProps
   - allows us to pass give components functions that dispatch actions
   - `loadToken` grabs token from localstorage
   - if token exists, dispatches `setToken` action
     * puts that token into our redux store

3. set up useEffect hook
   - invokes callback when component first mounts
   - invokes callback if `loadToken` changes


4. only render Navbar if logged in 

5. AuthRoute redirects to `/` if we're logged in 
   - otherwise, renders `SessionForm` component

6. PrivateRoute redirects to `/session` if we are not logged in



# SESSION.JS


1. mapDispatchToProps
   - gives component access to our `login` function
   - login takes in an email and password
   - sends a fetch request to our backend
   - if successful, puts the session_token into localStorage
   - dispatches our `setToken` action creator
   - which is passed along to our sessionReducer


2. keeping track of two values in this components local state
   - email value can be changed by invoking `setEmail` passing in new val


3. registered `onChange` event listeners on each input value 
   - invokes `handleChange` event handler when user types into input field


4. `handleChange` method updates local state depending on `e.target.name`


5. register `onSubmit` event listener on our form element
   - invokes `handleSubmit` event handler when user clicks submit button


6. `handleSubmit` function prevents default behavior
   - default form behavior is to refresh page upon submission
   - invokes `props.login` which is the action creator we passed in from MDP


since `/session` is an AuthRoute, as soon as user is logged in:
- we will be redirected to `/` which will render our `Home` component




# HOME.JS


1. mapping in companies prop from redux store
   - array of companies



2. mapping in `fetchCompanies` thunk action creator under prop `fetchCompanies`
   - makes an ajax request to our backend to fetch all companies
   - if successful, dispatches `receiveCompanies` action creator
   - `companyReducer` will map those fetched companies into our redux store



3. useEffect hook with callback that invokes our `fetchCompanies`
   - callback will be invoked when component first mounts
   - will be invoked if fetchCompanies changes



4. after succeessfully fetching companies from backend:
   - `companies` prop will have updated
   - will now contain an array of companies
   - component will re-render
   - companies will be mapped into list items



5. register `onClick` event listener on each company list item
   - event handler invokes callback which changes path
   - new path contains `companyId` wildcard 
   - Q: why did i turn this into a fat arrow function?
   - A: because it takes an argument, would've been invoking immed.



# COMPANYSHOW.JS


this component is rendered when path = "/companies/:companyId"


1. `mapStateToProps` maps values from redux store into component props 
   - `ownProps.match.params.companyId` gets value of wildcard from path (companyId)
   - keying into companies slice of state at this id to retrieve company


2. `mapDispatchToProps` gives componeent access to `fetchCompany`
   - thunk action creator that accepts a companyId as an argument
   - fetches that company from the database
   - dispatches `receiveCompany` action creator upon success, passing along that company
   - `companyReducer` is listening for that action
     * will map that company into state


3. useEffect hook with callback that invokes our `fetchCompany` prop
   - callback will be invoked when component first mounts
   - will be invoked if fetchCompany or companyId prop changes


4. Renders an `ItemSection` component


# ITEMSECTION.JS


1. `mapStateToProps` maps values from redux store into component props 
   - `ownProps.match.params.companyId` gets value of wildcard from path (companyId)
   - keying into companies slice of state at this id to retrieve company
   - grabbing array of items from store


2. `mapDispatchToProps` gives componeent access to `fetchItems`
   - thunk action creator that accepts a companyId and itemType as an argument
   - fetches the items for specified company and type from the database
   - dispatches `receiveItems` action creator upon success, passing along the items
   - `itemReducer` is listening for that action
     * will map that items into state


3. keeping track of `currentTab` in state
   - initial value set to "Fruit"


4. effect hook with callback that invokes our `fetchItems` prop
   - accepts two arguments, companyId & currentTab (representing item type)
   - callback will be invoked when component first mounts
   - will be invoked if currentTab, fetchItems, or companyId changes
   - important:
     * when we change tabs, component doesn't unmount 
     * must tell this effect to re-fetch items when currentTab changes


5. register onClick event listeners for each button
   - updates tab slice of state


renders `ItemList` component and `ItemForm` component


# ITEMFORM.JS

1. passing in four props via parent component and mapDispatchToProps
   - mdp: passing in `createItem` thunk action creator
     * accepts an item and companyId as arguments
     * makes ajax request to create item 
     * dispatches `receiveItem` action creator upon success
     * maps newly created object into store
   - parent component (`itemSection`) passing 3 props:
     * companyId
     * updateTab: function that updates `itemSection`s currentTab slice of state
     * currentTab: value of `itemSection`s current tab slice of state


2. register `onSubmit` event listener to our form
   - invokes `handleSubmit` event handler upon submission


3. `handleSubmit` invoked upon form submission
   - creates a new item based on user input tracked in local state
   - invokes `createItem` prop which sends of our ajax request
   - conditional logic:
     * if the type of item they created is not equal to the current tab
     * invokes `updateTab` property
     * updates `itemSection` components current tab slice of state
     