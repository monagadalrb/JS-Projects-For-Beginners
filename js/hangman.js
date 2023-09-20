//Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

//Get Array From Letters
let lettersArray = Array.from(letters);

//Select Letters Container
let lettersContainer = document.querySelector(".letters");

//Generate Letters
lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  //Create Letter Text Node
  let theletter = document.createTextNode(letter);

  span.appendChild(theletter);

  span.className = "letter-box";

  lettersContainer.appendChild(span);
});

//Object Of Words + Category
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortan",
    "mysql",
    "python",
  ],
  movies: ["interstaller", "parasite", "coco", "up", "tune in for love"],
  people: ["mona", "amira", "mai", "noura", "sabah", "fatma", "youns", "selim"],
  countries: ["yemen", "egypt", "palestine", "qatar", "syria"],
};

//Get Random Property
let allKeys = Object.keys(words);

//Random Number Depend on Keys Length
let randomPropNmber = Math.floor(Math.random() * allKeys.length);
//Category
let randomPropName = allKeys[randomPropNmber];
//Category Words
let randomPropValue = words[randomPropName];
//Random Number Depend on Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

//Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

//Select Letters guess
let lettersGuessContainer = document.querySelector(".letters-guess");

//Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

//Create Spans Depend On Words
lettersAndSpace.forEach((letter) => {
  //Create Empty Span
  let emptySpan = document.createElement("span");

  //If Letters Is Space
  if (letter == " ") {
    emptySpan.className = "has-space";
  }
  //Append Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});

//Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

//Set Wrong Attempts
let wrongAttemps = 0;

//Select The Draw Elements
let theDraw = document.querySelector(".hangman-draw");

//Handle Clicking on Letters
document.addEventListener("click", (e) => {
  //Set The Chose Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    //Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    //The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      //If The Clicked Letter = One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {
        //Set Status To True
        theStatus = true;

        //Loop On Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = wordLetter;
          }
        });
      }
    });
    if (theStatus !== true) {
      //Increase The Wrong Attempts
      wrongAttemps++;

      //Add Class Wrong On Draw Element
      theDraw.classList.add(`wrong-${wrongAttemps}`);
      //Play Fail Sound
      document.getElementById("failed").play();

      if (wrongAttemps === 8) {
        endGame();

        lettersContainer.classList.add("finished");
      }
    } else {
      document.getElementById("success").play();
    }
  }
});

function endGame() {
  //PopUp Div
  let div = document.createElement("div");
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomValueValue}`
  );
  div.appendChild(divText);
  //Add Class On Div
  div.className = "popup";
  document.body.appendChild(div);
}
