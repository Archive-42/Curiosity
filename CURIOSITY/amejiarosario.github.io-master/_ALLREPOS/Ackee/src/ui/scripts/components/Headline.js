import { createElement as h } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Headline = (props) => {
  return h(
    props.type,
    {
      className: classNames(
        {
          headline: true,
          "headline--small": props.small === true,
        },
        props.className
      ),
    },
    props.children
  );
};

Headline.propTypes = {
  type: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]).isRequired,
  small: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Headline;
