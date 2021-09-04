import React from 'react'


export default function SelectInput({ label, values, value, setValue }) {
  
  const handleChange = (e) => setValue(e.target.value)

  return (<>
    <label className="lo-text-con">{label}
    </label>
    <select value={value} onChange={handleChange}>
      <option value="">--</option>
      {Object.values(values).map(val => (
        <option key={val.id} value={val.id}>{val.title}</option>
      ))}
    </select>
  </>)
}