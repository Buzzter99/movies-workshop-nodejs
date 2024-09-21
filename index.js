const express = require('express');
const app = express();
const {expressConfig} = require('./expressconfig');
const {hbsConfig} = require('./hbsconfig');
const {router} = require('./routes');
const port = 3000;
expressConfig(app);
hbsConfig(app);
app.use(router);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});