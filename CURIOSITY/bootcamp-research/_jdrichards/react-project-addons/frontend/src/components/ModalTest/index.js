import { useState } from 'react';
import { Modal } from '../../context/Modal';

const ModalTest = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>ModalTest Component</h1>
      <button onClick={() => setShowModal(true)}>Show Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>This modal works too</h1>
        </Modal>
      )}
    </div>
  );
};
export default ModalTest;
