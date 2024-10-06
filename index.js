const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const {expressConfig} = require('./expressconfig');
const {hbsConfig} = require('./hbsconfig');
const {router} = require('./routes');
const dbConnection = require('./db/db');
const {authenticationMiddleware} = require('./middlewares/authenticationMiddleware');
const port = 3000;
dbConnection.OpenDbConnection()
expressConfig(app);
hbsConfig(app);
app.use(cookieParser());
app.use(authenticationMiddleware);
app.use(router);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

