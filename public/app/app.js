/**
 * @ngdoc overview
 * @name aloloco-app
 * @description
 * # aloloco-app
 *
 * Main module of the application.
 */
var app = angular.module('aloloco-app', [
    'aloloco-app.myservices',
    'aloloco-app.mycontrollers',
    'aloloco-app.myfilters',
    'ngRoute',
    'ngResource',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ngMap'

]).config(function ($routeProvider, $locationProvider) {
     $routeProvider
       .when('/', {
         templateUrl: '../views/newproducts.html',
         controller: 'ProductController',
       })
       .when('/signup',{
         templateUrl: '../views/signup.html',
         controller: 'SignUpController',
       })
       .when('/login',{
         templateUrl: '../views/login.html',
         controller: 'LoginController',
       })
       .when('/mylists',{
         templateUrl: '../views/productlist.html',
         controller: 'ProductListController',
       })
       .when('/offers',{
           templateUrl: '../views/homeOffer.html',
           controller: 'HomeOfferController',
       })
       .when('/myprofile', {
           templateUrl: '../views/profile.html',
           controller: 'ProfileController'
       })
       .when('/createOffer',{
           templateUrl: '../views/createOffer.html',
           controller: 'HomeOfferController',
       })
       .when('/delivery',{
           templateUrl: '../views/delivery.html',
           controller: 'DeliveryController',
       })
       .otherwise({
         redirectTo: '/'
       });
      $locationProvider.html5Mode(true);
   });

   app.config(['$translateProvider' , function ($translateProvider) {

     $translateProvider.translations(
       "es-es" , {
         "navbar" : {
         "title" : "A lo loco!!!",
         "search" : "Busqueda",
         "login" : "Ingresar",
         "signup" : "Registrarse",
         "logout" : "Cerrar Sesion",
         "products" : "Productos",
         "mylists" : "Mis Listas",
         "profile" : "Mi Perfil",
         "createoffer" : "Crear Oferta",
         "offers" : "Ofertas",
         "waiting" : "Esperando",
         "ready" : "Listo para comprar"
       },
        "general" : {
         "cancel" : "Cancelar",
         "home" : "Principal",
         "or" : "o",
         "loginerror" : "algo fallo"
       },
         "products" : {
           "name" : "Nombre",
           "buy" : "Comprar",
           "price" : "Precio",
           "category" : "Categoria",
           "addtolist" : "Agregar a la lista",
           "list" : "Lista",
           "quantity" : "Cantidad"
        },
        "productlist" : {
          "createlist" : "Crear una lista nueva",
          "listname" : "Nombre de la lista",
          "creationDate" : "Fecha de creacion",
          "totalAmount" : "Saldo total",
          "options" : "Opciones",
          "ready" : "Listo",
          "shop" : "Comprar",
          "delivery" : "Envio a domicilio",
          "product" : "Producto",
          "update" : "Actualizar",
          "delete" : "Eliminar",
          "create" : "Crear ahora",
          "repeatedname" : "Por favor no repitas nombres"
        },
        "user" : {
          "username" : "Nombre de usuario",
          "password" : "Contrasena",
          "createaccount" : "Nuevo aqui? Create una cuenta",
          "email" : "Correo electronico",
          "changePassword" : "Cambiar Contraseña",
          "changeProfileImage" : "Cambiar Imagen de Perfil",
          "paymentDate" : "Fecha de Pago",
          "address" : "Direccion"
        },
        "offerCreation" : {
          "initialDate" : "Fecha inicial",
          "finalDate" : "Fecha final",
          "discount" : "Porcentaje de descuento",
          "discountMessage" : "Descuento: ",
          "offerType" : "Tipo de oferta",
          "category" : "Oferta por categoria",
          "crossing" : "Oferta tipo 2x1",
          "combination" : "Oferta por combinacion",
          "chooseCategory" : "Seleccione una categoria",
          "required" : "Este elemento es requerido"
        }
      }
     );
     $translateProvider.translations(
       "en-us" , {
         "navbar" : {
           "title" : "Crazy Shop",
           "search" : "Search",
           "login" : "Log In",
           "signup" : "Sign Up",
           "logout" : "Log Out",
           "products" : "Products",
           "mylists" : "My Lists",
           "profile" : "My Profile",
           "createoffer" : "Create Offer",
           "offers" : "Offers",
           "waiting" : "Waiting",
           "ready" : "Ready to buy"
       },
        "products" : {
           "name" : "Name",
           "buy" : "Buy",
           "price" : "Price",
           "category" : "Category",
           "addtolist" : "Add to list",
           "list" : "List",
           "quantity" : "Quantity"
         },
         "productlist" : {
           "createlist" : "Create New List",
           "listname" : "List name",
           "creationDate" : "Creation Date",
           "totalAmount" : "Total Amount",
           "options" : "Options",
           "ready" : "Ready",
           "shop" : "Buy",
           "delivery" : "Delivery",
           "product" : "Product",
           "update" : "Update",
           "delete" : "Delete",
           "create" : "Create now",
           "repeatedname" : "Please, dont repeat names. We trust in you"
         },
         "general" : {
           "cancel" : "Cancel",
           "home" : "Home",
           "or" : "or",
           "loginerror" : "something failed"
         },
         "user" : {
           "username" : "Username",
           "password" : "Password",
           "createaccount" : "New here? Create Account",
           "email" : "Email",
           "changePassword" : "Change Password",
           "changeProfileImage" : "Change profile image",
           "paymentDate" : "Payment Date",
           "address" : "Address"
         },
         "offerCreation" : {
           "initialDate" : "Initial Date",
           "finalDate" : "Final Date",
           "discount" : "Discount",
           "discountMessage" : "Discount: ",
           "offerType" : "Offer type",
           "category" : "Category Offer",
           "crossing" : "Crossing Offer",
           "combination" : "Combination Offer",
           "chooseCategory" : "Choose a category",
           "required" : "This element is required"
         }
       }
     );
     $translateProvider.useSanitizeValueStrategy('escapeParameters');
   }]);

app.run(["$window", "$translate", function($window, $translate){
  var language = ($window.navigator.userLanguage || $window.navigator.language).indexOf("en") == 0? "en-us" : "es-es";
  $translate.use(language);
}]);
