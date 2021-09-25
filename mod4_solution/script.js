// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************
//
// Module 4 Assignment Instructions.
//
// The idea of this assignment is to take an existing array of names
// and then output either Hello 'Name' or Good Bye 'Name' to the console.
// The program should say "Hello" to any name except names that start with a "J"
// or "j", otherwise, the program should say "Good Bye". So, the final output
// on the console should look like this:
/*
Hello Yaakov
Good Bye John
Good Bye Jen
Good Bye Jason
Hello Paul
Hello Frank
Hello Larry
Hello Paula
Hello Laura
Good Bye Jim

WARNING!!! WARNING!!!
The code does NOT currently work! It is YOUR job to make it work
as described in the requirements and the steps in order to complete this
assignment.
WARNING!!! WARNING!!!

*/

(function () {
  var names = [
    "Yaakov",
    "John",
    "Jen",
    "Jason",
    "Paul",
    "Frank",
    "Larry",
    "Paula",
    "Laura",
    "Jim",
  ];

  //Use a for..of loop to enumerate the names
  for (const name of names) {
    //Take the first element of the name and lowercase it.
    var firstLetter = name.charAt(0).toLowerCase();

    /* if the firstLetter is j, call our byeSpeaker, 
    otherwise call our helloSpeaker */
    if (firstLetter === "j") {
      byeSpeaker.speak(name);
    } else {
      helloSpeaker.speak(name);
    }
  }

  /* Define a function constructNames which is used by our map function 
  to perform an equivalent to the for loop using the Array.prototype.map 
  function */
  var constructNames = function (name) {
    var firstLetter = name.charAt(0).toLowerCase();

    //Use a ternary here to provide an alternative syntax for an if/else
    return firstLetter === "j"
      ? byeSpeaker.speakSimple(name)
      : helloSpeaker.speakSimple(name);
  };

  /* Iterate our names array using the map function, calling constructNames 
  to transform each element input into the desired output */
  var greetings = names.map(constructNames);

  //Utilize forEach to call console.log on each element of the transformed input
  greetings.forEach((greeting) => console.log(greeting));

  //Define an object initialValue which will be used by our reducer
  var initialValue = {
    hello: [],
    bye: [],
  };

  /* Define a reducer which takes in an accumulator and the current 
  iterated element, determines if it's a 'hello' by looking at the first 
  character (as lowercase). If it is, then push to the array at key hello 
  of our accumulator, otherwise push to the arry at the bye key */
  const reducer = (previousValue, currentValue) => {
    if (currentValue.charAt(0).toLowerCase() == "h") {
      previousValue.hello.push(currentValue);
    } else {
      previousValue.bye.push(currentValue);
    }
    return previousValue;
  };

  //We will map over our names array like before, but chain this to our reduce function
  names.map(constructNames).reduce(reducer, initialValue);

  //Iterate the entries our of accumulator, printing out the hello array and then the goodbye array
  Object.entries(initialValue).forEach(([_key, value]) =>
    value.forEach((greeting) => console.log(greeting))
  );
})();
