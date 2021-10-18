let context;
let sections;
let xScale;
let yScale;

const plotData = (dataSet) => {
  context.beginPath();
  context.moveTo(0, dataSet[0]);

  for (let i = 1; i < sections; i++) {
    context.lineTo(i * xScale, dataSet[i]);
  }

  context.stroke();
};

export const init = (canvas, data) => {
  const values = data.map(({ v }) => v);
  const _max = Math.ceil(Math.max(...values));
  const max = _max + (Math.floor(_max / 5) % 5);
  const _min = Math.floor(Math.min(...values));
  const min = _min - (Math.floor(_min / 5) % 5);

  const stepSize = 5;
  const columnSize = 50;
  const rowSize = 50;
  const margin = 0;

  sections = values.length;
  context = canvas.getContext("2d");
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#0099ff";
  context.font = "20 pt Verdana";

  yScale = (canvas.height - columnSize - margin) / (max - min);
  xScale = (canvas.width - rowSize) / sections;

  context.strokeStyle = "#009933";
  context.beginPath();

  let count = 0;

  for (let scale = max; scale >= min; scale = scale - stepSize) {
    const y = columnSize + yScale * count * stepSize;
    context.fillText(scale, margin, y + margin);
    context.moveTo(rowSize, y);
    context.lineTo(canvas.width, y);
    count++;
  }

  context.stroke();

  context.translate(rowSize, canvas.height + min * yScale);
  context.scale(1, -1 * yScale);

  context.strokeStyle = "#000";
  plotData(values);
};
