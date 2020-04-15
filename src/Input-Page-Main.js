import React from "react";
import { Link } from "react-router-dom";
import "./styles/input.css";
export default class InputPageMain extends React.Component {
  URL = "http://localhost:8000/";

  state = {
    scripts: [],
    lines: [],
    selected: "for",
    commands: [],
  };

  componentDidMount() {
    fetch(`http://localhost:8000/input`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ scripts: data });
      });

    fetch(`http://localhost:8000/input/commands`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ commands: data });
      });
  }

  findByName = (name) => {
    return this.state.commands.find((command) => command.command_name == name);
  };

  handleChange = (e) => {
    let { value } = e.target;
    this.setState({
      selected: value,
    });
  };

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
        >
          <option value="null" selected>
            pick your command here
          </option>
          {this.state.commands.map((command) => {
            return this.generateCommandOption(command);
          })}
        </select>
        <p>{this.state.lines[index].description}</p>
        <input
          type="text"
          placeholder="put the required argument for your command here"
          onChange={(e) => {
            lines[index].arg1 = e.target.value;
            {
              this.setState({ lines });
            }
          }}
        ></input>
      </>
    );
  };

  generateScriptInputs = (script, index) => {
    let lines = this.state.lines;

    if (script.type === "command") {
      return (
        <li>{this.generateCommandField(index)}</li>
        // this will probably need to be changed to a select generated from a separate module later this is temporary
      );
    }
    if (script.type === "If") {
      return (
        <li>
          <input
            type="text"
            placeholder="argument goes here"
            onChange={(e) => {
              lines[index].condition = e.target.value;
              this.setState({ lines: lines });
              console.log(this.state.lines);
            }}
          ></input>
          <p>then</p>
          {this.generateCommandField(index)}
        </li>
        // these will also need to be modules. the argument espescially is going to be very contextual depending on what time allows to implement the command selector will likely be the same module as above
      );
    }
    if (script.type === "for") {
      return (
        <li>
          <p>perform this command</p>
          {this.generateCommandField(index)}
          <input
            type="number"
            placeholder="duration here"
            onChange={(e) => {
              lines[index].duration = e.target.value;
              this.setState({ lines: lines });
            }}
          ></input>
          <p>this many times</p>
        </li>
        //the command here should be fine as the same module as the others and the number entry is ok as a simple number field unless we get to the point of working with arrays which is a far off stretch. there should be explanations on how to use the count of the loop in the command.
      );
    }
  };

  handlePostScript = () => {
    let lines = this.state.lines.map((script) => {
      return { ...script, script_relation: this.props.scriptId };
    });
    console.log(this.state.lines);
    fetch(`http://localhost:8000/input`, {
      method: "POST",
      body: JSON.stringify({ lines }),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => console.log(res.json()));
  };

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
          <select onChange={this.handleChange}>
            {this.state.scripts.map((script) => {
              return (
                <option
                  name={script.script_name}
                  value={script.script_name}
                  className="script_select"
                >
                  {script.script_name}
                </option>
              );
            })}
          </select>
          <button type="submit">new line</button>
        </form>
        <Link to={`/output/${this.props.scriptId}`}>
          <button onClick={this.handlePostScript}></button>
        </Link>
      </div>
    );
  }
}
