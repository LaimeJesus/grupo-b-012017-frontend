myfilters.filter('price' ,  function ( $window ) {
    return function (price) {

        var language = ($window.navigator.userLanguage || $window.navigator.language).indexOf("en") == 0? "en-us" : "es-es";

        if (price !== undefined){
            if(language === 'en-us'){
                return 'USD' + price.integer + '.' + price.decimal;
            }
            if(language === 'es-es') {
                return '$' + price.integer + ',' + price.decimal;
            }
        } else {
            return '$0,0';
        }

    }
});
