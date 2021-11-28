(function () {
  "use strict";

  angular
    .module("data")
    .service("MenuDataService", MenuDataService)
    .constant("APIBaseUrl", "https://davids-restaurant.herokuapp.com");

  MenuDataService.$inject = ["$http", "APIBaseUrl"];

  function MenuDataService($http, APIBaseUrl) {
    this.getAllCategories = function () {
      return $http({
        method: "GET",
        url: APIBaseUrl + "/categories.json",
      }).then((response) => {
        return response.data;
      });
    };

    this.getCategoryForShortname = function (categoryShortName) {
      return $http({
        method: "GET",
        url: APIBaseUrl + "/categories.json",
      }).then((response) => {
        return (
          response.data
            .filter((category) => category.short_name == categoryShortName)
            .at(0).name || null
        );
      });
    };

    this.getItemsForCategory = function (categoryShortName) {
      return $http({
        method: "GET",
        url: APIBaseUrl + "/menu_items.json",
        params: {
          category: categoryShortName,
        },
      }).then((response) => {
        return response.data.menu_items;
      });
    };
  }
})();
