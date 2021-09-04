import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


export default function TextAreaInput({ label, value, setValue }) {

  const handleChange = (val) => setValue(val)

  return (<>
    <label>{label}
      <ReactQuill
        // theme={null}
        value={value}
        onChange={handleChange}
        className="txt"
        placeholder="Add description here..."
      />
    </label>
  </>)
}