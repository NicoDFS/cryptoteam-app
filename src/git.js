
var git = require('git-last-commit');

var lastCommit = ""

git.getLastCommit(function (err, commit) {
    lastCommit = commit.subject;
});

export {
    lastCommit
}