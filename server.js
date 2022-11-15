const express = require('express');
const server = express();
const config = require('config');

const port = config.get('PORT') || 5000;
server.listen(port, () => {
  console.log(`[PORT:${port}] | The server is up and running...`);
});
