import { findAll, saveAll } from "./issue-store";

function setStatusProcessed(id) {
  setStatus(id, "in progress")
  fetchIssues();
}

export function setStatusClosed(id) {
  setStatus(id, "closed")
  fetchIssues();
}

export const setStatus = (id, status) => {
  const issues = findAll()

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = status;
    }
  }

  saveAll(issues)
};

function deleteIssue(id) {
  if (window.confirm("Confirm deleting the issue")) {
    const issues = findAll()

    for (let i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }

    setStatus(id, issues)
    fetchIssues();
  }
}

/**
 * 課題をすべて取得します。
 */
export function fetchIssues() {
  const issues = findAll()
  const issuesList = document.getElementById("issuesList");

  issuesList.innerHTML = "";

  for (let i = 0; i < issues.length; i++) {
    const id = issues[i].id;
    const title = issues[i].title;
    const description = issues[i].description;
    const severity = issues[i].severity;
    const assignedTo = issues[i].assignedTo;
    const status = issues[i].status;

    issuesList.innerHTML += `
              <div class="well">
                  <h6>Issue ID: ${id} </h6>
                  <p><span class="label label-info">${status}</span></p>
                  <h3>${title}</h3>
                  <p><span class="glyphicon glyphicon-time"></span>${severity}</p>
                  <p><span class="glyphicon glyphicon-user"></span>${assignedTo}</p>
                  <p><span class="glyphicon glyphicon-file"></span>${description}</p>
                  <a href="#" id="anchorStatusProcessed" class="btn btn-primary">Processed</a>
                  <a href="#" id="anchorStatusClosed" class="btn btn-success">Close</a>
                  <a href="#" id="anchorDeleteIssue" class="btn btn-danger">Delete</a>
              </div>
              `;
    document
      .getElementById("anchorStatusProcessed")
      .addEventListener("click", setStatusProcessed(id));
    document
      .getElementById("anchorStatusClosed")
      .addEventListener("click", setStatusClosed(id));
    document
      .getElementById("anchorDeleteIssue")
      .addEventListener("click", deleteIssue(id));
  }
}
