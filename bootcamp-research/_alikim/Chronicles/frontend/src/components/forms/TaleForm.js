import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'


import { addTale, updateTale } from '../../store/mainActions/taleActions'

export default function TaleForm({ id, edit, open, handleClose }) {
  const resetUniqueContent = () => console.log("No unique content to reset")

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/tales/${id}/edit` : `/api/chronicles/${id}/tales/create`}
      creationType="tale"
      actionCreator={edit ? updateTale : addTale}
      uniqueContent={{}}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={"span"}
    />
  </>)
}
