var _callbacks = [],
    _todos = [];

var TodoStore = {

  changed: function () {
    _callbacks.forEach(function (callback) {
      callback();
    });
  },

  addChangedHandler: function(callback) {
    _callbacks.push(callback);
  },

  removeChangedHandler: function(callback) {
    var removeIndex = _callbacks.indexOf(callback);
    _callbacks.splice(removeIndex, 1);
  },

  all: function() {
    return _todos;
  },

  fetch: function(){
    $.get('api/todos', {}, function(todos){
      _todos = todos;
      TodoStore.changed();
    });
  },

  create: function(todo) {
    $.post('api/todos', todo, function(_todo) {
      _todos.push(_todo);
      TodoStore.changed();
    });
  },

  destroy: function(id) {
    var del = false;
    var delIdx;

    _todos.forEach(function(todo, idx) {
      if (todo.id === id) {
        del = true;
        delIdx = idx;
      }
    });
    if(del) {
      $.ajax({
        url: 'api/todos/' + id,
        type: 'DELETE',
        success: function(_todo) {
            _todos.splice(delIdx, 1);
            TodoStore.changed();
          }
      });
    }
  },

  toggleDone: function(id) {
    var patch = false;
    var patchIdx;
    var patchParams = {todo: {done: false}};

    _todos.forEach(function(todo, idx) {
      if (todo.id === id) {
        patch = true;
        patchIdx = idx;
      }
    });

    if (patch) {
      $.patch('api/todos' + id, _todos[patchIdx], function(_todo) {
        var todoToPatch = _todos[patchIdx];
        todoToPatch.done = todoToPatch.done ? false : true;
        TodoStore.changed();
      });
    }
  }
};

module.exports = TodoStore;
