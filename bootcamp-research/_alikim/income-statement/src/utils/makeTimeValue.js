import React, {useContext} from "react"
import IncomeContext from "../store/context"

// Returns either prev month's value or sum of prev quarter value
export default function makeTimeValue(subcategory) {
  const { isMonthly } = useContext(IncomeContext)
  const values = subcategory.monthly_values
  if (isMonthly) return values[values.length - 1].value
  else return values.reduce((val, next) => (val + next.value), 0)
}