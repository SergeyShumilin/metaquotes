import { DEBUG, MessageType } from "../constants";

export const getCanvasWorker = () => {
  const offscreenCanvas = document
    .querySelector("canvas")
    .transferControlToOffscreen();
  const canvasWorker = new Worker("src/workers/canvasWorker.js", {
    type: "module"
  });

  canvasWorker.postMessage(
    {
      operation: MessageType.SET_CANVAS,
      data: { canvas: offscreenCanvas }
    },
    [offscreenCanvas]
  );

  return canvasWorker;
};

export const getDbWorker = (state, getData, onDataReady) => {
  const dbWorker = new Worker("src/workers/dbWorker.js", { type: "module" });

  dbWorker.onmessage = async (e) => {
    const { operation, data } = e.data;

    if (DEBUG) {
      console.log("from db worker:", e.data);
    }

    if (operation === MessageType.DB_READY) {
      dbWorker.postMessage({
        operation: MessageType.READ,
        data: state.get()
      });
    } else if (operation === MessageType.DATA_READY) {
      if (data.length) {
        onDataReady(data);
      } else {
        const { type } = state.get();
        const data = await getData(type);

        dbWorker.postMessage({
          operation: MessageType.ADD,
          data: { type: type, items: data }
        });
        onDataReady(data);
      }
    }
  };
  dbWorker.onerror = (e) => console.error(e);

  return dbWorker;
};
