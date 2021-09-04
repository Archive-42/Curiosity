import React from "react";

//MUI
import Button from "@material-ui/core/Button";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Typography, Link } from "@material-ui/core";

const Footer = (props) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Typography color="primary">Aaron Hanson</Typography>
        <Typography color="primary">
          <Link href="https://github.com/ahan8927">Github</Link>
        </Typography>
        <Typography color="primary">
          <Link href="https://www.linkedin.com/in/aaron-hanson-brb/">
            LinkedIn
          </Link>
        </Typography>
      </div>
      <div>
        <ErrorOutlineIcon color="primary" />
        <Typography color="primary">Cloned Application!</Typography>
        <Typography color="primary">
          Inspiration taken from{" "}
          <Link href="https://github.com/Miodec">Miodec</Link>
        </Typography>
        <Typography color="primary">
          and <Link href="https://humanbenchmark.com/">Human Benchmark</Link>
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
