import { fetchIssues } from "./issue-operation";
import { save } from "./issue-store";

/**
 * 画面ロード時に課題を取得するイベントリスナ
 */
window.addEventListener("load", fetchIssues);

/**
 * 入力フォームのイベントリスナ
 */
document
  .getElementById("issueInputForm")
  .addEventListener("submit", saveIssue);

function saveIssue(e) {
  const title = document.getElementById("issueTitleInput").value;
  const issueDescription = document.getElementById("issueDescInput").value;
  const issueSeverity = document.getElementById("issueSeverityInput").value;
  const issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  
  const issue = {
    // eslint-disable-next-line no-undef
    id: chance.guid(),
    title: title,
    description: issueDescription,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: "open",
  };

  save(issue)

  document.getElementById("issueInputForm").reset();

  fetchIssues();

  e.preventDefault();
}
