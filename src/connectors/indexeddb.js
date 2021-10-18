import { DataType, KEY_PATH } from "../constants.js";

export const connect = (dbName, dbVersion) => {
  const request = indexedDB.open(dbName, dbVersion);

  return new Promise((resolve) => {
    request.onsuccess = (event) => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      Object.values(DataType).forEach((name) =>
        db.createObjectStore(name, { keyPath: KEY_PATH })
      );
    };
  });
};

export const add = (db, type, data) => {
  const request = db.transaction([type], "readwrite").objectStore(type);

  data.forEach((item) => request.add(item));
};

export const read = (db, type, from, to) => {
  const objectStore = db.transaction(type).objectStore(type);
  const range = IDBKeyRange.bound(`${from}-01-01`, `${to}-12-31`);

  return new Promise((resolve) => {
    const data = [];

    objectStore.openCursor(range).onsuccess = (event) => {
      const cursor = event.target.result;

      if (cursor) {
        data.push(cursor.value);
        cursor.continue();
      } else {
        resolve(data);
      }
    };
  });
};
