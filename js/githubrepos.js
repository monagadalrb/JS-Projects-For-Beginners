//MAin variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-repos .get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

//Function Get Repos
function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())
      .then((repos) => {
        //Empty The Container
        reposData.innerHTML = "";

        //Loop On Repos
        repos.forEach((repo) => {
          //Create The Main Div Element
          let mainDiv = document.createElement("div");
          let repoName = document.createTextNode(repo.name);
          mainDiv.appendChild(repoName);

          //Create Repo Url
          let theUrl = document.createElement("a");

          //Create repo url text
          let theUrlText = document.createTextNode("Visit");
          theUrl.appendChild(theUrlText);

          //Add the Href
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

          //Set Attribute Blank
          theUrl.setAttribute("target", "blank");
          mainDiv.appendChild(theUrl);

          //Create Stars Count span
          let starsSpan = document.createElement("span");
          let starsText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );
          starsSpan.appendChild(starsText);
          mainDiv.appendChild(starsSpan);
          mainDiv.className = "repo-box";
          reposData.appendChild(mainDiv);
        });
      });
  }
}
