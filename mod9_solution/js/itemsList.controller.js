(function () {
  "use strict";

  angular
    .module("MenuApp")
    .controller("ItemsListController", ItemsListController);

  ItemsListController.$inject = ["items", "category"];
  function ItemsListController(items, category) {
    this.items = items;
    this.category = category;
  }
})();
