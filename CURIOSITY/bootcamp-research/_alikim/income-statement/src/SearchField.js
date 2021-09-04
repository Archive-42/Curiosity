import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import "./styles.css";
import IncomeContext from "./store/context";

export default function SearchField() {
  const { categories, subcategories, dispatchOption } = useContext(IncomeContext)
  const options = [
    ...categories.map(c => ({ ...c, type: "category" })),
    ...subcategories.map(s => ({ ...s, type: "subcategory" }))
  ]
  const [inputValue, setInputValue] = useState("")

  return (<>
    <Autocomplete
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Filter by category" variant="outlined" />}
      onChange={(e, val) => {
        dispatchOption(val)
      }}
      inputValue={inputValue}
      onInputChange={(e, val) => setInputValue(val)}
    />

  </>
  );
}
