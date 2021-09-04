import React, { useContext, useEffect } from "react";

import { getIncomeStatement } from "./apiMock";
import { IncomeStatementCategory } from "./IncomeStatementCategory";
import IncomeContext from "./store/context";
import makeTimeHead from "./utils/makeTimeHead"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

// An input field for a search/filter. This statement list can be 100+ items,
// a user might want to filter out the results across category / sub category 
// by typing in the field.



export default function IncomeStatementTable() {
  const { dispatchSetAll, isMonthly, categories, option } = useContext(IncomeContext)
  
  useEffect(() => {
    if (dispatchSetAll) {
      getIncomeStatement().then((response) => {
        dispatchSetAll(response);
      });
    }
  }, [])
  
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">

        <TableHead>
          <TableRow>
          
            <TableCell component="th">
            {isMonthly ? "MONTH" : "QUARTER"}
          </TableCell>
          
            <TableCell component="th" align="right">
              {makeTimeHead()}
            </TableCell>
            
          </TableRow>
        </TableHead>


        <TableBody>
          {!option && categories.map((category, i) => (
            <IncomeStatementCategory key={i} category={category} />
          ))}
          {option && option.type === "category" && (
            <IncomeStatementCategory category={option} />
          )}
          {option && option.type === "subcategory" && (
            <IncomeStatementCategory category={categories[option.category_id]} />
          )}
        </TableBody>

      </Table>
    </TableContainer>
  );
}
