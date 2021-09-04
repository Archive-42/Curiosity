import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import Task from './Task';

function TodoList() {
  const { tasks, deleteTask } = useContext(TodoContext);

  return (
    <ul>
      {tasks &&
        Object.values(tasks).map((task) => (
          <Task key={task.id} task={task} deleteTask={deleteTask} />
        ))}
    </ul>
  );
}

export default TodoList;
