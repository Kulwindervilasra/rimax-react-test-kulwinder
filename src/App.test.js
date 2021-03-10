import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
global.MutationObserver = class {
  constructor(callback) { }
  disconnect() { }
  observe(element, initObject) { }
};
test("Render App js", () => {
  const { getAllByText } = render(<App />);
  const linkElement = getAllByText(/Login/i);
  expect(linkElement).toBeTruthy();
});
