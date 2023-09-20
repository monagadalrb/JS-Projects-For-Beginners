/** My Tasks
 * [1] Use Sweet Alert If Input is Empty
 * [2] Check If There is Equal Tasks Added
 * [3] Creat Delete All Tasks Button
 * [4] Creat Finish All Tasks Button
 * [5] Add The Tasks To Local Storage
 */

//Setting Up Varibles
let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");

//Focus on Input Field
window.onload = function () {
  theInput.focus();
};

//Add The Task
theAddButton.onclick = function () {
  //If Input Is Empty
  if (theInput.value === "") {
    console.log("Empty");
  } else {
    let noTasksMsg = document.querySelector(".no-tasks-message");

    //Check If Span Msg Is Exist
    if (document.body.contains(document.querySelector(".no-tasks-message"))) {
      //Remove No Tasks Msg
      noTasksMsg.remove();
    }

    //Create Span Element
    let mainSpan = document.createElement("span");

    let deleteElement = document.createElement("span");

    //Create Text To Span
    let text = document.createTextNode(theInput.value);

    //Create Text To Delete Button Text
    let deleteText = document.createTextNode("Delete");

    //Add Text To Span
    mainSpan.appendChild(text);

    //Add Class To Span
    mainSpan.className = "task-box";

    //Add Text To Delete Button
    deleteElement.appendChild(deleteText);

    //Add Class To Delete Button
    deleteElement.className = "delete";

    //Add Delete Button To Main Span
    mainSpan.appendChild(deleteElement);

    //Add The Task To Container
    tasksContainer.appendChild(mainSpan);

    //Empty The Input
    theInput.value = "";

    theInput.focus();

    //Calculate Tasks
    calcAllTask();
  }
};

//Delete Button
document.addEventListener("click", function (e) {
  if (e.target.className == "delete") {
    e.target.parentNode.remove();

    //Check Number Of tasks in Container
    if (tasksContainer.childElementCount == 0) {
      createNoTasks();
    }
  }
  //Finish Task
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
  }
  calcAllTask();
});

//Function To Create No Tasks Msg
function createNoTasks() {
  let msgSpan = document.createElement("span");

  let msgText = document.createTextNode("No Tasks To Show");

  msgSpan.appendChild(msgText);

  msgSpan.className = "no-tasks-message";

  tasksContainer.appendChild(msgSpan);
}

//Function To Calculate Tasks
function calcAllTask() {
  //Calculate All Tasks
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;

  //Calculate Completed Tasks
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}
