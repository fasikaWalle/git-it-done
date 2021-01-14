var spanE1 = document.querySelector("#repo-search-term");
var repoContainerE1 = document.querySelector("#repos-container");
var languageButtonsEl = document.querySelector("#btn-feature");
var user;
console.log(
  fetch("https://api.github.com/users/fasikaWalle/repos").then(function (
    response
  ) {
    response.json();
  })
);
var getUsersRepo = function (user) {
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert(`error:+${response.statusText}`);
      }
    })
    .catch(function (error) {
      alert("unable to connect github");
    });
};

var getFeaturedRepos = function (language) {
  var apiUrl =
    "https://api.github.com/search/repositories?q=" +
    language +
    "+is:featured&sort=help-wanted-issues";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(response);
        displayRepos(data.items, language);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};
var buttonClickHandler = function (event) {
  var language = event.target.getAttribute("data-language");
  console.log(language);
  if (language) {
    getFeaturedRepos(language);
    repoContainerE1.textContent = "";
  }
};
languageButtonsEl.addEventListener("click", buttonClickHandler);
var userFormE1 = document.querySelector("#user-form");
var nameInputE1 = document.querySelector("#username");
var formSubmitHandler = function (event) {
  event.preventDefault();
  console.log(nameInputE1.value);
  var username = nameInputE1.value.trim();
  if (!username) {
    alert("enter the correct name");
  } else {
    getUsersRepo(username);
  }
};
var displayRepos = function (repos, searchTerm) {
  spanE1.textContent = searchTerm;
  repoContainerE1.textContent = "";
  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + "/" + repos[i].name;
    var RepoE1 = document.createElement("a");
    RepoE1.classList = "list-item flex-row justify-space-between align-center";
    RepoE1.setAttribute("href", "./single-repo.html?repo=" + repoName);
    // create a span element to hold repository name

    var statusE1 = document.createElement("span");
    if (repos[i].open_issues_count > 0) {
      statusE1.innerHTML = `<i class="fas fa-times status-icon icon-danger"></i>${repos[i].open_issues_count} issue(s) `;
    } else {
      statusE1.innerHTML = `<i class="fas fa-check-square status-icon icon-success">`;
    }
    var titleE1 = document.createElement("span");
    titleE1.textContent = repoName;

    RepoE1.appendChild(titleE1);
    RepoE1.appendChild(statusE1);
    repoContainerE1.append(RepoE1);
  }
};
userFormE1.addEventListener("submit", formSubmitHandler);
