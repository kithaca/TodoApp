var React = require('react');
var TodoStore = require('../stores/todo_store');
var TodoForm = React.createClass({

  getInitialState: function () {
    return {title: "", body: ""};
  },

  updateTitle: function (e) {
    this.setState( {title: e.target.value} );
  },

  updateBody: function (e) {
    this.setState( {body: e.target.value} );
  },

  handleSubmit: function (e) {
    e.preventDefault();

    var todo = {
      title: this.state.title,
      body: this.state.body,
      done: false
    };
    TodoStore.create({todo: todo});

    this.setState({title: "", body: ""});
  },


  render: function() {
                      return (
                        <div>
                              <form className="form" onSubmit={this.handleSubmit}>

                                <label htmlFor="">Title</label>
                                <input type="text" name="todo[title]" value={this.state.title}
                                  onChange={this.updateTitle}/>

                                <label htmlFor="">Body</label>
                                <input type="text" name="todo[body]" value={this.state.body}
                                  onChange={this.updateBody}/>

                                <input type="submit" value="Create New Todo"/>
                              </form>
                            </div>
                            );
  },
});

module.exports = TodoForm;
