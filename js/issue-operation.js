import { EVENT_CONST, LOCALSTORAGE_CONST, ISSUE_STATUS_CONST } from "./constants";

/**
 * ステータスを処理中に変更します
 * @param {*} id 
 */
function setStatusProcessed(id) {
    var issues = JSON.parse(localStorage.getItem(LOCALSTORAGE_CONST.key_issues));

    for (var i=0; i < issues.length; i++) {
        if(issues[i].id == id) {
            issues[i].status = ISSUE_STATUS_CONST.processed;
        }
    }

    localStorage.setItem(LOCALSTORAGE_CONST.key_issues, JSON.stringify(issues));

    fetchIssues();
}

/**
 * ステータスを完了に変更します。
 * @param {*} id 
 */
export function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem(LOCALSTORAGE_CONST.key_issues));

    for (var i=0; i < issues.length; i++) {
        if(issues[i].id == id) {
            issues[i].status = ISSUE_STATUS_CONST.closed;
        }
    }

    localStorage.setItem(LOCALSTORAGE_CONST.key_issues, JSON.stringify(issues));

    fetchIssues();
}

/**
 * 課題を削除します。
 * @param {*} id 
 */
function deleteIssue(id) {
    if(window.confirm("Confirm deleting the issue")) {
        var issues = JSON.parse(localStorage.getItem(LOCALSTORAGE_CONST.key_issues));
    
        for (var i=0; i < issues.length; i++) {
            if(issues[i].id == id) {
                issues.splice(i, 1);
            }
        }
    
        localStorage.setItem(LOCALSTORAGE_CONST.key_issues, JSON.stringify(issues));
    
        fetchIssues();        
    }
}

/**
 * 課題をすべて取得します。
 */
export function fetchIssues() {
    const issues = JSON.parse(localStorage.getItem(LOCALSTORAGE_CONST.key_issues));
    var issuesList = document.getElementById("issuesList");

    issuesList.innerHTML = "";

    if(Array.isArray(issues)) {
        console.trace(issues.length);
        for(var i=0; i < issues.length; i++) {
            const id = issues[i].id;
            const title = issues[i].title;
            const description = issues[i].description;
            const severity = issues[i].severity;
            const assignedTo = issues[i].assignedTo;
            const status = issues[i].status;

            issuesList.innerHTML +=
                `
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
                `
            document.getElementById("anchorStatusProcessed").addEventListener(EVENT_CONST.click, setStatusProcessed(id));
            document.getElementById("anchorStatusClosed").addEventListener(EVENT_CONST.click, setStatusClosed(id));
            document.getElementById("anchorDeleteIssue").addEventListener(EVENT_CONST.click, deleteIssue(id));
        }
    }
}