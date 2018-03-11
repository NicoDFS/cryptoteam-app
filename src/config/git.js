var git = require('git-last-commit');
var fs = require('fs');

git.getLastCommit(function (err, commit) {

    let str = 'export default '

    fs.writeFile('./src/config/commit.js', str + JSON.stringify(commit.hash), (err) => {
        console.log('Commit hash written to file');
    });
});