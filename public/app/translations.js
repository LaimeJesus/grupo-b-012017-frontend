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
        "ready" : "Listo para comprar",
        "createproduct" : "Crear Producto",
        "registers" : "Cajas Registradoras"
    },
     "general" : {
      "cancel" : "Cancelar",
      "home" : "Principal",
      "or" : "o",
      "loginerror" : "algo fallo",
      "options" : "Opciones",
      "close" : "Cerrar",
      "open" : "Abrir",
      "update" : "Actualizar",
      "loginfo" : "Ingresa para ver mas info",
      "adminProducts" : "Administrar Productos",
      "delete" : "Eliminar",
      "edit" : "Editar",
      "totalcost" : "Costo total",
      "recommendations_availables" : "Algunos usuarios que compraron",
      "bought" : "Tambien compraron",
      "recommendations_not_availables" : "No hay recomendaciones para"
    },
      "products" : {
        "name" : "Nombre",
        "brand" : "Marca",
        "buy" : "Comprar",
        "price" : "Precio",
        "integer" : "Parte entera",
        "decimal" : "Parte decimal",
        "category" : "Categoria",
        "addtolist" : "Agregar a la lista",
        "list" : "Lista",
        "quantity" : "Cantidad",
        "details" : "Ver detalles",
        "create" : "Crear Producto",
        "update" : "Actualizar Producto",
        "upload" : "Cargar Productos",
        "processingTime" : "Tiempo de proceso en ms"
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
       "address" : "Direccion",
       "oldpassword" : "Password Vieja",
       "newpassword" : "Password Nueva",
       "imageurl" : "Url de la imagen"
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
     },
     "register" : {
       "size" : "Cantidad",
       "waiting_time" : "Tiempo de Espera"
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
        "ready" : "Ready to buy",
        "createproduct" : "Create Product",
        "registers" : "Cash Registers"
      },
     "products" : {
        "name" : "Name",
        "brand" : "Brand",
        "buy" : "Buy",
        "price" : "Price",
        "integer" : "Integer Part",
        "decimal" : "Decimal Part",
        "category" : "Category",
        "addtolist" : "Add to list",
        "list" : "List",
        "quantity" : "Quantity",
        "details" : "See details",
        "processingTime" : "Processing time in ms",
        "upload" : "Upload Products",
        "create" : "Create Product",
        "update" : "Update Product"
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
        "loginerror" : "something failed",
        "options" : "Options",
        "close" : "Close",
        "open" : "Open",
        "update" : "Update",
        "loginfo" : "Log in to see more info",
        "adminProducts" : "Admin Products",
        "delete" : "Delete",
        "edit" : "Edit",
        "totalcost" : "Total Cost",
        "recommendations_availables" : "Some users that bought",
        "bought" : "Also bought",
        "recommendations_not_availables" : "No recommendations available for"
      },
      "user" : {
        "username" : "Username",
        "password" : "Password",
        "createaccount" : "New here? Create Account",
        "email" : "Email",
        "changePassword" : "Change Password",
        "changeProfileImage" : "Change profile image",
        "paymentDate" : "Payment Date",
        "address" : "Address",
        "oldpassword" : "Old Password",
        "newpassword" : "New Password",
        "imageurl" : "Url Image"
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
      },
      "register" : {
        "size" : "Size",
        "waiting_time" : "Waiting Time"
      }
    }
  );
  $translateProvider.useSanitizeValueStrategy('escapeParameters');
}]);

app.run(["$window", "$translate", function($window, $translate){
  var language = ($window.navigator.userLanguage || $window.navigator.language).indexOf("en") == 0? "en-us" : "es-es";
  $translate.use(language);
}]);
