import { useState, useEffect } from 'react';
import './Location.css';

const Location = () => {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    window.addEventListener('mousemove', mover);

    function mover(e) {
      if (e?.clientX) setX(e.clientX);
      if (e?.clientY) setY(e.clientY);
    }

    mover();
    return () => window.removeEventListener('mousemove', mover);
  }, [x, y]);

  const location = (
    <div class='location'>
      {' '}
      The window location is {x}, {y}
    </div>
  );

  const agreement = (
    <div class='agreement'>
      I agree to be tracked{' '}
      <input type='checkbox' onClick={() => setAgree((prev) => !prev)} />
    </div>
  );

  return (
    <div>
      {agreement}
      {agree && location}
    </div>
  );
};
export default Location;
