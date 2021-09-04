import React from 'react'


export default function TextInput({ label, value, setValue }) {
  const handleChange = (e) => setValue(e.target.value)

  return (
    <label className="lo-txt-con">{label}
      <input
        type="text"
        onChange={handleChange}
        value={value}
        placeholder="Untitled"
      />
    </label>
  )
}