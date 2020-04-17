import React from "react";
import { Link } from "react-router-dom";

export default class UserPage extends React.Component {
  state = { userScripts: [] };

  componentDidMount() {
    fetch(
      `https://ancient-plateau-66272.herokuapp.com/users/${window.localStorage.getItem(
        "userId"
      )}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ userScripts: data });
      });
  }

  render() {
    return (
      <>
        <h1>Your Scripts</h1>
        <ul>
          {this.state.userScripts.map((script) => {
            return (
              <li>
                <Link to={`/output/${script.id}`}>{script.title}</Link>
                {/* <br />
                <Link to={`/input/${script.id}`}>edit</Link> */}
                <br />
                <br />
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
