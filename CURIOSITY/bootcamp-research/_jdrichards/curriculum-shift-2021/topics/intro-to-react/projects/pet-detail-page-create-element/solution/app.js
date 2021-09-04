import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

import Navigation from './Navigation.js';
import PetDetails from './PetDetails.js';

const PetDetailPage = props => React.createElement(
  'div',
  null,
  React.createElement(Navigation, null),
  React.createElement(PetDetails, { pet: props.pet }),
);

const target = document.querySelector('main');
const app = React.createElement(PetDetailPage, null);
ReactDOM.render(app, target);

(async () => {
  const url = 'https://polar-beach-08187.herokuapp.com/api/pets/2';
  const response = await fetch(url);
  if (response.ok) {
    const pet = await response.json();
    console.log(pet);

    const app = React.createElement(PetDetailPage, { pet });
    ReactDOM.render(app, target);
  }
})();
