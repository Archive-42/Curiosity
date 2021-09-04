import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

const OwnerLink = props => React.createElement(
  'a',
  { href: props.href },
  `${props.lastName}, ${props.firstName}`
);

export default OwnerLink;
