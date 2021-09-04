
import React, { useContext } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import IncomeContext from "./store/context"

import "./styles.css";

export default function ToggleViewButton() {
  const { dispatchToggleToMonthly, dispatchToggleToQuarterly } = useContext(IncomeContext)

  const toggleMonthly = () => dispatchToggleToMonthly()
  const toggleQuarterly= () => dispatchToggleToQuarterly()

  return (
    <ToggleButtonGroup exclusive aria-label="monthly or quartery data">
      <ToggleButton value="left" onClick={toggleMonthly} arial-label="monthly">
        Monthly
    </ToggleButton>
      <ToggleButton value="right" onClick={toggleQuarterly} arial-label="quarterly">
        Quarterly
    </ToggleButton>

    </ToggleButtonGroup>
  );
}
