(function (window, React) {
    'use strict';

    window.TodoForm = React.createClass({
        getInitialState: function () {
            return {input: ''};
        },
        changed: function (e) {
            this.setState({input: e.target.value});
        },
        addTask: function () {
            this.props.scope.addTask(this.state.input);
            this.setState({input: ''}, function () {
                this.refs.taskInput.getDOMNode().focus();
            });
        },
        render: function () {
            return (
                <div>
                    <h2>Add a new task</h2>
                    <input type='text' ref='taskInput' value={this.state.input} onChange={this.changed} />
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

    window.TodoList = React.createClass({
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