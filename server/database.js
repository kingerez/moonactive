const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const defaultData = require('./defaultData.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://moonactive-74fcd-default-rtdb.europe-west1.firebasedatabase.app'
});

const db = admin.database();
const itemsRef = db.ref('items');

const updateListeners = [];
const itemUpdates = [];
let isUpdating = false;

itemsRef.on('child_changed', async snapshot => {
  const id = snapshot.key;
  const item = snapshot.val();
  
  updateListeners.forEach(callback => {
    typeof callback === 'function' && callback(item, id);
  })
});

const getItems = async () => {
  const snapshot = await itemsRef.once('value');
  return snapshot.val();
};

const updateItem = async (id) => {
  itemUpdates.push({id});

  if(!isUpdating) {
    isUpdating = true;
    while(itemUpdates.length > 0) {
      console.log(itemUpdates);
      const itemToUpdate = itemUpdates.shift();

      const items = await getItems();
      const itemFromDB = items[itemToUpdate.id];

      if(itemFromDB.amount < itemFromDB.limit) {
        const ref = itemsRef.child(itemToUpdate.id);
        await ref.update({
          amount: itemFromDB.amount + 1
        });
      }
    }

    isUpdating = false;
  }
};

const resetItems = async () => {
  await itemsRef.set(defaultData.items);
  return getItems();
};

const addUpdateListener = (callback) => {
  updateListeners.push(callback);
};

module.exports = {
  getItems,
  updateItem,
  resetItems,
  addUpdateListener,
};
