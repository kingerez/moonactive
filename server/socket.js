const { Server } = require('socket.io');
const database = require('./database');

let io;

const init =(server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  database.addUpdateListener((item, id) => {
    io.emit('itemUpdated', item, id);
  });

  io.on('connection', (socket) => {
    socket.on('getItems', async callback => {
      const items = await database.getItems();
      callback(items);
    });

    socket.on('updateItem', async (id) => {
      database.updateItem(id);
    });

    socket.on('resetData', () => {
      database.resetItems();
    });
  });
};

module.exports = {
  init,
};
