const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.static(path.join(__dirname, 'app/public')));

app.get('/friends', function(req, res) {
    res.json(path.join(__dirname, 'app/data/friends.json'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'app/public/index.html'));
});

//API routing
app.post('/friends')

app.listen(PORT);