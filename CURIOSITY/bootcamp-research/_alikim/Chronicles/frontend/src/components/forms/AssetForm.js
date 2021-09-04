import React, { useState } from 'react'
import Switch from '@material-ui/core/Switch'
import CreationFormWrapper from './CreationFormWrapper'

import { addAsset, updateAsset } from '../../store/mainActions/assetActions'


export default function AssetForm({ id, edit, open, handleClose }) {
  const [value, set_value] = useState(edit ? edit.value : 1)
  const [max, set_max] = useState(edit ? edit.max : 100)
  const [is_allowed_multiple, set_allowed_multiple] = useState(edit ? edit.is_allowed_multiple : true)
  const handleChangeValue = (e) => set_value(e.target.value)
  const handleChangeMax = (e) => set_max(e.target.value)
  const handleChangeMultiple = (e) => set_allowed_multiple(prev => !prev)

  const resetUniqueContent = () => {
    set_value(1)
    set_max(100)
    set_allowed_multiple(true)
  }

  const uniqueForm = () => (<>
    <div className="lo-grida">
      <label className="lo-txt-con-sm">
        <i className="tip fas fa-question-circle"></i>
        <section className="tip-info">What is the default, or average, worth of this asset in the market?</section>
        Asset Value
        <input type="number" value={value} onChange={handleChangeValue} />
      </label>

      <label className="lo-txt-con-sm">
        <i className="tip fas fa-question-circle"></i>
        <section className="tip-info">How many of this asset can be stacked together at maximum?</section>
        Max Quantity
        <input type="number" value={max} onChange={handleChangeMax} />
      </label>

      <label className="lo-txt-con-sm">
        <i className="tip fas fa-question-circle"></i>
        <section className="tip-info">Can a character hold more than one stack of this item at a time? For example, if you have a 'wood' asset that can stack to a max of 10 woods, can they get another stack and have two bundles of 10?</section>
        is allowed multiple?
        <div style={{marginLeft: "1.5rem"}}>
        <Switch checked={is_allowed_multiple} inputProps={{ 'aria-label': 'is allowed multiple' }} onChange={handleChangeMultiple} /></div>
      </label>
    </div>
  </>)

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/assets/${id}/edit` : `/api/assets/create`}
      creationType="asset"
      actionCreator={edit ? updateAsset : addAsset}
      uniqueContent={{assetValue: value, assetMax: max, allowedMultiple: is_allowed_multiple}}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={uniqueForm}
    />
  </>)
}
