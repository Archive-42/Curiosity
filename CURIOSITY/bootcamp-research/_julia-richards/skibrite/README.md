# skibrite

Skibrite is an app that is inspired by eventbrite. It allows users to find and register for ski competetion and training events.

A live version of the application can be found [here](https://skibrite.herokuapp.com/). Please keep in mind that it is hosted on a free-tier so it might take a few seconds to wake up!

This app is built using an Express JS backend Postgres database via the handy Sequelize ORM. For the frontend I chose to use React w/ Redux for state manangement and Vanilla CSS.

## Features

This app was bootstraped in 1-week as part of App Academy's full stack program. A general feature list can be see [here](https://github.com/julia-richards/solo-react-project/wiki/Feature-List)

### only fetching data as needed via conditional redux-thunk

As shown in the ticket store [here](https://github.com/julia-richards/solo-react-project/blob/main/frontend/src/store/tickets.js#L47-L69) and below the tickets are only fetched as needed. This makes for a simple useEffect in the ticket component as needed (see [here](https://github.com/julia-richards/solo-react-project/blob/main/frontend/src/components/UserTickets/index.js#L11-L15) and below). I use this fetchIfNeeded pattern, which is articulated as a recipe in the [redux docs](https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/async?file=/src/actions/index.js), elsewhere in the app for categories and events as well. The benefits can be seen while going back and forth between an event-specific show page and the tickets list page (notice that `Loading...` is only shown the first time!).

```js
// the 'complicated' logic in the store for reuse
// frontend/src/store/tickets.js#L47-L69

const shouldFetchTickets = (state) => {
  const tickets = state.tickets;
  const user = state.session.user;
  if (!user) {
    return false;
  }
  if (!tickets) {
    return true;
  }
  if (tickets.isFetching) {
    return false;
  }
  // if lastUpdated is set has fetched
  if (!tickets.lastUpdated) {
    return true;
  }
  return tickets.needsReset;
};

export const fetchTicketsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchTickets(getState())) {
    return dispatch(fetchTickets());
  }
};

// a simple hook inside a presentational(ish) functional component to 'just give me data'
// frontend/src/components/UserTickets/index.js#L11-L15

const ticketState = useSelector((state) => state.tickets);

useEffect(() => {
  dispatch(ticketActions.fetchTicketsIfNeeded());
}, [dispatch]);

```

### package-like codebase, single deployment

As previously stated, this app uses a Express + Sequelize backend with a create-react-app (CRA) frontend. This is easily segmented in the app's folder structure inside of separate backend and frontend directories. For development, I make use of the proxy feature of CRA, which helps avoid the need to robustly handle CORS requests. In production, I have configured it so the backend serves up the static, pre-built create-react-app's single page app build for it's main route ([see here](https://github.com/julia-richards/solo-react-project/blob/main/backend/routes/index.js#L14-L34)). The rest of the functionality (account creation, login, events, tickets) happens behind the `/api` namespace. This is nice as it allows for only a single deployment to heroku (rather than one for the backend and one for the frontend). This still allows for flexiblity if that was to be something that would be desirable in the future as the app grows.

### using SkiReg.com as data-source

I wrote a one-time script to pull data from the [SkiReg.com Event Search API](https://www.skireg.com/api/EventSearchDoc.aspx). [This script](https://github.com/julia-richards/solo-react-project/blob/main/backend%2Fscripts%2FdataFetch.js) is run from the command line and transforms the data from "their shape" into "my shape" which is then feed into the Sequelize seed files as shown here. It was tricky to figure out syntax and properly normalize it into a relational database, but I think was time well spent to give the app a more "real world" feel VS using a data seed tool like Faker. Future work could pull this via a chron (think 1x per day or 1x per hour) to ensure the data is continuously up to date!

### brand colors in one place via CSS custom properties (variables)

As apps like these grows keeping consistent styling often becomes a tricky balancing act. Having `#fff` (white) in several places is one thing but a subject-to-change-while-prototyping branded color palete is another. To keep sanity to a max, I made use of CSS custom properties (variables), which are supported by (most browsers other than IE)[https://caniuse.com/css-variables] so they are all in (one shared stylesheet)[https://github.com/julia-richards/solo-react-project/blob/main/frontend%2Fsrc%2Findex.css#L3-L9]. These are then easily referenced as needed like this: `background-color: var(--light-blue)`. Doing this has main benefit of making future changes (or adding darkmode) quite a bit easier in the future (change the variable in one place not for every colored thing).
