import React from "react";
import { Link } from "react-router-dom";
import "./styles/index.css";

const URL = "https://ancient-plateau-66272.herokuapp.com/";

export default class LandingPage extends React.Component {
  state = {
    newScriptName: "",
  };

  render() {
    return (
      <div>
        <div class="flex_container">
          <p id="description_body" className="landing_text">
            Hello there welcome to bashful a simple bash script generator. If
            you've never written a bash script before and are interested in
            starting to learn how this tool can help you get started. Click to
            get started or just scroll down to find out more
          </p>
          <img
            src="http://via.placeholder.com/300x300"
            alt=""
            id="example_img"
          />
        </div>
        <form>
          <input
            id="title_input"
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
