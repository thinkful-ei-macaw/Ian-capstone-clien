import React from "react";
import { Link } from "react-router-dom";

const URL = "http://localhost:8000/";

export default class LandingPage extends React.Component {
  state = {
    newScriptName: "",
  };

  handleAddScript = (name) => {
    fetch(`${URL}`, {
      method: "POST",
      body: JSON.stringify({ title: name }),
      headers: {
        "content-type": "application/json",
      },
    }).catch();
  };

  render() {
    return (
      <div>
        <div class="flex_container">
          <div name="description" id="description_box">
            <h4 id="description_header">description</h4>
            <p id="description_body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
              laborum non possimus veniam deleniti vel quidem facilis sequi,
              ipsam exercitationem cumque alias nihil porro veritatis tempora
              provident reiciendis nemo iusto. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Quod atque reprehenderit recusandae
              quaerat nobis totam! Eligendi, quibusdam doloremque earum facere
              at odit sed omnis ullam laboriosam eum dolor possimus eaque! Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Delectus
              excepturi consequatur suscipit impedit mollitia quasi, rerum
              neque, asperiores consequuntur dolor cum nisi, saepe illo unde.
              Molestias maxime at consequatur amet!
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
            onchange={(e) => {
              this.setState({ newScriptName: e.target.value });
            }}
          ></input>
          <Link to={"/input"}>
            <button
              id="start_button"
              onClick={this.handleAddScript(this.state.newScriptName)}
            >
              lets get started
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
