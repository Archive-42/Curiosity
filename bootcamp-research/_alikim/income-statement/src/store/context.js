import React, { createContext, useReducer } from 'react';
import incomeReducer, {
  setAll,
  toggleToMonthly,
  toggleToQuarterly,
  setOption,
} from './reducer'

const IncomeContext = createContext();

export function IncomeContextProvider(props) {
  const dispatchSetAll = data => dispatch(setAll(data))
  const dispatchToggleToMonthly = () => dispatch(toggleToMonthly())
  const dispatchToggleToQuarterly = () => dispatch(toggleToQuarterly())
  const dispatchOption = (option) => dispatch(setOption(option))

  const initState = {
    isMonthly: false,
    months: [],
    categories: [],
    subcategories: [],
    dispatchSetAll,
    dispatchToggleToMonthly,
    dispatchToggleToQuarterly,
    dispatchOption,
  }

  const [state, dispatch] = useReducer(incomeReducer, initState)

  return (
    <IncomeContext.Provider value={state}>
      {props.children}
    </IncomeContext.Provider>
  )
}

export default IncomeContext;
