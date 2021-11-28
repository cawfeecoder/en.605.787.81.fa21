(function () {
  angular.module("MenuApp").config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "templates/home.html",
      })

      .state("categories", {
        url: "/categories",
        templateUrl: "templates/categories.html",
        controller: "CategoryListController as categoryList",
        resolve: {
          categories: [
            "MenuDataService",
            function (MenuDataService) {
              return MenuDataService.getAllCategories();
            },
          ],
        },
      })

      .state("items", {
        url: "/categories/{categoryShortName}",
        templateUrl: "templates/items.html",
        controller: "ItemsListController as itemList",
        resolve: {
          category: [
            "$stateParams",
            "MenuDataService",
            function ($stateParams, MenuDataService) {
              return MenuDataService.getCategoryForShortname(
                $stateParams.categoryShortName
              );
            },
          ],
          items: [
            "$stateParams",
            "MenuDataService",
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory(
                $stateParams.categoryShortName
              );
            },
          ],
        },
      });
  }
})();
