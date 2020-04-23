import React from "react";

import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import Output from "../output-page-main.js";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <Output
        scriptTitle={""}
        match={{ params: { scriptId: "some script Id" } }}
      />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
