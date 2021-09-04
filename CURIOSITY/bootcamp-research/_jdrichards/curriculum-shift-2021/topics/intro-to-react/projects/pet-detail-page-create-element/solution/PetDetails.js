import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

import OwnersList from './OwnersList.js';
import PetDetailList from './PetDetailList.js';

const PetDetails = props => React.createElement(
  'div',
  null,
  React.createElement(PetDetailList, props.pet),
  React.createElement(OwnersList, { owners: props.pet.Owners }),
);

PetDetails.defaultProps = {
  pet: {},
};

export default PetDetails;
