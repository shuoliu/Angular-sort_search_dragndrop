// drag item
app.directive('draggable', function() {
  return function(scope, element) {
    var el = element[0];
    el.draggable = true;
    el.addEventListener('dragstart', function(e) {
	  // console.log(scope.project.$id);
      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.clearData('Text');
	  //pass project id
      e.dataTransfer.setData('Text', scope.project.$id);
      this.classList.add('dragging');
      return false;
    }, false);
      
    el.addEventListener('dragend', function(e) {
      this.classList.remove('dragging');
      return false;
    }, false);
  }
});


//drop area
app.directive('droppable', function() {
	return function(scope, element, attrs) {
	  scope.selected = angular.selected;
      var el = element[0];
      el.addEventListener('dragover', function(e) {
	    console.log('dragover');
        e.dataTransfer.dropEffect = 'copy';
        e.preventDefault();
        this.classList.add('dragging');
        return false;
      }, false);
      
      el.addEventListener('dragenter', function(e) {
        this.classList.add('dragging');
        return false;
      }, false);
      
      el.addEventListener('dragleave', function(e) {
        this.classList.remove('dragging');
        return false;
      }, false);
      
      el.addEventListener('drop', function(e) {
	    e.preventDefault();
        e.stopPropagation();
        this.classList.remove('dragging');
		//passed project id
        var id = e.dataTransfer.getData('Text');
		var allprojects = angular.projects.projects;
		
		//check if already dropped
		var has = false;
		for(var i = 0; i < scope.selected.projects.length; i ++) {
			if(scope.selected.projects[i].$id == id) {
				has = true;
				break;
			}
		}
		
		//get the whole project, easy for future feature expansion
		if(!has) {
			var pro;
			for(var i = 0; i < allprojects.length; i ++) {
				if(allprojects[i].$id == id) {
					pro = allprojects[i]; 
					break;
				}
			}
			scope.$apply(function() { // this line ensures the view been updated 
				scope.selected.add(pro);
				var s = parseInt(pro.file_size);
				if(!isNaN(s))
					scope.size += s;
			});
			console.log(pro.$id);
        }
        return false;
      }, false);
    }
});