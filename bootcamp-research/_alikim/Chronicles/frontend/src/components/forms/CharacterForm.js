import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import { addEntity, updateEntity } from '../../store/mainActions/entityActions'

export default function CharacterForm({ id, edit, open, handleClose }) {
  
  const resetUniqueContent = () => console.log("No unique content to reset")

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/entities/${id}/edit` : `/api/entities/character/create`}
      creationType="character"
      actionCreator={edit ? updateEntity : addEntity}
      uniqueContent={{}}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={"span"}
    />
  </>)
}
