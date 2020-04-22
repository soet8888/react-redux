import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import { cardStyle as styles } from "./style";

const useStyles = makeStyles(styles);

export default function Card(props) {
  const classes = useStyles();
  const { onClick, className, children, plain, profile, chart, ...rest } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [className]: className !== undefined
  });
  return (
    <div onClick={onClick} className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

Card.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  chart: PropTypes.bool,
  children: PropTypes.node
};
