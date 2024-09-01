import Commit from "./Commit.js";
import Branch from "./Branch.js";

class Git {
  constructor(name) {
    this.name = name;
    this.lastCommitId = -1;
    let master = new Branch("master", null);
    this.branches = new Map([["master", master]]);
    this.HEAD = master;
  }

  commit(message) {
    const commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);
    this.HEAD.commit = commit;
    return commit;
  }

  log() {
    const history = [];
    let commit = this.HEAD.commit;

    while (commit) {
      history.push(commit);
      commit = commit.parent;
    }

    return history;
  }

  checkout(branchName) {
    if (this.branches.has(branchName)) {
      this.HEAD = this.branches.get(branchName);
    } else {
      const newBranch = new Branch(branchName, this.HEAD.commit);
      this.branches.set(branchName, newBranch);
      this.HEAD = newBranch;
    }
  }
}

export default Git;
