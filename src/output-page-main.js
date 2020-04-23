import React from "react";
import "./styles/index.css";

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
        <h3>{this.props.scriptTitle}</h3>
        <div className="output_box">
          <pre>
            <code id="output_text">{this.state.code}</code>
          </pre>
        </div>
        {/* <form action="">
          <label for="os">select your operating system</label>
          <select name="os" id="os_select">
            <option value="linux">Linux</option>
            <option value="mac">MacOs</option>
            <option value="windows">Windows</option>
          </select>
        </form> */}
        <div id="instructions_box">
          {/* <h4>custom instructions based on os</h4> */}
          <ul>
            <li>But not yet!</li>
            <li>If you're on Linux(good job) run the following code block</li>
            <li>
              <div className="code_block">
                <code>
                  cd
                  <br /> cd bin
                  <br /> touch {title}
                  <br /> vi {title}
                  <br />
                </code>
              </div>
              Or If Mac Run the following
              <div className="code_block">
                <code>
                  cd
                  <br /> cd ./user/bin
                  <br /> touch {title}
                  <br /> vi {title}
                  <br />
                </code>
              </div>
            </li>
            <li>
              this will open vi a basic text editor. copy and paste your script
              above then type ":exit" the colon is important
            </li>
            <li>and now the following code block to enable your script</li>
            <li>
              <div className="code_block">
                <code>
                  chmod 755 {title} <br /> export PATH=$PATH:$HOME/bin
                </code>
              </div>
            </li>
            <li>
              and now typing the name of your script will run it everytime you
              type it
            </li>
            <li>
              if your on Windows follow the instructions at one of these two
              links then begin from he top of these instruction{" "}
              <a href="https://ubuntu.com/tutorials/tutorial-install-ubuntu-desktop#1-overview">
                option 1
              </a>{" "}
              <a href="https://www.apple.com/mac/?afid=p238%7CsI0DtcS2r-dc_mtid_1870765e38482_pcrid_427355927472_pgrid_19485452767_&cid=aos-us-kwgo-mac--slid---product-">
                option 2
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
