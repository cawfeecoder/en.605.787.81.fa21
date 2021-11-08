(function () {
  "use strict";

  var app = angular.module("NarrowItDownApp", []);

  app.constant("APIBaseUrl", "https://davids-restaurant.herokuapp.com");

  app.directive("foundItems", FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: "found.html",
      scope: {
        items: "<",
        onRemove: "&",
      },
      controller: FoundItemsDirectiveController,
      controllerAs: "foundItems",
      bindToController: true,
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var foundItems = this;

    foundItems.checkFoundList = function () {
      return (
        foundItems.items.length == 0 && typeof foundItems.items !== "undefined"
      );
    };
  }

  app.controller("NarrowItDownController", NarrowItDownController);

  NarrowItDownController.$inject = ["$scope", "MenuSearchService"];

  function NarrowItDownController($scope, MenuSearchService) {
    $scope.found;
    $scope.searchTerm = "";

    $scope.narrowItDown = function (searchTerm) {
      if (searchTerm) {
        MenuSearchService.getMatchedMenuItems(searchTerm)
          .then((data) => ($scope.found = data))
          .catch((err) => console.log(err));
      } else {
        $scope.found = [];
      }
    };

    $scope.remove = function (index) {
      $scope.found.splice(index, 1);
    };
  }

  app.service("MenuSearchService", MenuSearchService);

  MenuSearchService.$inject = ["$http", "APIBaseUrl"];

  function MenuSearchService($http, APIBaseUrl) {
    this.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: APIBaseUrl + "/menu_items.json",
      }).then((response) => {
        return response.data.menu_items.filter((x) =>
          x.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    };
  }
})();
