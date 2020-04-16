import React from "react";
import { Link } from "react-router-dom";

export default function header() {
  return (
    <div>
      <header>
        <Link to="/">
          <h1>bash generator</h1>
        </Link>
      </header>
    </div>
  );
}
