(function () {
  //Create an object to attach speak to
  var helloSpeaker = {};

  var speakWord = "Hello";

  //Attach the speak function to helloSpeaker
  helloSpeaker.speak = function (name) {
    console.log(speakWord + " " + name);
  };

  //Attach the speakSimple function to helloSpeaker
  helloSpeaker.speakSimple = function (name) {
    return speakWord + " " + name;
  };

  //Freeze helloSpeaker in order to prevent anyone from redefining speak
  Object.freeze(helloSpeaker);

  //Expose helloSpeaker globally
  window.helloSpeaker = helloSpeaker;
})();
