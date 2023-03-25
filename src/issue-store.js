export const findAll = () => {
  const maybeIssues = JSON.parse(localStorage.getItem("issues"));
  return maybeIssues ? maybeIssues : []
};

export const saveAll = (issues) => {
  localStorage.setItem("issues", JSON.stringify(issues));
};

export const save = (issue) => {
  const issues = findAll()
  issues.push(issue)
  saveAll(issues)
}
