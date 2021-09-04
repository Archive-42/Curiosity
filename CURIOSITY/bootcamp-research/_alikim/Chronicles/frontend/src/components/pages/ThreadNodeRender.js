import React, { cloneElement } from 'react'
import {useDispatch} from 'react-redux'

import {updateSelection} from '../../store/mainActions/selectionActions'


export default function ThreadNodeRender({ id, content, data, inputs, outputs }) {
  const dispatch = useDispatch()
  const handleSelectedThread = (e) => dispatch(updateSelection("thread", data.thread))

  
  const nodeStyle = {
    width: "100px",
    height: "100px",
    // borderRadius: "10px",
    padding: "0.2rem",
    boxShadow: "0 -2px 5px lightgray",
    background: `linear-gradient(360deg, ${data.color} -20%, rgba(250,250,255,0.5) 80%)`,
    fontSize: "0.8rem",
    // border: "transparent 10px solid",
  }
  const portStyleLeft = { style: {
    zIndex: "-1",
    position: "absolute",
    top: "50%",
    left: "-0.5rem",
    width: "1rem", 
    height: "1rem", 
    borderRadius: "50%", 
    borderLeft: "0.2rem solid rgba(200,200,200,0.3)",
    backgroundColor: data.color
  } }
  
  const portStyleRight = { style: {
    zIndex: "-1",
    position: "absolute",
    top: "50%",
    right: "-0.5rem",
    width: "1rem", 
    height: "1rem", 
    borderRadius: "50%", 
    borderRight: "0.2rem solid rgba(220,220,220,0.5)",
    backgroundColor: data.color
  } }
  
  const portsStyle = { display: "flex", justifyContent: "space-between", width: "100px"}

  
  return (
    <div style={nodeStyle} onClick={handleSelectedThread}>
      <div>
      
      {/* delete button */}
        <button onClick={() => data.handleOpenDelete(id)} type="button">
          <i className="fas fa-minus-circle"></i>Delete
        </button>
        
        <button onClick={()=>data.handleOpenEdit(id)} type="button">
          <i className="fas fa-pen-alt"></i>Edit
        </button>
        
        {/* title content */}
        <div role="button" style={{ textAlign: "center" }}>
          {content}
        </div>
        
        {/* ports  */}
        <div style={portsStyle}>
          {inputs.map(port => cloneElement(port, portStyleLeft))}
          {outputs.map(port => cloneElement(port, portStyleRight))}
        </div>
      </div>
    </div>
  )
}