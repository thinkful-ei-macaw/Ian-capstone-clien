import React from "react";

export default class InputPageMain extends React.Component {
  URL = "http://localhost:8000/";

  state = {
    scripts: [],
    activeScripts: [],
    selected: "command",
  };
  componentDidMount() {
    fetch(`http://localhost:8000/input`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ scripts: data });
      });
  }

  findById = (id) => {
    this.state.scripts.find((script) => script.id === id);
  };

  handleChange = (e) => {
    let { value } = e.target;
    this.setState({
      selected: value,
    });
  };

  getScriptObject = (type) => {
    if (type === "command") {
      return { type: type, command: "" };
    }
    if (type === "if") {
      return { type: type, command: "", condition: "" };
    }
    if (type === "for") {
      return { type: type, command: "", duration: 0 };
    }
  };

  generateScriptInputs = (script, index) => {
    let activeScripts = this.state.activeScripts;
    if (script.type === "command") {
      return (
        <li>
          <input
            type="text"
            placeholder="mv bin foo"
            onChange={(e) => {
              activeScripts[index].command = e.target.value;
              this.setState({ activeScripts: activeScripts });
            }}
          ></input>
        </li>
        // this will probably need to be changed to a select generated from a separate module later this is temporary
      );
    }
    if (script.type === "if") {
      return (
        <li>
          <input
            type="text"
            placeholder="argument goes here"
            onChange={(e) => {
              activeScripts[index].condition = e.target.value;
              this.setState({ activeScripts: activeScripts });
              console.log(this.state.activeScripts);
            }}
          ></input>
          <p>then</p>
          <input
            type="text"
            placeholder="command to be executed goes here"
            onChange={(e) => {
              activeScripts[index].command = e.target.value;
              this.setState({ activeScripts: activeScripts });
              console.log(this.state.activeScripts);
            }}
          ></input>
        </li>
        // these will also need to be modules. the argument espescially is going to be very contextual depending on what time allows to implement the command selector will likely be the same module as above
      );
    }
    if (script.type === "for") {
      return (
        <li>
          <p>perform this command</p>
          <input
            type="text"
            placeholder="command here"
            onChange={(e) => {
              activeScripts[index].command = e.target.value;
              this.setState({ activeScripts: activeScripts });
            }}
          ></input>
          <input
            type="number"
            placeholder="duration here"
            onChange={(e) => {
              activeScripts[index].duration = e.target.value;
              this.setState({ activeScripts: activeScripts });
            }}
          ></input>
          <p>times</p>
        </li>
        //the command here should be fine as the same module as the others and the number entry is ok as a simple number field unless we get to the point of working with arrays which is a far off stretch. there should be explanations on how to use the count of the loop in the command.
      );
    }
  };

  handlePostScript = () => {
    let activeScripts = this.state.activeScripts.map((script) => {
      return { ...script, script_relation: this.props.scriptId };
    });
    console.log(this.state.activeScripts);
    fetch(`http://localhost:8000/input`, {
      method: "POST",
      body: JSON.stringify({ activeScripts }),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => console.log(res.json()));
  };

  render() {
    return (
      <div>
        <ul id="input_list">
          {this.state.activeScripts.map((script, index) =>
            this.generateScriptInputs(script, index)
          )}
        </ul>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            let activeScripts = this.state.activeScripts;
            activeScripts.push(this.getScriptObject(this.state.selected));
            this.setState({ activeScripts: activeScripts });
          }}
        >
          <select onChange={this.handleChange}>
            {this.state.scripts.map((script) => {
              return (
                <option
                  name={script.script_name}
                  value={script.name}
                  className="script_select"
                >
                  {script.script_name}
                </option>
              );
            })}
          </select>
          <button type="submit">new line</button>
        </form>
        <button onClick={this.handlePostScript}></button>
      </div>
    );
  }
}
