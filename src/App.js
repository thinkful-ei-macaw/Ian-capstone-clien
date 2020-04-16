import React from "react";
import "./App.css";
import ErrorScreen from "./ErrorScreen";
import header from "./header.js";
import footer from "./footer.js";
import { Route, Link, BrowserRouter } from "react-router-dom";
import Context from "./Context.js";
import LandingPage from "./landing-page.js";
import InputPageMain from "./Input-Page-Main.js";
import OutputPageMain from "./output-page-main.js";
import "./styles/index.css";

const URL = "https://ancient-plateau-66272.herokuapp.com/";

class App extends React.Component {
  state = {
    newScriptName: "placeholder",
    newScriptId: 1,
  };

  handleAddScript = (history) => {
    fetch(`${URL}`, {
      method: "POST",
      body: JSON.stringify({ title: this.state.newScriptName }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((newScript) => this.setState({ newScriptId: newScript.id }))
      .then(() => {
        history.push(`/input/${this.state.newScriptId}`);
      })
      .catch();
  };

  updateScriptName = (value) => {
    this.setState({ newScriptName: value });
  };

  renderMainRoutes() {
    const contextValue = {
      context: true,
    };

    return (
      <Context.Provider value={contextValue}>
        <Route
          exact
          path="/"
          render={(rProps) => {
            return (
              <LandingPage
                {...rProps}
                scriptId={this.state.newScriptId}
                updateScriptName={this.updateScriptName}
                handleAddScript={this.handleAddScript}
              />
            );
          }}
        />

        <Route
          path="/input/:scriptId"
          render={(rProps) => {
            return (
              <InputPageMain
                {...rProps}
                scriptTitle={this.state.newScriptName}
                scriptId={this.state.newScriptId}
                key={Date.now()}
              />
            );
          }}
        />

        <Route
          path="/output/:scriptId"
          render={(rProps) => {
            return (
              <OutputPageMain
                {...rProps}
                key={Date.now()}
                scriptTitle={this.state.newScriptName}
              />
            );
          }}
        />
      </Context.Provider>
    );
  }

  render() {
    return (
      <ErrorScreen>
        <BrowserRouter>
          <header className="header" key={Date.now()}>
            {header()}
          </header>
          <main>
            {this.renderMainRoutes()}
            <div className="App"></div>
          </main>
          <footer>{footer()}</footer>
        </BrowserRouter>
      </ErrorScreen>
    );
  }
}

export default App;
