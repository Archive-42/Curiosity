import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import { addLock, updateLock } from '../../store/mainActions/lockActions'

export default function LockForm({ id, edit, open, handleClose }) {
  const resetUniqueContent = () => console.log("No unique content to reset")

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/locks/${id}/edit` : `/api/chronicles/${id}/locks/create`}
      creationType="lock"
      actionCreator={edit ? updateLock : addLock}
      uniqueContent={{}}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={"span"}
    />
  </>)
}
