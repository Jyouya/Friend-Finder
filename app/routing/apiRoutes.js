const match = require('../matching/match.js');

module.exports = function(app) {
    app.post('/api/friends', function (req, res) {
        console.log(req.body);
        match(req.body).then(
            function(friend) {
                res.json(friend);
            }
        );
    });
}

