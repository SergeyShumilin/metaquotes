import {
  DEFAULT_FROM,
  DEFAULT_TO,
  DEFAULT_DATA_TYPE,
  DEBOUNCE_TIME
} from "./constants";

export const getState = () => {
  const subscribers = [];
  let _state = {
    from: DEFAULT_FROM,
    to: DEFAULT_TO,
    type: DEFAULT_DATA_TYPE
  };
  let timeout;
  const onChange = () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      subscribers.forEach((sub) => sub(_state));
    }, DEBOUNCE_TIME);
  };

  return {
    get: () => _state,
    update: (data) => {
      _state = { ..._state, ...data };
      onChange();
    },
    subscribe: (sub) => subscribers.push(sub)
  };
};
