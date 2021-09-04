import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import { addStatus, updateStatus } from '../../store/mainActions/statusActions'

export default function StatusForm({ id, edit, open, handleClose }) {
  const resetUniqueContent = () => console.log("No unique content to reset")

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/statuses/${id}/edit` : `/api/statuses/create`}
      creationType="status"
      actionCreator={edit ? updateStatus : addStatus}
      uniqueContent={{}}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={"span"}
    />
  </>)
}
