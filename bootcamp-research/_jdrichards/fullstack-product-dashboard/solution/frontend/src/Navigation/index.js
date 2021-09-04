import { NavLink } from 'react-router-dom';
const Navigation = () => {
  return (
    <ul>
      <li>
        <NavLink to='/'>Products</NavLink> |
      </li>
      <li>
        <NavLink to='/create'>Create Product</NavLink>
      </li>
    </ul>
  );
};
export default Navigation;
