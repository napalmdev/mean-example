(function() {
  'use strict';

  angular
    .module('todoapp') 
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$http'];

  function IndexController ($http) {
    var self = this;

    var refresh = function() {
      $http.get('/tasks').success(function(response) {
        console.log("I got the data I requested");
        self.tasks = response;
        self.task = "";
        self.editing = false;
      });
    };

    refresh();

    self.addTask = function() {
      console.log(self.task);
      $http.post('/tasks', self.task).success(function(response) {
        console.log(response);
        refresh();
      });
    };

    self.remove = function(id) {
      console.log(id);
      $http.delete('/tasks/' + id).success(function(response) {
        refresh();
      });
    };

    self.edit = function(id) {
      console.log(id);
      $http.get('/tasks/' + id).success(function(response) {
        self.taskToUpdate = response;
        self.editing = id;
      });
    };  

    self.update = function(task) {
      console.log(self.task._id);
      $http.put('/tasks/' + self.taskToUpdate._id, self.taskToUpdate).success(function(response) {
        refresh();
      })
    };

    self.deselect = function() {
      self.task = "";
    }

  } 
})();