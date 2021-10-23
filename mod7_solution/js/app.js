(function () {
  "use strict";

  var app = angular.module("ShoppingListCheckOff", []);

  app.filter("priceTotal", function () {
    return function (input) {
      return "$$$" + input.toFixed(2);
    };
  });

  var initialItems = [
    { name: "wine(s)", quantity: 20, pricePerItem: 22 },
    { name: "chocolate bar(s)", quantity: 1, pricePerItem: 3 },
    { name: "ramen", quantity: 10, pricePerItem: 2 },
    { name: "chicken breast(s)", quantity: 5, pricePerItem: 4 },
    { name: "meatballs", quantity: 12, pricePerItem: 1 },
  ];

  app.service(
    "ShoppingListCheckOffService",
    CreateShoppingListCheckOffService(initialItems)
  );

  function CreateShoppingListCheckOffService(initialItems) {
    return function ShoppingListCheckOffService() {
      var svc = this;

      var pending = initialItems;
      var bought = [];

      svc.buyItem = function (idx) {
        var selectedItem = pending[idx];
        if (selectedItem.quantity < 1 || selectedItem.quantity == undefined) {
          alert("Allowed minimum quantity is 1. Assuming 1.");
          selectedItem.quantity = 1;
        }
        svc.addBought(selectedItem);
        removePending(idx);
      };

      svc.getPendingItems = function () {
        return pending;
      };

      svc.getBoughtItems = function () {
        return bought;
      };

      svc.addBought = function (item) {
        bought.push(item);
      };

      function removePending(idx) {
        pending.splice(idx, 1);
      }
    };
  }

  app.controller("ToBuyController", ToBuyController);

  ToBuyController.$inject = ["$scope", "ShoppingListCheckOffService"];

  function ToBuyController($scope, ShoppingListCheckOffService) {
    $scope.items = ShoppingListCheckOffService.getPendingItems();
    $scope.bought = function (idx) {
      ShoppingListCheckOffService.buyItem(idx);
    };
  }

  app.controller("AlreadyBoughtController", AlreadyBoughtController);

  AlreadyBoughtController.$inject = ["$scope", "ShoppingListCheckOffService"];

  function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
    $scope.items = ShoppingListCheckOffService.getBoughtItems();
  }
})();
