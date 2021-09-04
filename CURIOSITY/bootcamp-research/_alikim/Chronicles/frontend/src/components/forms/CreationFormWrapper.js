import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessages from '../mylib/ErrorMessages'

import { getErrors, wipeErrors } from '../../store/mainActions/errorActions'
import { updateSelection } from '../../store/mainActions/selectionActions'


import FileInput from '../mylib/FileInput'
import TextInput from '../mylib/TextInput'
import TextAreaInput from '../mylib/TextAreaInput'
import ColorInput from '../mylib/ColorInput'
import IconInput from '../mylib/IconInput'

export default function CreationFormWrapper({
  open,
  handleClose,
  edit,
  path,
  creationType,
  actionCreator,
  uniqueContent,
  resetUniqueContent,
  uniqueForm: UniqueForm,
}) {
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)
  const [title, setTitle] = useState(edit ? edit.title : "")
  const [description, setDescription] = useState(edit ? edit.description : "")
  const [color, setColor] = useState(edit ? edit.color : "rgb(70,60,70)")
  const [icon, setIcon] = useState(edit ? edit.icon : `heart`)
  const [imageFile, setImageFile] = useState(edit ? edit.image : "")
  const [openIcons, setOpenIcons] = useState(false)

  const toggleIcons = (e) => setOpenIcons(!openIcons)

  const handleSelection = (selection) => {
    if (creationType === "thread") return dispatch(updateSelection(creationType, selection.thread))
    dispatch(updateSelection(creationType, selection))
    console.info("new creation selection", creationType, selection)
  }

  const resetState = () => {
    setTitle("")
    setDescription("")
    resetUniqueContent()
  }

  const handleCloseAndReset = (e) => {
    if (errors.length) dispatch(wipeErrors())
    if (!edit) {
      setTitle("")
      setDescription("")
      resetUniqueContent()
    }
    handleClose()
  }

  const submitCreation = async (e) => {
    e.preventDefault()
    if (errors.length) dispatch(wipeErrors())

    let data = new FormData()
    data.append("title", title)
    data.append("description", description)
    data.append("color", color)
    data.append("icon", icon)
    data.append("image", imageFile)
    data.append("user_file", imageFile)
    for (const contentType in uniqueContent) {
      console.log("content", contentType, uniqueContent[contentType])
      if (Array.isArray(uniqueContent[contentType])) {
        console.log("is array", uniqueContent[contentType])
        data.append(contentType, JSON.stringify(uniqueContent[contentType]))
      } else {
        data.append(contentType, uniqueContent[contentType])
      }
    }
    console.log("data", data.get("choices"))
    resetState()
    const res = await fetch(path, {
      method: edit ? "PATCH" : "POST",
      // headers: { "Content-Type": "application/json" },
      body: data,
    })
    const content = await res.json()
    if (!content.errors) {
      console.log("res content", content)
      dispatch(actionCreator(content))
      handleSelection(content)
      handleCloseAndReset()
    } else {
      console.error("ERROR!!!", content.errors)
      dispatch(getErrors(content.errors))
    }
  }

  if (!open) return null
  console.log("creationForm ping")
  return (<>
    <form method="POST" encType="multipart/form-data" onSubmit={submitCreation}>
      <h2>{edit ? `Edit ${creationType}: "${edit.title}"` : `Create a ${creationType}`}</h2>

      {/* Hides popup form on click */}

      {/* Shows error messages on failed submission */}
      <ErrorMessages errors={errors} />

      {/* Generic inputs */}
      <TextInput label="Title" value={title} setValue={setTitle} />
      <TextAreaInput label="Description" value={description} setValue={setDescription} />
      <ColorInput icon={icon} value={color} setValue={setColor} toggleIcons={toggleIcons} />
      <IconInput open={openIcons} color={color} value={icon} setValue={setIcon} />
      <FileInput file={imageFile} setFile={setImageFile} />
      <UniqueForm />

      <button className="lo-wow">
        {edit ? ` Save ` : ` Create `}
        <i className="fas fa-feather-alt"></i>
      </button>
    </form>
  </>)
}