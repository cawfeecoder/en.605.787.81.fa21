(function () {
  "use strict";

  angular
    .module("public")
    .controller("SignUpController", SignUpController)
    .value("userInfo", {});

  SignUpController.$inject = ["$scope", "MenuService", "userInfo"];

  function SignUpController($scope, MenuService, userInfo) {
    var signup = this;
    signup.user = {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      favorite: "",
    };

    $scope.$watch(
      angular.bind(signup, function () {
        return this.user.favorite;
      }),
      function (val) {
        if (val.length > 0) {
          MenuService.shortNameExists(val).then(function (response) {
            signup.dishNotExist = !response;
          });
        }
      }
    );

    signup.submit = function () {
      MenuService.getShortName(signup.user.favorite)
        .then(function (response) {
          angular.extend(userInfo, signup.user);
          userInfo.menuItem = response.data;
          userInfo.registered = signup.complete = true;
        })
        .catch(function (error) {
          signup.dishNotExist = true;
        });
    };
  }
})();
