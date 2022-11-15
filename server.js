const express = require('express');
const server = express();
require('dotenv').config();

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`[PORT:${port}] | The server is up and running...`);
});
