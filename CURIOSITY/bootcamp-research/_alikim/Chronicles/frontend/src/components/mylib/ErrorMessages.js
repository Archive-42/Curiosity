import React from 'react'

export default function ErrorMessages({ errors }) {
  if (!errors.length) return null;
  
  return (
    <div className="err lo-center-h">
      <ul>
        {Object.values(errors).map(error => <li>{error}</li>)}
      </ul>
    </div>
  )
}