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
      const items = await database.getItems();
      const item = items[id];
      if(item.amount < item.limit) {
        database.updateItem(id, item.amount + 1);
      }
    });

    socket.on('resetData', () => {
      database.resetItems();
    });
  });
};

module.exports = {
  init,
};
