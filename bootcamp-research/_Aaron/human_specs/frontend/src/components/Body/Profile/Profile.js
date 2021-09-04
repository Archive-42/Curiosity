import React, { useState } from "react";

//Components
import Typing from "./Typing";
import Reaction from "./Reaction";
// import Memory from './Memory';

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  chart: {
    width: "100%",
  },
}));

const panels = [
  {
    id: "typing",
    heading: "Typing Stats",
    secondaryHeading: "view your typing stats",
    component: <Typing />,
  },
  {
    id: "reaction",
    heading: "Reaction Stats",
    secondaryHeading: "view your reaction stats",
    component: <Reaction />,
  },
  // {
  //   id: 'memory',
  //   heading: 'Memory Stats',
  //   secondaryHeading: 'view your memory stats',
  //   component: <Memory />,
  // },
];

const Profile = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div className={classes.root}>
        {panels.map((panel, idx) => (
          <Accordion
            key={idx}
            expanded={expanded === panel.id}
            onChange={handleChange(panel.id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${panel.id}-content`}
              id={`${panel.id}-header`}
            >
              <Typography color="primary" className={classes.heading}>
                {panel.heading}
              </Typography>
              <Typography color="primary" className={classes.secondaryHeading}>
                {panel.secondaryHeading}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{panel.component}</AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default Profile;
