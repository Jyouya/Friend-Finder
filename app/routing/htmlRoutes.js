const path = require('path');
module.exports = function(app, express) {
    app.use(express.static(path.join(__dirname, '../public')));
    
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
}