var limitWarningE1 = document.querySelector("#limit-warning");
var container = document.querySelector("#issues-container");
varrepoNameE1 = document.querySelector("#repo-name");
var getRepoIssues = function (repo) {
  var apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(response);
        displayIssues(data);
        if (response.headers.get("link")) {
          debugger;
          console.log("repo has more zan 30 issues");
          displayWarning(repo);
        }
      });
    } else {
      document.location.replace("./index.html");
    }
  });
};

var displayIssues = function (issues) {
  if (issues.length == 0) {
    container.textContent = "this repo has no open issues";
    return;
  }
  for (let i = 0; i < issues.length; i++) {
    var issueE1 = document.createElement("a");
    issueE1.setAttribute(
      "class",
      "list-item flex-row justify-space-between align-center"
    );
    issueE1.setAttribute("href", issues[i].html_url);
    issueE1.setAttribute("target", "_blank");
    var titleE1 = document.createElement("span");
    titleE1.textContent = issues[i].title;
    issueE1.appendChild(titleE1);
    var typeE1 = document.createElement("span");
    if (issues[i].pull_request) {
      typeE1.textContent = "(pull request)";
    } else {
      typeE1.textContent = "(issue)";
    }
    issueE1.appendChild(typeE1);
    container.appendChild(issueE1);
  }
};
var getRepoName = function () {
  //location method used to get the url
  var queryString = document.location.search;
  var repoName = queryString.split("=")[1];
  if (repoName) {
    getRepoIssues(repoName);
    varrepoNameE1.textContent = repoName;
  } else {
    document.location.replace("./index.html");
  }
};
var displayWarning = function (repo) {
  limitWarningE1.textContent = "to see more than 30 issues,visit";
  var linkE1 = document.createElement("a");
  linkE1.textContent = "see more issues on github.com";
  linkE1.setAttribute("href", `https://github.com/${repo}/issues`);
  linkE1.setAttribute("target", " _blank");
  limitWarningE1.appendChild(linkE1);
};
// getRepoIssues("expressjs/express");
getRepoName();
