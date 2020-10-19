"use strict";

const express = require('express');
const load = require('./loaders/load');


async function startServer() {
    const app = express();
    await load(app);

    const port = process.env.PORT || 9000;
    console.log(port);
    app.listen(port, () => console.log(`Express server is listening on PORT ${port}`));
}

startServer();
