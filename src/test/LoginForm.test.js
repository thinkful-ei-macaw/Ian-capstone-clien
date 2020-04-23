import React from "react";

import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm.js";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <LoginForm match={{ params: { scriptId: "some script Id" } }} />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
