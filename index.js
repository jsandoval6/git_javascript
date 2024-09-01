import Git from "./git/index.js";

// Maps the array of commits into a string of commit ids.
// For [C2, C1,C3], it returns "2-1-0"
function historyToIdMapper(history) {
  var ids = history.map(function (commit) {
    return commit.id;
  });
  return ids.join("-");
}

function main() {
  console.log("3. Branches test");

  var repo = new Git("test");
  repo.commit("Initial commit");
  repo.commit("Change 1");

  console.assert(historyToIdMapper(repo.log()) === "1-0"); // Should show 2 commits.

  repo.checkout("testing");
  repo.commit("Change 3");

  console.assert(historyToIdMapper(repo.log()) === "2-1-0"); // Should show 3 commits.

  repo.checkout("master");
  console.assert(historyToIdMapper(repo.log()) === "1-0"); // Should show 2 commits. Master unpolluted.

  repo.commit("Change 3");
  console.assert(historyToIdMapper(repo.log()) === "3-1-0");
}

main();
