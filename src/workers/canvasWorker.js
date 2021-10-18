import { MessageType, DEBUG } from "../constants.js";
import { init } from "../visualizations/canvas.js";

let canvas;

onmessage = (e) => {
  const { operation, data } = e.data;

  if (DEBUG) {
    console.log("to canvas worker:", e.data);
  }

  if (operation === MessageType.SET_CANVAS) {
    canvas = data.canvas;
  } else if (operation === MessageType.DRAW) {
    init(canvas, data);
  }
};
