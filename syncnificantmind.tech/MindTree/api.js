const express = require("express");
const bodyParser = require("body-parser");
const mindControl = require("./src/core/mindControl.ms");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to create a new branch
app.post("/api/branches", (req, res) => {
  const { name } = req.body;
  try {
    const branch = mindControl.createBranch(name);
    res.status(201).json(branch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to create a new commit
app.post("/api/commits", (req, res) => {
  const { branchName, message } = req.body;
  try {
    const commit = mindControl.createCommit(branchName, message);
    res.status(201).json(commit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to list all branches
app.get("/api/branches", (req, res) => {
  const branches = mindControl.listBranches();
  res.status(200).json(branches);
});

// Endpoint to list all commits in a branch
app.get("/api/commits/:branchName", (req, res) => {
  const { branchName } = req.params;
  try {
    const commits = mindControl.listCommits(branchName);
    res.status(200).json(commits);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`MindTree API is running on http://localhost:${port}`);
});
