import React from 'react';

class TodoListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", body: "", done: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.uniqueID = this.uniqueID.bind(this);
    this.update = this.update.bind(this);
  }

  // uniqueID() {
  //   return new Date().getTime();
  // }

  handleSubmit(e) {
    e.preventDefault();
    const {title, body, done} = this.state;
    this.props.createTodo({
      todo: {
        title,
        body,
        done,
        // id: this.uniqueID()
      }
    }).then(
      () => {
        this.setState({ title: "", body: "", done: false, id: null }),
        this.props.clearErrors
      }
    );
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };  
  }

  render() {
    const errors = this.props.errors.length === 0 ? '' : <label>{this.props.errors}</label>
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Title: 
          <input 
            type="text" 
            placeholder="buy milk"
            value={this.state.title}
            onChange={this.update("title")}
          />
        </label>
        <label>Body: 
          <textarea
            value={this.state.body}
            onChange={this.update("body")}>
          </textarea>
        </label>
        <input type="submit" value="Create Todo!"/>
        {errors}
      </form>
    )
  }
}

export default TodoListForm;