import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import ErrorMessages from '../mylib/ErrorMessages'
import { TextInput, SelectInputColors, SelectInputImages } from './FormInputs'

import { getErrors, wipeErrors } from '../../store/mainActions/errorActions'
import { addEntity} from '../../store/mainActions/entityActions'
import {v4 as uuidv4} from 'uuid'


export default function PlayerCharacterForm({tid}) {
  const {cid} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)
  const user = useSelector(state => state.user)
  const [name, setName] = useState("")
  const [color, setColor] = useState("rgb(70,60,70)")
  const [image, setImage] = useState(`heart`)

  const makeCharacter = async (e) => {
    e.preventDefault()
    if (errors.length) dispatch(wipeErrors())
    if (user.id) {
      const res = await fetch(`/api/chronicles/${cid}/player/${user.id}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: name, color, image, }),
      })
      const content = await res.json()
      dispatch(addEntity(content))
    } else {
      dispatch(addEntity({
        assets: [],
        chronicle_id: cid,
        color,
        created_at: new Date(),
        description: "",
        image,
        is_unique: true,
        meters: [],
        subtype: "",
        title: name,
        type: "character",
        id: uuidv4(),
      }))
    }
    history.push(`/chronicles/${cid}/tales/${tid}`)
}

return (<>
  <form onSubmit={makeCharacter}>

    {/* Shows error messages on failed submission */}
    <ErrorMessages errors={errors} />

    {/* Generic inputs */}
    <TextInput label="Name" value={name} setValue={setName} />
    <SelectInputColors image={image} value={color} setValue={setColor} />
    <SelectInputImages color={color} value={image} setValue={setImage} />

    <button className="lo-wow">
      Start <i className="fa-xs fas fa-arrow-right"></i>
    </button>
  </form>
</>)
}