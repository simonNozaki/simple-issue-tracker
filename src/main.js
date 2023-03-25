import { fetchAndRenderIssues } from "./issue-operation";
import { save } from "./issue-store";

/**
 * 画面ロード時に課題を取得するイベントリスナ
 */
window.addEventListener("load", fetchAndRenderIssues);

/**
 * 入力フォームのイベントリスナ
 */
document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

function saveIssue(e) {
  const issue = {
    // eslint-disable-next-line no-undef
    id: chance.guid(),
    title: document.getElementById("issueTitleInput").value,
    description: document.getElementById("issueDescInput").value,
    severity: document.getElementById("issueSeverityInput").value,
    assignedTo: document.getElementById("issueAssignedToInput").value,
    status: "open",
  };

  save(issue);
  document.getElementById("issueInputForm").reset();
  fetchAndRenderIssues();
  e.preventDefault();
}
