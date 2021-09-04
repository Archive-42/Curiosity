import { connect } from 'react-redux';
import TodoList from './todo_list'
import {receiveTodo, removeTodo, fetchTodos, createTodo, clearErrors} from '../../actions/todo_actions'
import allTodos from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  todos: allTodos(state),
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  receiveTodo: (todo) => dispatch(receiveTodo(todo)),
  removeTodo: (todo) => dispatch(removeTodo(todo)),
  fetchTodos: () => dispatch(fetchTodos()),
  createTodo: (todo) => dispatch(createTodo(todo)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);