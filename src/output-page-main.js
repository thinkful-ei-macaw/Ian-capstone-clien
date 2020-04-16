import React from "react";
import "./styles/output.css";

export default class OutputPageMain extends React.Component {
  state = {
    code: "",
    mounted: 0,
  };

  componentDidMount() {
    const { scriptId } = this.props.match.params;
    fetch(`https://ancient-plateau-66272.herokuapp.com/output/${scriptId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ code: data });
      });
  }

  render() {
    const key = this.props.key;
    console.log(key);
    // this is making the page remount by checking the time. maybe find another solution
    let title = this.props.scriptTitle.replace(/ /g, "_");
    return (
      <div>
        <h3>your script</h3>
        <div className="output_box">
          <pre>
            <code id="output_text">{this.state.code}</code>
          </pre>
        </div>
        <form action="">
          <label for="os">select your operating system</label>
          <select name="os" id="os_select">
            <option value="linux">Linux</option>
            <option value="mac">MacOs</option>
            <option value="windows">Windows</option>
          </select>
        </form>
        <div id="instructions_box">
          <h4>custom instructions based on os</h4>
          <ul>
            <li>But not yet!</li>
            <li>
              Thanks for testing{" "}
              <p style={{ color: "red" }}>
                There isnt checking that nothing harmful can be done happening
                yet. you can fuck up your config files and stuff with this just
                like regular bash right now
              </p>
              . If you're on Linux(good job) just move straight to the next code
              block. if your on mac just run <code>mkdir bin</code> in your home
              directory first.
            </li>
            <li>
              <code>
                cd
                <br /> cd bin
                <br /> touch {title}
                <br /> vi {title}
                <br />
              </code>
            </li>
            <li>
              this will open vi a basic lil text editor. copy and paste your
              script above then type ":exit" the colon is important
            </li>
            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
            <li>and now the following code block to enable your script</li>
            <li>
              <code>
                chmod 755 {title} <br /> export PATH=$PATH:$HOME/bin
              </code>
            </li>
            <li>
              and now typing the name of your script will run it everytime you
              type it
            </li>
            <li>
              if your on Windows then I dont have instructions for you yet. its
              way more complicated on wisndows, sorry. but thanks for testing
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
