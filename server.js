const express = require('express');
const path = require('path');
const fsp = require('fs').promises;

const PORT = process.env.PORT || 3000;



const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'app/public')));

app.get('/api/friends', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/data/friends.json'));
});

require('./app/routing/apiRoutes.js')(app);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/public/index.html'));
});

//API routing


app.listen(PORT);

