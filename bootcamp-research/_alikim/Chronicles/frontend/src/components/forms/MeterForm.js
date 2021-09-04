import React, { useState } from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import { SelectInput } from './FormInputs'
import { addMeter, updateMeter } from '../../store/mainActions/meterActions'

export default function MeterForm({ id, edit, open, handleClose }) {
  const [min, setMin] = useState(edit ? edit.min : 1)
  const [max, setMax] = useState(edit ? edit.max : 20)
  const [base, setBase] = useState(edit ? edit.base : 1)
  const [mod, setMod] = useState(edit ? edit.mod : 1)
  const [algo, setAlgo] = useState(edit ? edit.algorithm : "constant")

  const handleChangeMin = (e) => setMin(e.target.value)
  const handleChangeMax = (e) => setMax(e.target.value)
  const handleChangeBase = (e) => setBase(e.target.value)
  const handleChangeMod = (e) => setMod(e.target.value)
  const handleChangeAlgo = (e) => setAlgo(e.target.value)

  const resetUniqueContent = () => {
    setMin(0)
    setMax(20)
    setBase(1)
    setMod(1)
    setAlgo("constant")
  }

  const meterInputs = () => (<>
    <div className="lo-grida">
      <label className="lo-txt-con-sm">
        <i className="tip fas fa-question-circle"></i>
        <section className="tip-info">The minimum allowed level for this meter type.</section>
        Minimum Level
        <input type="number" value={min} onChange={handleChangeMin} />
      </label>

      <label className="lo-txt-con-sm">
        <i className="tip fas fa-question-circle"></i>
        <section className="tip-info">The maximum allowed level for this meter type.</section>
        Maximum Level
        <input type="number" value={max} onChange={handleChangeMax} />
      </label>

      <label className="lo-txt-con-sm">
        <i className="tip fas fa-question-circle"></i>
        <section className="tip-info">The base amount of points required to fill this meter to reach the next possible 'next level'.</section>
        Base requirements
        <input type="number" value={base} onChange={handleChangeBase} />
      </label>

      <label className="lo-txt-con-sm">
        <i className="tip fas fa-question-circle"></i>
        <section className="tip-info">A modifier that effects how many more points are required to fill the meter with every level. At zero, the requirement will stay the same as the base for every level.</section>
         Modifier (per level)
        <input type="number" value={mod} onChange={handleChangeMod} />
      </label>
    </div>

    <label className="lo-txt-con">
      <i className="tip fas fa-question-circle"></i>
      <section className="tip-info">The algorithm used in combination with the modifier that is used to calculate the points requirement for each level. </section>
      Level-scaling Algorithm
      <select value={algo} onChange={handleChangeAlgo}>
        <option value={"constant"}>constant</option>
        <option value={"logarithmic"}>logarithmic</option>
        <option value={"loglinear"}>loglinear</option>
        <option value={"linear"}>linear</option>
        <option value={"polynomial"}>polynomial</option>
        <option value={"exponential"}>exponential</option>
        <option value={"factorial"}>factorial</option>
      </select>
    </label>

  </>)

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/meters/${id}/edit` : `/api/meters/create`}
      creationType="meter"
      actionCreator={edit ? updateMeter : addMeter}
      uniqueContent={{ min, max, base, mod, algo }}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={meterInputs}
    />
  </>)
}
