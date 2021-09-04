import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import { addChronicle, updateChronicle } from '../../store/mainActions/chronicleActions'

export default function ChronicleForm({ id, edit, open, handleClose }) {
  const resetUniqueContent = () => console.log("No unique content to reset")

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/chronicles/${id}/edit` : `/api/chronicles/create`}
      creationType="chronicle"
      actionCreator={edit ? updateChronicle : addChronicle}
      uniqueContent={{}}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={"span"}
    />
  </>)
}
