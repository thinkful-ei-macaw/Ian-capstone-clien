// REFACTOR ME !!!!!

import React from "react";
import "./styles/index.css";
export default class InputPageMain extends React.Component {
  URL = "https://ancient-plateau-66272.herokuapp.com";

  state = {
    scripts: [],
    lines: [],
    selected: "for",
    commands: [],
  };

  componentDidMount() {
    fetch(`${this.URL}/input`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ scripts: data });
      });
    //this call is grabbing for if and command objects from the api. better name than scripts would be good

    fetch(`${this.URL}/input/commands`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ commands: data });
      });
    // this call is grabbing the actual bash objects and their properties from the server

    fetch(`${this.URL}/input/${this.props.match.params.scriptId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ lines: data });
      });
  }

  findByName = (name) => {
    return this.state.commands.find((command) => command.command_name == name);
  };
  //this is here to grab the description of a command based onits name. could just return the description but figured might as well just do the object in case it needs reusing

  handleChange = (e) => {
    let { value } = e.target;
    this.setState({
      selected: value,
    });
  };
  //this is the on change function for picking between if, for and command.

  getScriptObject = (type) => {
    if (type === "command") {
      return { type: type, command: "", description: "", arg1: "" };
    }
    if (type === "If") {
      return {
        type: type,
        command: "",
        condition: "",
        description: "",
        arg1: "",
      };
    }
    if (type === "for") {
      return {
        type: type,
        command: "",
        duration: 0,
        description: "",
        arg1: "",
      };
    }
  };
  //this is to add a new line to the lines object in state and generate which format for that object to use

  generateCommandOption = (command) => {
    return (
      <option
        name={command.command_name}
        value={command.command_name}
        className="command_select"
      >
        {command.command_name}
      </option>
    );
  };

  //this just generates the actual option that goes in the select field in generate command field

  generateCommandField = (index) => {
    let lines = this.state.lines;
    return (
      <>
        <select
          type="text"
          placeholder="mv bin foo"
          onChange={(e) => {
            lines[index].command = e.target.value;
            lines[index].description = this.findByName(
              e.target.value
            ).description;
            this.setState({ lines });
          }}
          className="command_select"
        >
          <option value="" selected disabled hidden>
            pick your command here
          </option>
          {this.state.commands.map((command) => {
            return this.generateCommandOption(command);
          })}
        </select>
        <p className="command_description">
          {this.state.lines[index].description}
        </p>
        <input
          type="text"
          placeholder="put the required argument for your command here"
          onChange={(e) => {
            lines[index].arg1 = e.target.value;
            this.setState({ lines });
          }}
          className="argument"
        ></input>
      </>
    );
  };
  //this monster generates the select and input field and the onchange functions for each line in the editor. defintely needs to be chopped up

  generateScriptInputs = (script, index) => {
    let lines = this.state.lines;

    if (script.type === "command") {
      return (
        <li className="line_list_item">
          <h5 id="line_number">{`line ${index + 1}`}</h5>
          {this.generateCommandField(index)}
        </li>
        // this will probably need to be changed to a select generated from a separate module later this is temporary
      );
    }
    if (script.type === "If") {
      return (
        <li className="line_list_item">
          <h5 id="line_number">{`line ${index + 1}`}</h5>
          <p className="line_instruction">If the file below exists</p>
          <input
            type="text"
            placeholder="argument goes here"
            onChange={(e) => {
              lines[index].condition = e.target.value;
              this.setState({ lines: lines });
            }}
            className="argument"
          ></input>
          <p className="line_instruction">then</p>
          {this.generateCommandField(index)}
        </li>
        // these will also need to be modules. the argument espescially is going to be very contextual depending on what time allows to implement the command selector will likely be the same module as above
      );
    }
    if (script.type === "for") {
      return (
        <li className="line_list_item">
          <h5 id="line_number">{`line ${index + 1}`}</h5>
          <p className="line_instruction">perform this command</p>
          {this.generateCommandField(index)}
          <p className="line_instruction">this many times</p>
          <input
            type="number"
            placeholder="number of repeats here"
            onChange={(e) => {
              lines[index].duration = e.target.value;
              this.setState({ lines: lines });
            }}
            className="argument"
          ></input>
        </li>
        //the command here should be fine as the same module as the others and the number entry is ok as a simple number field unless we get to the point of working with arrays which is a far off stretch. there should be explanations on how to use the count of the loop in the command.
      );
    }
  };
  //this is the command the generates the full inputs for each line of code in the editor depending on which of the types it gets passed. this is the one that actually gets called by the render

  handlePostScript = () => {
    let lines = this.state.lines.map((script) => {
      return { ...script, script_relation: this.props.match.params.scriptId };
    });
    fetch(`${this.URL}/input`, {
      method: "POST",
      body: JSON.stringify({ lines }),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => {
      this.props.history.push(`/output/${this.props.match.params.scriptId}`);
    });
  };

  //this does the actual post. lots of complex stuff on the backend but this is just throwing the whole lines object up to the server nothing fancy

  render() {
    return (
      <div>
        <ul id="input_list">
          {this.state.lines.map((script, index) =>
            this.generateScriptInputs(script, index)
          )}
        </ul>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            let lines = this.state.lines;
            lines.push(this.getScriptObject(this.state.selected));
            this.setState({ lines });
          }}
        >
          <select className="script_type_select" onChange={this.handleChange}>
            {this.state.scripts.map((script) => {
              return (
                <option
                  name={script.script_name}
                  value={script.script_name}
                  className="script_select"
                >
                  {`${script.script_name}: ${script.description}`}
                </option>
              );
            })}
          </select>
          <label htmlFor=".script_type_select">
            pick the format for your new line here. Each format allows you to
            acomplish different things, and requires different arguments.
          </label>
          <button className="new_line_button" type="submit">
            new line
          </button>
        </form>
        <button id="make_script_button" onClick={this.handlePostScript}>
          make my script
        </button>
        <p className="path_instructions">
          A note about file paths. File paths are how your computer "thinks"
          about the files it stores. File paths look like this
          <b style={{ color: "red" }}>./</b>
          <b style={{ color: "blue" }}>example</b>
          <b style={{ color: "green" }}>/bin</b>
          <b style={{ color: "grey" }}>/foo</b>. the{" "}
          <b style={{ color: "red" }}>./</b> is the folder that your in. usually
          your main folder then the path is saying "I'm talking about the file
          called <b style={{ color: "grey" }}>foo</b> inside the folder called
          <b style={{ color: "green" }}> bin </b>
          which is itself inside the folder called{" "}
          <b style={{ color: "blue" }}>example</b>. If you want to get the file
          path easily just right click on the folder or file and select "copy
          path", then paste that into the right place.
        </p>
      </div>
    );
  }
}
