document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What's Your Name");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
//Flipped Block Function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

//Stop Clicking Function
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

//Check MAtched Blocks
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.idolCard === secondBlock.dataset.idolCard) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-matched");
    secondBlock.classList.add("has-matched");

    document.querySelector("#succes").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    document.querySelector("#failed").play();
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}
// console.log(random);
