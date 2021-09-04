import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

import PetInformationItem from './PetInformationItem.js';

const PetDetailList = props => React.createElement(
  'div',
  null,
  React.createElement('h2', null, 'Details'),
  React.createElement(
    'dl',
    null,
    React.createElement(PetInformationItem, { name: 'Name', value: props.name }),
    React.createElement(PetInformationItem, { name: 'Age', value: props.age }),
    React.createElement(PetInformationItem, { name: 'Type', value: props.PetType.type }),
  )
);


PetDetailList.defaultProps = {
  PetType: {}
};

export default PetDetailList;
