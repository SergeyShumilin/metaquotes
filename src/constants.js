export const MessageType = {
  DB_READY: "DB_READY",
  ADD: "ADD",
  READ: "READ",
  DATA_READY: "DATA_READY",
  SET_CANVAS: "SET_CANVAS",
  DRAW: "DRAW"
};

export const DEFAULT_FROM = 1881;
export const DEFAULT_TO = 2006;

export const DB_NAME = "metaquotes";
export const DB_VERSION = 2;
export const KEY_PATH = "t";

export const DataType = {
  PRECIPITATION: "precipitation",
  TEMPERATURE: "temperature"
};

export const DEFAULT_DATA_TYPE = DataType.TEMPERATURE;

export const DEBOUNCE_TIME = 500;

export const DEBUG = false;

export const API_URL = "src/data";
