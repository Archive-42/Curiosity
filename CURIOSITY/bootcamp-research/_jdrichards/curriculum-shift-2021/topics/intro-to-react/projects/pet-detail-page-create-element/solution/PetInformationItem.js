import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

const PetInformationItem = props => React.createElement(
  React.Fragment,
  null,
  React.createElement('dt', null, props.name),
  React.createElement('dd', null, props.value),
);

PetInformationItem.defaultProps = {
  value: 'loading...'
};

export default PetInformationItem;
