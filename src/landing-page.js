import React from "react";
import { Link } from "react-router-dom";
import "./styles/landing.css";

const URL = "https://ancient-plateau-66272.herokuapp.com/";

export default class LandingPage extends React.Component {
  state = {
    newScriptName: "",
  };

  render() {
    return (
      <div>
        <div class="flex_container">
          <div name="description" id="description_box">
            <h4 id="description_header">description</h4>
            <p id="description_body">
              Hello there welcome to bashful a simple bash script generator. If
              you've never written a bash script before and are interested in
              starting to learn how this tool can help you get started.
            </p>
          </div>
          <picture id="example_box">
            <img
              src="http://via.placeholder.com/300x300"
              alt=""
              id="example_img"
            />
          </picture>
        </div>
        <form>
          <input
            type="text"
            placeholder="title here"
            onChange={(e) => {
              this.props.updateScriptName(e.target.value);
            }}
          ></input>
          <button
            id="start_button"
            onClick={(e) => {
              e.preventDefault();
              this.props.handleAddScript(this.props.history);
            }}
          >
            lets get started
          </button>
        </form>
      </div>
    );
  }
}
