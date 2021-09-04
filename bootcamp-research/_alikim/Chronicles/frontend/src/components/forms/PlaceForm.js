import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import { addPlace, updatePlace } from '../../store/mainActions/placeActions'

export default function AssetForm({ id, edit, open, handleClose }) {
  const resetUniqueContent = () => console.log("No unique content to reset")

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/entities/${id}/edit` : `/api/entities/place/create`}
      creationType="place"
      actionCreator={edit ? updatePlace : addPlace}
      uniqueContent={{}}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={"span"}
    />
  </>)
}
