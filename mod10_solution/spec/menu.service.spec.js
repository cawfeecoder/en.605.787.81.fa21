describe("MenuService", function () {
  var menuService;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module("common");
  });

  beforeEach(inject(function ($injector) {
    menuService = $injector.get("MenuService");
    $httpBackend = $injector.get("$httpBackend");
    ApiPath = $injector.get("ApiPath");
  }));

  it("should return true when menu item exists", function (done) {
    var shortName = "L5";
    $httpBackend
      .whenGET(ApiPath + "/menu_items/" + shortName + ".json")
      .respond(["Hi"]);

    menuService.shortNameExists(shortName).then(function (response) {
      expect(response).toEqual(true);
      done();
    });
    $httpBackend.flush();
  });

  it("should return false when menu item does not exist", function (done) {
    var shortName = "elephant";
    $httpBackend
      .whenGET(ApiPath + "/menu_items/" + shortName + ".json")
      .respond(["Hi"]);

    menuService.shortNameExists(shortName).then(function (response) {
      expect(response).toEqual(true);
      done();
    });
    $httpBackend.flush();
  });
});
