import { MessageType, DB_NAME, DB_VERSION, DEBUG } from "../constants.js";
import { connect, add, read } from "../connectors/indexeddb.js";

let conn;

connect(DB_NAME, DB_VERSION).then((db) => {
  conn = db;
  postMessage({ operation: MessageType.DB_READY });
});

onmessage = async (e) => {
  const { operation, data } = e.data;

  if (DEBUG) {
    console.log("to db worker", e.data);
  }

  if (operation === MessageType.ADD) {
    add(conn, data.type, data.items);
  } else if (operation === MessageType.READ) {
    postMessage({
      operation: MessageType.DATA_READY,
      data: await read(conn, data.type, data.from, data.to)
    });
  }
};
