const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app, express);

app.listen(PORT);

