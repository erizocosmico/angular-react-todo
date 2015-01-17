(function (window, React) {
    'use strict';

    window.TodoForm = React.createClass({
        getInitialState: function () {
            return {input: ''};
        },
        changed: function (e) {
            this.setState({input: e.target.value});
        },
        addTask: function (e) {
            this.props.scope.addTask(this.state.input);
            this.setState({input: ''}, function () {
                this.refs.taskInput.getDOMNode().focus();
            });

            e.preventDefault();
        },
        render: function () {
            return (
                <form id='task-form' onSubmit={this.addTask}>
                    <input type='text' ref='taskInput' value={this.state.input} onChange={this.changed} placeholder='Add a new task...' />
                </form>
            );
        }
    });

    window.TodoListItem = React.createClass({
        getInitialState: function () {
            return {input: this.props.task.title};
        },
        changed: function (e) {
            this.setState({input: e.target.value});
            this.props.scope.updateTitle(this.props.index, e.target.value);
        },
        remove: function () {
            this.props.scope.removeTask(this.props.index);
        },
        render: function () {
            return (
                <li>
                    <span className='title'>
                        <input type='text' value={this.state.input} onChange={this.changed} />
                    </span>
                    <span className='time'>({this.props.task.added.toString()})</span>
                    <span className='actions'>
                        <button onClick={this.remove}>Completed</button>
                    </span>
                </li>
            );
        }
    });

    window.TodoList = React.createClass({
        render: function () {
            var tasks = this.props.tasks.map(function (task, i) {
                return (
                    <TodoListItem key={task.title + task.added} task={task} index={i} scope={this.props.scope} />
                );
            }.bind(this));

            return (
                <ul id='task-list'>{tasks}</ul>
            );
        }
    });

}(window, React));