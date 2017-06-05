/**
 * Created by PCM ExiLio on 4/6/2017.
 */

var filters = angular.module('aloloco-app.filters', []);

filters.filter('byCategory' ,  function () {
    return function (list) {

        var res = [];

        for (i = 0; i < list.length; i++) {
            if(list[i].category !== undefined){
                res.push(list[i]);
            }
        }

        return res;
    }
});