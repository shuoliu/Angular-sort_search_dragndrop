function Project(id,name,description, file_size, creation_date) {
  this.$id = id;
  this.name = name;
  this.description = description;
  this.file_size = file_size;
  this.creation_date = creation_date;
}

function Projects() {
  projects = [];
  this.projects = projects;
  this.loaded = 0;

  this.add = function(prj) {
    this.projects.splice(this.projects.length,0,prj);
  }

  this.get = function(id) {
    for(var i=0;i<this.projects.length;i++) {
      var prj = this.projects[i];
      if(prj.$id == id)
        return prj;
    }
  }
}

angular.projects = new Projects();
angular.selected = new Projects();

var app = angular.module('project',[]);

app.factory('Projects', function() {
    return angular.projects;
});

function ListCtrl($scope, $http, Projects) {
  if(Projects.loaded == 0) {
    $http.get("projects.json").success(function(data) {
      for(var i = 0;i<data.length;i++) {
        var itm = data[i];
        Projects.add(new Project(itm.$id,itm.name,itm.description, itm.file_size, itm.creation_date));
      }
    });
    Projects.loaded = 1;
  }
  $scope.projects = Projects;
  //sort by column
  $scope.orderBy = function(status, which) {
	if(status == which) return "-"+which;
	if(status.substring(1) == which) return '';
	return which;
  };
}