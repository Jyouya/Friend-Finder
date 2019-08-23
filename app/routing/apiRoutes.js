const match = require('../matching/match.js');
const path = require('path');

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.sendFile(path.join(__dirname, 'app/data/friends.json'));
    });

    app.post('/api/friends', function (req, res) {
        console.log(req.body);
        match(req.body).then(function (friend) {
            res.json(friend);
        });
    });

}

