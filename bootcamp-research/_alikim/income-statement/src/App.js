import React from "react";
import IncomeStatementTable from "./IncomeStatementTable";

import { IncomeContextProvider } from "./store/context"
import ToggleViewButton from "./ToggleViewButton"
import SearchField from "./SearchField"
import "./styles.css";

export default function App() {

  return (
    <div className="App">
      <h1>Income Statement</h1>
      
      <IncomeContextProvider>
      
        <div className="options">
          <SearchField />
          <ToggleViewButton />
        </div>
        
        <hr />
        <IncomeStatementTable />

      </IncomeContextProvider>
    </div>

  );
}
