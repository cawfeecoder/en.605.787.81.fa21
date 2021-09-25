(function () {
  //Create an object to attach speak to
  var byeSpeaker = {};

  var speakWord = "Good Bye";

  //Attach the speak function to byeSpeaker
  byeSpeaker.speak = function (name) {
    console.log(speakWord + " " + name);
  };

  //Attach the speakSimple function to byeSpeaker
  byeSpeaker.speakSimple = function (name) {
    return speakWord + " " + name;
  };

  //Freeze byeSpeaker in order to prevent anyone from redefining speak
  Object.freeze(byeSpeaker);

  //Expose byeSpeaker globally
  window.byeSpeaker = byeSpeaker;
})();
