import { findAll, saveAll } from "./issue-store";

export function setStatusProcessed(id) {
  setStatus(id, "in progress");
}

export function setStatusClosed(id) {
  setStatus(id, "closed");
}

const setStatus = (id, status) => {
  const issues = findAll();

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = status;
    }
  }

  saveAll(issues);
};

export function deleteIssue(id) {
  if (window.confirm("Confirm deleting the issue")) {
    const issues = findAll();

    for (let i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }

    setStatus(id, issues);
  }
}

export function renderAllIssues() {
  const issues = findAll();
  const issuesList = document.getElementById("issuesList");

  if (!issuesList) {
    window.alert('document.getElementById("issuesList") is null');
    return;
  }

  issuesList.innerHTML = "";

  for (let i = 0; i < issues.length; i++) {
    const id = issues[i].id;

    issuesList.innerHTML += `
              <div class="well">
                  <h6>Issue ID: ${id} </h6>
                  <p><span class="label label-info">${issues[i].status}</span></p>
                  <h3>${issues[i].title}</h3>
                  <p><span class="glyphicon glyphicon-time"></span>${issues[i].severity}</p>
                  <p><span class="glyphicon glyphicon-user"></span>${issues[i].assignedTo}</p>
                  <p><span class="glyphicon glyphicon-file"></span>${issues[i].description}</p>
                  <button id="status-in-progress-${i}" class="btn btn-primary">Processed</button>
                  <button id="status-closed-${i}" class="btn btn-success">Close</button>
                  <button id="delete-issue-${i}" class="btn btn-danger">Delete</button>
              </div>
              `;
    document
      .getElementById("status-in-progress-" + i)
      .addEventListener("click", setStatusProcessed(id));
    document
      .getElementById("status-closed-" + i)
      .addEventListener("click", setStatusClosed(id));
    document
      .getElementById("delete-issue-" + i)
      .addEventListener("click", deleteIssue(id));
  }
}
