(function () {
  "use strict";

  angular.module("public").controller("MyInfoController", MyInfoController);

  MyInfoController.$inject = ["userInfo"];

  function MyInfoController(userInfo) {
    this.userData = userInfo;
  }
})();
