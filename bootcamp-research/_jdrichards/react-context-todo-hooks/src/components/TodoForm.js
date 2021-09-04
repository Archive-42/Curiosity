import { useState, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

function TodoForm(props) {
  const [inputValue, setInputValue] = useState('');
  const { createTask } = useContext(TodoContext);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // this.setState({ inputValue: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Add a todo'
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  );
}
export default TodoForm;
