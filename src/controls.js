import { getRange } from "./utils";
import { DEFAULT_FROM, DEFAULT_TO } from "./constants";

const populateSelector = (selector, from, to, value) => {
  const range = getRange(from, to);

  selector.innerHTML = "";

  range.forEach((item) => {
    const opt = document.createElement("option");

    opt.value = item;
    opt.innerHTML = item;
    selector.appendChild(opt);
  });

  if (typeof value !== "undefined") {
    selector.value = value;
  }
};

export const initControls = (state) => {
  const { from, to, type } = state.get();
  const fromSelector = document.getElementById("from-select");
  const toSelector = document.getElementById("to-select");

  populateSelector(fromSelector, from, to);
  populateSelector(toSelector, from, to, to);

  fromSelector.onchange = (e) => {
    state.update({ from: e.target.value });
    const { from, to } = state.get();
    populateSelector(toSelector, from, DEFAULT_TO, to);
  };

  toSelector.onchange = (e) => {
    state.update({ to: e.target.value });
    const { from, to } = state.get();
    populateSelector(fromSelector, DEFAULT_FROM, to, from);
  };

  document
    .querySelector(`.type-btn[data-type="${type}"]`)
    .classList.add("active");

  const typeButtons = document.querySelectorAll(".type-btn");

  for (let btn of typeButtons) {
    btn.addEventListener("click", () => {
      document.querySelector(".type-btn.active").classList.remove("active");
      btn.classList.add("active");
      state.update({ type: btn.getAttribute("data-type") });
    });
  }
};
