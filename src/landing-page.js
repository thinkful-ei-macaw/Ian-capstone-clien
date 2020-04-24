import React from "react";
import "./styles/index.css";

export default class LandingPage extends React.Component {
  state = {
    newScriptName: "",
  };

  render() {
    return (
      <div>
        <div className="flex_container">
          <p className="description_body" className="landing_text">
            Hello there, welcome to bashful a simple bash script generator. If
            you've never written a bash script before and are interested in
            starting to learn how this tool can help you get started. Enter a
            title and click to get started or just scroll down to find out more
          </p>
          <img src={require("./images/UI_300.png")} alt="" id="example_img" />
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

          <div className="flex_container">
            <img
              src={require("./images/terminal_300.png")}
              alt=""
              id="example_img"
            />
            <p className="description_body" className="landing_text">
              What is Bash? Bash is the Bourne Again Shell, the terminal that
              most Unix computers use. A terminal is a way of interfacing with
              computers via text rather than graphically like you're probably
              used to. Bash can take some getting used to but once you do you'll
              find it has a lot to offer.
            </p>
          </div>
          <div className="flex_container">
            <p className="description_body" className="landing_text">
              So what are Scripts then? In the simplest terms, Bash Scripts are
              a list of bash commands you can enter all at once in by typing the
              name of the file that they're saved in. Have a task you do
              frequently the same way every time? That's a job for a bash
              script.
            </p>
            <img
              src={require("./images/script_300.png")}
              alt=""
              id="example_img"
            />
          </div>
          <div className="flex_container">
            <img src={require("./images/UI_300.png")} alt="" id="example_img" />
            <p className="landing_text">
              Well, what is Bashful then? Bashful aims to be a way for beginners
              to write their fits bash scripts with some easy to follow
              instructions and readily available explanations. As long as you
              give the commands what they need everything should run perfectly.
              We recommend as a first project writing a script that will say
              'Hello, World!' five times. Its tradition!
            </p>
          </div>
        </form>
      </div>
    );
  }
}
