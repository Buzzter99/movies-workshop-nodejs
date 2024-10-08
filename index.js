const express = require('express');
const app = express();
const {expressConfig} = require('./expressconfig');
const {hbsConfig} = require('./hbsconfig');
const {router} = require('./routes');
const dbConnection = require('./db/db');
const port = 3000;
dbConnection.OpenDbConnection()
expressConfig(app);
hbsConfig(app);
app.use(router);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

