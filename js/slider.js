// Get Slider Items & Get Number Of Slides
var sliderImages = Array.from(
  document.querySelectorAll(".slider-container img")
);

var sliderCount = sliderImages.length;
// Set Current Index(Slide)
var currentSlide = 4;

//Slide Number Element => SLide #...
var sliderNumberElement = document.getElementById("slid-number");

//Previous And Next Buttons
var prevButton = document.getElementById("prev");
var nextButton = document.getElementById("next");

//Handle Click on Prev & next Buttons
prevButton.onclick = previousSlide;
nextButton.onclick = nextSlide;

//Create The Main UL Element
var paginationElement = document.createElement("ul");

//Set Id On Created Ul Element
paginationElement.setAttribute("id", "pagination-ul");

//Create li Based on Slide Numbers(Images Count)
for (let i = 1; i <= sliderCount; i++) {
  // Create The li
  var paginationItem = document.createElement("li");

  //Set Id On Created Ul items
  paginationItem.setAttribute("data-index", i);

  //Set Item Content
  paginationItem.appendChild(document.createTextNode(i));

  //Append Elements To The Main Pagination
  paginationElement.appendChild(paginationItem);
}
//Add Created Ul Element To The Page
document.getElementById("indicators").appendChild(paginationElement);

// Get Pagination Items & Get Number Of Slides
var paginationBullets = Array.from(
  document.querySelectorAll("#pagination-ul li")
);

//Loop Through All Pagination Bullets
for (var i = 0; i < paginationBullets.length; i++) {
  paginationBullets[i].onclick = function () {
    currentSlide = parseInt(this.getAttribute("data-index"));
    theChecker();
  };
}
//Get The New Created UL
var paginationCreatedUL = document.getElementById("pagination-ul");

//Trigger The Checker Function
theChecker();

//Previous And Next Functions
function previousSlide() {
  if (prevButton.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide--;
    theChecker();
  }
}
function nextSlide() {
  if (nextButton.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide++;
    theChecker();
  }
}

//Create The Checker Function
function theChecker() {
  //Set The Slide Number
  sliderNumberElement.textContent = `Slide #${currentSlide} of ${sliderCount}`;

  //Remove All Active Classes
  removeAllActive();

  //Set Active Class On Current Slide
  sliderImages[currentSlide - 1].classList.add("active");

  //Set Active Class On Current Pagination Item
  paginationCreatedUL.children[currentSlide - 1].classList.add("active");

  //Check If Current Slide Is The First
  if (currentSlide == 1) {
    //Add Disabled Class On Previous Button
    prevButton.classList.add("disabled");
  } else {
    //Remove Disabled Class from On Previous Button
    prevButton.classList.remove("disabled");
  }

  //Check If Current Slide Is The Last
  if (currentSlide == sliderCount) {
    //Add Disabled Class On Next Button
    nextButton.classList.add("disabled");
  } else {
    //Remove Disabled Class from On Next Button
    nextButton.classList.remove("disabled");
  }
}

//Remove All Active Classes From Images & Bullets
function removeAllActive() {
  //Loop Through Images
  sliderImages.forEach((img) => {
    img.classList.remove("active");
  });
  //Loop Through Images
  paginationBullets.forEach((bullet) => {
    bullet.classList.remove("active");
  });
}
