import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addProduct } from '../../store/products';

const CreateProduct = () => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      image,
      name,
      price
    };
    dispatch(addProduct(payload));

    history.push('/');
  };

  return (
    <div className='add-product'>
      <h3>Add A Product</h3>
      <form onSubmit={handleSubmit} className='add-product'>
        <input
          onChange={(e) => setImage(e.target.value)}
          value={image}
          placeholder='Image Url'
        />
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder='Product Name'
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          placeholder='Price'
        />
        <button className='submit-button' type='submit'>
          Add Product
        </button>
      </form>
    </div>
  );
};
export default CreateProduct;
