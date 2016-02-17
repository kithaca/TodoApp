var React = require('react');
var TodoStore = require('../stores/todo_store');
var TodoListItem = require('./todo_list_item');
var TodoForm = require('./todo_form');

var TodoList = React.createClass({

  getInitialState: function() {

    return { todos: TodoStore.all() };
  },

  todosChanged: function () {
    this.setState({todos: TodoStore.all()});
  },

  componentDidMount: function () {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function () {
    TodoStore.removeChangedHandler(this.todosChanged);
  },

  render: function() {
    var todoListItems = this.state.todos.map(function(todo, idx) {
      return <TodoListItem key={idx} item={todo}></TodoListItem>;
    });

    return <div>
      <ul>
        {todoListItems}
      </ul>
      <TodoForm></TodoForm>
    </div>;
  },
});

module.exports = TodoList;
