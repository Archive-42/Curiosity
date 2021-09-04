import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import { NavLink } from 'react-router-dom';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <NavLink to='#' onClick={() => setShowModal(true)}>
        Log In
      </NavLink>
      {/* <button onClick={() => setShowModal(true)}>Log In</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
