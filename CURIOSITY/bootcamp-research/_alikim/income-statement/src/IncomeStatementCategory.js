import React, { useState, useContext } from "react";
import { TableCell, TableRow, Button } from "@material-ui/core"

import IncomeContext from "./store/context"
import { IncomeStatementSubCategory } from "./IncomeStatementSubCategory"
import numberToDollar from "./utils/numberToDollar"


export const IncomeStatementCategory = ({ category }) => {
  const { subcategories, option } = useContext(IncomeContext)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const collapse = () => setIsCollapsed(!isCollapsed)
  return (<>
    <TableRow >
      <TableCell colSpan={2} component="th">
        <Button onClick={collapse}>{category.name}</Button>
      </TableCell>
    </TableRow>

    {isCollapsed ? null : <>
      {(!option || option.type === "category") &&
        category.subcategory_ids.map(scid => (
          <IncomeStatementSubCategory
            key={scid}
            subcategory={subcategories[scid]}
          />
        ))}

      {option && option.type === "subcategory" && (
        <IncomeStatementSubCategory subcategory={option} />
      )}

      <TableRow>
        <TableCell>Total: </TableCell>
        <TableCell align="right">{numberToDollar(category.total)}</TableCell>
      </TableRow>
    </>}
  </>);
};
