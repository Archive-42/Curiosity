import React from "react";

const Footer = () => {
  return (
    <footer
      className="Footer"
      style={{
        width: "100%",
        backgroundColor: "var(--dark-blue)",
        padding: "1rem 2rem",
        boxSizing: "border-box",
      }}
    >
      <p
        style={{
          textAlign: "center",
          color: "var(--light-blue)",
          fontSize: 16,
        }}
      >
        Made in the 🏔 by{" "}
        <a
          href="juliarichards.io"
          style={{
            color: "var(--light-blue)",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Julia Richards
        </a>
      </p>
      <div
        style={{
          fontSize: 16,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <a href="https://github.com/julia-richards">
          <i
            style={{ color: "var(--light-blue)", margin: "0 10px" }}
            className="fab fa-github"
          ></i>
        </a>
        <a href="https://www.linkedin.com/in/julia-richards-09b5b1b0/">
          <i
            style={{ color: "var(--light-blue)", margin: "0 10px" }}
            className="fab fa-linkedin"
          ></i>
        </a>
        <a href="https://angel.co/u/julia-richards-2">
          <i
            style={{ color: "var(--light-blue)", margin: "0 10px" }}
            className="fab fa-angellist"
          ></i>
        </a>
      </div>
      <p
        style={{
          textAlign: "center",
          color: "var(--light-blue)",
          fontSize: 9,
        }}
      >
        All rights reserved {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
