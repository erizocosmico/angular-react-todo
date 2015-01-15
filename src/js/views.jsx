(function (window, React) {
    'use strict';

    var apply = function (self, fn) {
        self.props.scope.$apply(fn);
    };

    var updateModel = function (self, event) {
        apply(self, function () {
            self.props.scope.ngModel = event.target.value;
        });
    };

    window.TodoForm = React.createClass({
        changed: function (e) {
            updateModel(this, e);
        },
        addTask: function () {
            this.props.scope.addTask();
        },
        render: function () {
            return (
                <div>
                    <h2>Add a new task</h2>
                    <input type='text' value={this.props.scope.ngModel} onChange={this.changed} />
                    <button onClick={this.addTask}>Add</button>
                </div>
            );
        }
    });

    window.TodoListItem = React.createClass({
        render: function () {
            return (
                <li>{this.props.task.title}</li>
            );
        }
    });

    window.TodoListItem = React.createClass({
        render: function () {
            var tasks = this.props.tasks.map(function (task) {
                return (
                    <TodoListItem task={task} />
                );
            });

            return (
                <ul>{tasks}</ul>
            );
        }
    });

}(window, React));