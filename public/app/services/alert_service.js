myservices.factory('AlertService', function() {
    var AlertServiceAPI = {};

    AlertServiceAPI.getDeleteButton = function() {
      return {
	        'title' : 'Are you sure?',
	        'text' : "It will permanently deleted!",
	        'type' : 'warning',
	        'showCancelButton' : true,
	        'confirmButtonColor' : '#3085d6',
	        'cancelButtonColor' : '#d33',
	        'confirmButtonText' : 'Yes, delete it!',
          'allowOutsideClick' : false
      	}
    };

    AlertServiceAPI.newAlert = function(title, body, typ){
      return {'title' : title, 'text' : body, 'type' : typ};
    }

    AlertServiceAPI.getSuccessAlert = function(title, body){
      return AlertServiceAPI.newAlert(title, body, 'success');
    }

    return AlertServiceAPI;

});
