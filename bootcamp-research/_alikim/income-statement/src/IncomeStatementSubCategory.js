import React from "react";
import { TableCell, TableRow } from "@material-ui/core"
import makeTimeValue from "./utils/makeTimeValue"

import numberToDollar from "./utils/numberToDollar"

export const IncomeStatementSubCategory = ({ subcategory }) => {
  return (
    <TableRow className="IncomeContainer">
      <TableCell component="th" scope="row">{subcategory.name}</TableCell>
      <TableCell align="right">
        {numberToDollar(makeTimeValue(subcategory))}
      </TableCell>
    </TableRow>
  );
};
