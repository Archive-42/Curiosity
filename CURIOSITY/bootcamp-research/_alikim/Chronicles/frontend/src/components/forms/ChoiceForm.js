import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import { addChoice, updateChoice } from '../../store/mainActions/choiceActions'

export default function ChoiceForm({ id, edit, open, handleClose }) {
  const resetUniqueContent = () => console.log("No unique content to reset")

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/choices/${id}/edit` : `/api/threads/${id}/choices/create`}
      creationType="choice"
      actionCreator={edit ? updateChoice : addChoice}
      uniqueContent={{}}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={"span"}
    />
  </>)
}
