import { MessageType } from "./constants";
import { getState } from "./state";
import { initControls } from "./controls";
import { getCanvasWorker, getDbWorker } from "./workers";
import { getData } from "./api";
import "./styles.css";

const state = getState();
const canvasWorker = getCanvasWorker();
const onDataReady = (data) =>
  canvasWorker.postMessage({ operation: MessageType.DRAW, data });
const dbWorker = getDbWorker(state, getData, onDataReady);

initControls(state);
state.subscribe((updatedState) =>
  dbWorker.postMessage({ operation: MessageType.READ, data: updatedState })
);
