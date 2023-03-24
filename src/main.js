import { fetchIssues } from "./issue-operation";
import { EVENT_CONST, LOCALSTORAGE_CONST, ISSUE_STATUS_CONST } from "./constants";

/**
 * 画面ロード時に課題を取得するイベントリスナ
 */
window.addEventListener(EVENT_CONST.load, fetchIssues);

/**
 * 入力フォームのイベントリスナ
 */
document.getElementById("issueInputForm").addEventListener(EVENT_CONST.submit, saveIssue);

/**
 * 新規の課題を登録します。
 * @param {*} e 
 */
function saveIssue(e) {
    const title = document.getElementById("issueTitleInput").value;
    const issueDescription = document.getElementById("issueDescInput").value;
    const issueSeverity = document.getElementById("issueSeverityInput").value;
    const issueAssignedTo = document.getElementById("issueAssignedToInput").value;
    // eslint-disable-next-line no-undef
    const issueId = chance.guid();
    const issueStatus = ISSUE_STATUS_CONST.open;

    const issue = {
        id: issueId,
        title: title,
        description: issueDescription,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    };

    if(localStorage.getItem(LOCALSTORAGE_CONST.key_issues) == null) {
        localStorage.setItem(LOCALSTORAGE_CONST.key_issues, JSON.stringify([issue]));
    } else {
        const issues = JSON.parse(localStorage.getItem(LOCALSTORAGE_CONST.key_issues));
        issues.push(issue);
        localStorage.setItem(LOCALSTORAGE_CONST.key_issues, JSON.stringify(issues));
    }

    document.getElementById("issueInputForm").reset();

    fetchIssues();

    e.preventDefault();
}
