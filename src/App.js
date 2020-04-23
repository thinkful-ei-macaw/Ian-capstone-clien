import React from "react";
import "./App.css";
import ErrorScreen from "./ErrorScreen";
import Header from "./header.js";
import footer from "./footer.js";
import { Route, BrowserRouter } from "react-router-dom";
import Context from "./Context.js";
import LandingPage from "./landing-page.js";
import InputPageMain from "./Input-Page-Main.js";
import OutputPageMain from "./output-page-main.js";
import "./styles/index.css";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicOnlyRoute from "./Utils/PublicOnlyRoute";
import LoginPage from "./routes/LoginPage";
import RegistrationPage from "./routes/RegistrationPage";
import UserPage from "./UserPage";

const URL = "https://ancient-plateau-66272.herokuapp.com";

class App extends React.Component {
  state = {
    newScriptName: "placeholder",
    newScriptId: 1,
    author_id: null,
  };

  handleAddScript = (history) => {
    fetch(`${URL}`, {
      method: "POST",
      body: JSON.stringify({
        title: this.state.newScriptName,
        author_id: window.localStorage.getItem("userId"),
      }),

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
  setAuthorId = (author_id) => {
    console.log(author_id);
    this.setState({ author_id: author_id });
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
        <Route
          path="user/:userId"
          render={() => {
            return <UserPage />;
          }}
        />
      </Context.Provider>
    );
  }

  render() {
    this.userId = Number(window.localStorage.userId);
    return (
      <ErrorScreen>
        <BrowserRouter>
          <header>
            <Header></Header>
          </header>
          <main>
            <PublicOnlyRoute
              path={"/login"}
              component={LoginPage}
              setAuthorId={this.setAuthorId}
            />

            <PublicOnlyRoute path={"/register"} component={RegistrationPage} />
            <PrivateRoute path={"/user/:userId"} component={UserPage} />
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
