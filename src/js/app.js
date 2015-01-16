(function (window, angular) {
    'use strict';

    var app = angular.module('app', []);

    app.controller('TodoCtrl', ['$scope', function ($scope) {
        $scope.tasks = [];

        $scope.addTask = function (task) {
            if (task.trim().length > 0) {
                $scope.tasks.push({
                    title: task
                });
                $scope.$digest();
            }
        }
    }]);

    app.directive('todoList', function () {
        return {
            restrict: 'E',
            scope: {
                tasks: '='
            },
            link: function (scope, elem) {
                scope.$watchCollection('tasks', function (val) {
                    React.renderComponent(
                        TodoList({tasks: val}),
                        elem[0]
                    );
                });
            }
        }
    });

    app.directive('todoForm', function () {
        return {
            restrict: 'E',
            link: function (scope, elem) {
                React.renderComponent(
                    TodoForm({scope: scope}), elem[0]
                );
            }
        };
    });

}(window, angular));