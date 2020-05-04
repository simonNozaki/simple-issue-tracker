import { fetchIssues } from "./issue-operation";
import { EVENT_CONST, LOCALSTORAGE_CONST, ISSUE_STATUS_CONST } from "./constants";

// /**
//  * ローカルストレージ用定数オブジェクト
//  */
// const LOCALSTORAGE_CONST = {
//     key_issues: "issues"
// }

// /**
//  * イシューステータス定数
//  */
// const ISSUE_STATUS_CONST = {
//     open: "Open",
//     processed: "Processed",
//     closed: "Closed"
// }

// /**
//  * イベント定数
//  */
// const EVENT_CONST = {
//     submit: "submit",
//     load: "load"
// }

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
    // guid global unique identifier
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
        var issues = [];
        issues.push(issue);
        localStorage.setItem(LOCALSTORAGE_CONST.key_issues, JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem(LOCALSTORAGE_CONST.key_issues));
        issues.push(issue);
        localStorage.setItem(LOCALSTORAGE_CONST.key_issues, JSON.stringify(issues));
    }

    document.getElementById("issueInputForm").reset();

    fetchIssues();

    e.preventDefault();
}

// /**
//  * ステータスを処理中に変更します
//  * @param {*} id 
//  */
// function setStatusProcessed(id) {
//     var issues = JSON.parse(localStorage.getItem(LOCALSTORAGE_CONST.key_issues));

//     for (var i=0; i < issues.length; i++) {
//         if(issues[i].id == id) {
//             issues[i].status = ISSUE_STATUS_CONST.processed;
//         }
//     }

//     localStorage.setItem(LOCALSTORAGE_CONST.key_issues, JSON.stringify(issues));

//     fetchIssues();
// }

// /**
//  * ステータスを完了に変更します。
//  * @param {*} id 
//  */
// function setStatusClosed(id) {
//     var issues = JSON.parse(localStorage.getItem(LOCALSTORAGE_CONST.key_issues));

//     for (var i=0; i < issues.length; i++) {
//         if(issues[i].id == id) {
//             issues[i].status = ISSUE_STATUS_CONST.closed;
//         }
//     }

//     localStorage.setItem(LOCALSTORAGE_CONST.key_issues, JSON.stringify(issues));

//     fetchIssues();
// }

// /**
//  * 課題を削除します。
//  * @param {*} id 
//  */
// function deleteIssue(id) {
//     if(window.confirm("Confirm deleting the issue")) {
//         var issues = JSON.parse(localStorage.getItem(LOCALSTORAGE_CONST.key_issues));
    
//         for (var i=0; i < issues.length; i++) {
//             if(issues[i].id == id) {
//                 issues.splice(i, 1);
//             }
//         }
    
//         localStorage.setItem(LOCALSTORAGE_CONST.key_issues, JSON.stringify(issues));
    
//         fetchIssues();        
//     }
// }

// /**
//  * 課題をすべて取得します。
//  */
// function fetchIssues() {
//     var issues = JSON.parse(localStorage.getItem(LOCALSTORAGE_CONST.key_issues));
//     var issuesList = document.getElementById("issuesList");

//     issuesList.innerHTML = "";

//     for(var i=0; i < issues.length; i++) {
//         const id = issues[i].id;
//         const title = issues[i].title;
//         const description = issues[i].description;
//         const severity = issues[i].severity;
//         const assignedTo = issues[i].assignedTo;
//         const status = issues[i].status;

//         issuesList.innerHTML +=
//         `
//         <div class="well">
//             <h6>Issue ID: ${id} </h6>
//             <p><span class="label label-info">${status}</span></p>
//             <h3>${title}</h3>
//             <p><span class="glyphicon glyphicon-time"></span>${severity}</p>
//             <p><span class="glyphicon glyphicon-user"></span>${assignedTo}</p>
//             <p><span class="glyphicon glyphicon-file"></span>${description}</p>
//             <a href="#" onclick="${this.setStatusProcessed(id)}" class="btn btn-primary">Processed</a>
//             <a href="#" onclick="${this.setStatusClosed(id)}" class="btn btn-success">Close</a>
//             <a href="#" onclick="${deleteIssue(id)}" class="btn btn-danger">Delete</a>
//         </div>
//         `
//     }
// }