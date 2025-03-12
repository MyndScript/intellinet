// Core functionality for MindTree

class MindControl {
    constructor() {
        this.branches = [];
        this.commits = [];
    }

    createBranch(name) {
        const branch = { name, commits: [] };
        this.branches.push(branch);
        return branch;
    }

    createCommit(branchName, message) {
        const branch = this.branches.find(b => b.name === branchName);
        if (!branch) throw new Error(`Branch ${branchName} not found`);
        const commit = { message, timestamp: new Date() };
        branch.commits.push(commit);
        this.commits.push(commit);
        return commit;
    }

    listBranches() {
        return this.branches.map(b => b.name);
    }

    listCommits(branchName) {
        const branch = this.branches.find(b => b.name === branchName);
        if (!branch) throw new Error(`Branch ${branchName} not found`);
        return branch.commits;
    }
}

const mindControl = new MindControl();

// Export the instance for use in other modules
export default mindControl;
