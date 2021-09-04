import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//Components
import { BarGraph } from "./Graph";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  statTable: {
    display: "grid",
    gridAutoFlow: "column",
    gap: "1rem",
    justifyContent: "center",
  },
  statTable_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "8rem",

    padding: "1rem",
    border: ".05rem solid black",
    borderRadius: ".5rem",
  },
  statTable_label: {
    color: "black",
  },
  statTable_number: {
    color: "black",
  },
  chart: {
    width: "100%",
  },
}));

const initialData = [0];

const ReactionStats = (props) => {
  const classes = useStyles();
  const loadedUser = useSelector((state) => state.stats.user);
  const loadedData = loadedUser ? loadedUser.reaction : [];

  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(initialData);

  const arrSum = function (arr) {
    const num = arr.reduce(function (a, b) {
      return a + parseFloat(b);
    }, 0);
    return Number(num.toFixed(3));
  };

  const statTable = [
    {
      label: "Total Samples:",
      number: data.length,
    },
    {
      label: "Top Speed (s):",
      number: Math.min(...data),
    },
    {
      label: "Avg Speed (s):",
      number: (arrSum(data) / data.length).toFixed(3),
    },
  ];

  const incomingData = {
    display: true,
    datasets: [
      {
        label: "Speed (seconds)",
        backgroundColor: "#2a9d8f",
        pointRadius: 10,
        maxBarThickness: 100,
        data: data,
      },
    ],
  };

  useEffect(() => {
    setData(loadedData, setIsLoaded(true));
  }, [loadedData]);

  // console.log(incomingData.datasets[0].data, arrSum(data))

  return (
    isLoaded && (
      <div className={classes.root}>
        <div className={classes.statTable}>
          {statTable.map((stat, idx) => (
            <div key={idx} className={classes.statTable_container}>
              <Typography
                variant="subtitle2"
                className={classes.statTable_label}
              >
                {stat.label}
              </Typography>
              <Typography
                variant="subtitle1"
                className={classes.statTable_number}
              >
                {stat.number}
              </Typography>
            </div>
          ))}
        </div>
        <BarGraph incomingData={incomingData} />
      </div>
    )
  );
};

export default ReactionStats;
