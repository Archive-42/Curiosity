import React from 'react';
import TodoListItem from './todo_list_item';
// import {receiveTodo, removeTodo} from '../../actions/todo_actions';
import TodoListForm from './todo_form_container';

class Todo extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const todoLis = this.props.todos.map((todo, i) => {
      return <TodoListItem todo={todo} key={i} removeTodo={this.props.removeTodo} />;
    });
    return (
      <div>
        <ul>
          {todoLis}
        </ul>
        <TodoListForm receiveTodo={this.props.receiveTodo} createTodo={this.props.createTodo} errors={this.props.errors} clearErrors={this.props.clearErrors}/>
      </div>
    )
  }
  
  componentDidMount() {
    this.props.fetchTodos();
  }
}


export default Todo;