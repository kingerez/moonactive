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

const updateItem = (id, newAmount) => {
  const ref = itemsRef.child(id);
  return ref.update({
    amount: newAmount
  });
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
