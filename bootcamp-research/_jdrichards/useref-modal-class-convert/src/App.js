import React, { useState } from 'react';
import Modal from './modal2.js';

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(6);

  const price = 20;
  const onClose = () => setModalOpen(false);
  const onSubmit = value => setQuantity(value);
  return (
    <div className='app'>
      <h1>Checkout</h1>
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Unit price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quantity}</td>
            <td>${price}</td>
            <td>${price * quantity}</td>
            <td>
              <button
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setModalOpen(!isModalOpen);
                }}
              >
                Edit quantity
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {isModalOpen && (
        <Modal onSubmit={onSubmit} initialValue={quantity} onClose={onClose} />
      )}
    </div>
  );
}
