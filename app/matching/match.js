const SURVEY_LENGTH = 2;
const fsp = require('fs').promises;
const path = require('path');

module.exports = function(survey) {
    return findFriend(arrayify(survey, SURVEY_LENGTH));
}

function arrayify(obj, len) {
    const res = [];
    for (let i = 0; i < len; i++) {
        res[i] = obj[i];
    }
    return res;
}

async function findFriend(scores) {
    // read the file
    const friends = JSON.parse(await fsp.readFile(path.join(__dirname, '../data/friends.json')));

    // accumulator will be [diff, index]
    return friends[friends.reduce(function (a, friend, i) {
        const diff = friend.scores.reduce((d, q, j) => d += Math.abs(q - scores[j] || 0), 0) // diff, question, index
        if (diff < a[0]) {
            return [diff, i];
        }
        return a; // accumulator doesn't change
    }, [100, null])[1]];
}