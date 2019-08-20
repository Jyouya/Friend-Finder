const express = require('express');
const path = require('path');
const fsp = require('fs').promises;

const PORT = process.env.PORT || 3000;

const SURVEY_LENGTH = 2;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'app/public')));

app.get('/api/friends', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/data/friends.json'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/public/index.html'));
});

//API routing
app.post('/api/friends', function (req, res) {
    console.log(req.body);
    findFriend(arrayify(req.body, SURVEY_LENGTH)).then(function (friend) {
        console.log(friend);
        res.json(friend);
    })
    // need to turn integer keys from req into array,
    // findFriend(arr)
    // res.json(friend);
});

function arrayify(obj, len) {
    const res = [];
    for (let i = 0; i < len; i++) {
        res[i] = obj[i];
    }
    return res;
}

app.listen(PORT);

async function findFriend(scores) {
    // read the file
    const friends = JSON.parse(await fsp.readFile(path.join(__dirname, 'app/data/friends.json')));

    // accumulator will be [diff, index]
    return friends[friends.reduce(function (a, friend, i) {
        const diff = friend.scores.reduce((d, q, j) => d += Math.abs(q - scores[j] || 0), 0) // diff, question, index
        if (diff < a[0]) {
            return [diff, i];
        }
        return a; // accumulator doesn't change
    }, [100, null])[1]];
}