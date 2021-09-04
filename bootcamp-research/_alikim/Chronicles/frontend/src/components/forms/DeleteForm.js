import React, {useState} from 'react'
import {useDispatch} from 'react-redux'

export default function DeleteForm({open, handleClose, creation, creationType, deleteActionCreator}) {
  const dispatch = useDispatch()
  
  const handleDelete = async (e) => {
    console.log("heard delete", creation)
    e.preventDefault()
    const res = await fetch(`/api/${creationType}s/${creation.id}/delete`, { method: "DELETE" })
    if (res.ok) {
      console.log("ok!", res)
      dispatch(deleteActionCreator(creation))
      handleClose()
    } else {
      console.error(`failed to delete ${creation}...`, res)
    }
  }
  
  if (!open) return null
  console.log("heard open delete", creation)
  return (<>
    <form>
      <h3 className="lo-txt-con">Delete {creationType}: "{creation.title}"?</h3>
      <strong>Are you SURE you want to permanently delete the {creationType} "{creation.title}" and everything that depends on it? D:</strong>
      <button type="button" onClick={handleClose} className="lo-wow">Cancel</button>
      <button onClick={handleDelete} className="lo-wow">Delete <i className="fas fa-trash-alt"></i></button>
    </form>
  </>)
}