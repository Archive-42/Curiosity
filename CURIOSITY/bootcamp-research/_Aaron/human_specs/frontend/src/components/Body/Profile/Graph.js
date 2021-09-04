import React from "react";
import { Scatter, Bar } from "react-chartjs-2";

//MUI
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const ScatterGraph = (props) => {
  const classes = useStyles();

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
  };

  return (
    <div className={classes.root}>
      <Scatter
        data={props.incomingData}
        options={({ maintainAspectRatio: false }, options)}
      />
    </div>
  );
};

export const BarGraph = (props) => {
  const classes = useStyles();

  console.log(props.incomingData);

  // const options = {
  //   scales: {
  //     yAxes: [{
  //       display: true,
  //       ticks: {
  //         beginAtZero: true,
  //       }
  //     }],
  //     xAxes: [{
  //       display: false,
  //       gridLines: {
  //         display: false,
  //         drawBorder: false
  //       }
  //     }]
  //   },
  //   legend: {
  //     display: false
  //   },
  // }

  const options = {
    scales: {
      xAxes: [
        {
          gridLines: {
            offsetGridLines: true,
          },
        },
      ],
    },
  };

  return (
    <div className={classes.root}>
      <Bar
        data={props.incomingData}
        options={({ maintainAspectRatio: false }, options)}
      />
    </div>
  );
};
