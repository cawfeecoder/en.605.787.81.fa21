(function () {
  "use strict";

  var app = angular.module("LunchCheck", []);

  app.controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];

  function LunchCheckController($scope) {
    $scope.lunchInput = "";
    $scope.lunchMessage = "";
    $scope.buttonClicked = false;
    $scope.dataPresent = false;

    $scope.handleButtonClick = function (input) {
      $scope.buttonClicked = true;
      let items = input.split(",").filter((x) => x.trim().length > 0);
      if (items.length < 1) {
        $scope.dataPresent = false;
        $scope.lunchMessage = "Please enter data first";
        return;
      }
      $scope.dataPresent = true;
      $scope.lunchMessage = items.length <= 3 ? "Enjoy!" : "Too much!";
    };
  }
})();
