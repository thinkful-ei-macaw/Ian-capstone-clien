import React from "react";

import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import Header from "../header";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
