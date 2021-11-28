(function () {
  "use strict";

  angular.module("MenuApp").component("categoriesList", {
    templateUrl: "templates/categories-list.html",
    bindings: {
      categories: "<",
    },
  });
})();
