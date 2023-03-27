const express = require('express');
const http = require('http');
const cors = require('cors');
const socket = require('./socket');

const app = express();
const port = 3080;
const server = http.createServer(app);
socket.init(server);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Yo!');
});

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`); // eslint-disable-line
});