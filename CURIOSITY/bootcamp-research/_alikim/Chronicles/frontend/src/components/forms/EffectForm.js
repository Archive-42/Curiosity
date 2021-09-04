import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import { addEffect, updateEffect } from '../../mainActions/effectActions'

export default function EffectForm({ id, edit, open, handleClose }) {
  const resetUniqueContent = () => console.log("No unique content to reset")

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/effects/${id}/edit` : `/api/chronicles/${id}/effects/create`}
      creationType="effect"
      actionCreator={edit ? updateEffect : addEffect}
      uniqueContent={{}}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={"span"}
    />
  </>)
}
