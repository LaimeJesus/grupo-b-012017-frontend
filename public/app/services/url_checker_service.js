myservices.factory('UrlCheckerService', function() {
    var UrlCheckerAPI = {};

    UrlCheckerAPI.isValidImageUrl = function(url) {
      return String(url).match(/\.(jpeg|jpg|gif|png)$/) === null;
    }

    UrlCheckerAPI.getValidImageUrl = function() {
      return "http://image.ibb.co/kaSNyQ/no_image_fixed.png";
    }

  return UrlCheckerAPI;

});
