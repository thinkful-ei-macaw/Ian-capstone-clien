import React from "react";

export default function footer() {
  return (
    <div>
      <p id="footer_content">
        © Ian Drews 2020{" "}
        <a
          href="https://www.linkedin.com/in/ian-drews-2a757b19b/"
          target="_blank"
          className="contact"
        >
          LinkedIn
        </a>{" "}
        <a
          href="https://github.com/MediocreIan"
          target="_blank"
          className="contact"
        >
          GitHub
        </a>
      </p>
    </div>
  );
}
