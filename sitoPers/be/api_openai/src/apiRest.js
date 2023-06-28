const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');


const startServer = () => {

  const port = 2501;

  const app = express().use(cors()).use(bodyParser.json()).use(events());

  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });
}
startServer()