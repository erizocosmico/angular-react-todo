(function (window, angular, React) {
    'use strict';

    /**
     * Adds a leading zero to any number with only one digit
     * @param {Number} n Number
     * @return {String} Padded number
     */
    var pad = (n) => n > 9 ? n : '0' + n;

    /**
     * Returns the given date formated as DD/MM/YYYY HH:mm
     * @param {Date} d Date
     * @return {String}
     */
    var strDate = (d) => [d.getDate(), d.getMonth() + 1, d.getFullYear()].map(pad).join('/')
        + ' ' + [d.getHours(), d.getMinutes()].map(pad).join(':');

    var app = angular.module('app', []);

    app.service('storage', function () {
        return {
            /**
             * Stores the given value at the given key on localStorage
             * @method store
             * @param {String} k Key
             * @param {*}      v Value
             */
            store: (k, v) => localStorage.setItem(k, angular.toJson(v)),

            /**
             * Retrieves the value at the given key
             * @method get
             * @param {String} k Key
             * @return {*}
             */
            get: (k) => angular.fromJson(localStorage.getItem(k))
        };
    });

    app.controller('TodoCtrl', ['$scope', 'storage', function ($scope, storage) {
        $scope.tasks = storage.get('tasks') || [];

        /**
         * Saves the tasks array to localStorage
         */
        var save = () => storage.store('tasks', $scope.tasks);

        /**
         * Adds a new task
         * @param {String} task Title of the task
         */
        $scope.addTask = function (task) {
            if (task.trim().length > 0) {
                $scope.tasks.push({
                    title: task,
                    added: strDate(new Date())
                });
                $scope.$digest();
                save();
            }
        };

        /**
         * Removes the task at the given index
         * @param {Number} i Index where the task is in the tasks array
         */
        $scope.removeTask = function (i) {
            $scope.tasks.splice(i, 1);
            $scope.$digest();
            save();
        };

        /**
         * Update the title of a task element
         * @param {Number} i     Index where the task is in the tasks array
         * @param {String} title New title for the task
         */
        $scope.updateTitle = function (i, title) {
            $scope.tasks[i].title = title;
            $scope.$digest();
            save();
        };
    }]);

    app.directive('todoList', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                tasks: '='
            },
            link: function (scope, elem) {
                scope.$watchCollection('tasks', function (val) {
                    React.renderComponent(
                        TodoList({tasks: val, scope: scope.$parent}),
                        elem[0]
                    );
                });
            }
        }
    });

    app.directive('todoForm', function () {
        return {
            restrict: 'E',
            replace: true,
            link: function (scope, elem) {
                React.renderComponent(
                    TodoForm({scope: scope}), elem[0]
                );
            }
        };
    });

}(window, angular, React));
