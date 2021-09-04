import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../store/products';

const ProductDetail = ({ id, image, name, price }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <div className='product-detail'>
      <img src={image} alt={name} />
      <span className='product-title'>{name}</span>
      <span>${price}</span>
      <div className='button-row'>
        <button onClick={() => handleDelete(id)} className='delete-button'>
          Delete
        </button>
        <button className='update-button'>Update</button>
      </div>
    </div>
  );
};
export default ProductDetail;
