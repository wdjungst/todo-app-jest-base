import React from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] }
  }

  componentDidMount() {
    $.ajax({
      url: '/api/todos',
      type: 'GET',
      dataType: 'JSON'
    }).done( todos => {
      this.setState({ todos });
    });
  }

  onAdd = (text) => {
    $.ajax({
      url: '/api/todos',
      type: 'POST',
      dataType: 'JSON',
      data: { text }
    }).done( todo => {
      this.setState({ todos: [todo, ...this.state.todos] });
    }).fail( err => {
      alert(err.responseJSON.errors.text.message)
    });
  }

  onDelete = (id) => {
    $.ajax({
      url: `/api/todos/${id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( () => {
      this.setState({ todos: this.state.todos.filter( t => t._id !== id ) });
    });
  }

  onUpdate = (id, completed) => {
    $.ajax({
      url: `/api/todos/${id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { completed }
    }).done( todo => {
      this.setState({ 
        todos: this.state.todos.map( t => {
          if (t._id !== id)
            return t
          return todo
        })
      });
    });
  }

  render() {
    let todos = this.state.todos.map( todo => {
      return (<Todo key={todo._id} onUpdate={this.onUpdate} onDelete={this.onDelete} {...todo} />)
    });

    return (
      <div>
        <TodoForm onAdd={this.onAdd} />
        { todos.length ? 
          <ul className="collection">
            {todos}
          </ul> :
          <p className="center">Add Some items</p>
        }
      </div>
    )
  }
}

export default TodoList;
