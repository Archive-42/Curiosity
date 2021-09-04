import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Switch from '@material-ui/core/Switch'

import CreationFormWrapper from './CreationFormWrapper'
import AddToList from '../mylib/AddToList'

import { addThread, updateThread } from '../../store/mainActions/threadActions'




export default function ThreadForm({ id, edit, open, handleClose }) {

  const tales = useSelector(state => state.tales)
  const threads = useSelector(state => edit
    ? Object.values(state.threads).filter(th => state.threads[edit.id].tale_id === th.tale_id)
    : Object.values(state.threads).filter(th => th.tale_id === id)
  )
  const [choices, setChoices] = useState(edit ? createListItems(edit.choices) : [])
  const [is_first, set_is_first] = useState(edit ? tales[edit.tale_id].first_thread_id === edit.id : false)
  const [is_returnable, set_is_returnable] = useState(edit ? edit.is_returnable : true)
const [is_ending, set_is_ending] = useState(edit ? edit.is_ending : false)

  const resetUniqueContent = () => {
    set_is_returnable(true)
    set_is_ending(false)
  }

  const handleChangeFirst = (e) => set_is_first(prev => !prev)
  const handleChangeReturnable = (e) => set_is_returnable(prev => !prev)
  const handleChangeEnding = (e) => set_is_ending(prev => !prev)

  const uniqueForm = () => (<>
    <div className="lo-grida">
      <label className="lo-txt-con-sm">
    <div style={{ marginLeft: "1.5rem" }}>
          <Switch checked={is_first} inputProps={{ 'aria-label': 'is first thread' }} onChange={handleChangeFirst} /></div>
        <i className="tip fas fa-question-circle"></i>
        <section className="tip-info"><b>The Tale's beginnings?</b><br/>Is this the first thread that this tale will start with?</section>
    is the beginning?
      </label>

      <label className="lo-txt-con-sm">
    <div style={{ marginLeft: "1.5rem" }}>
          <Switch checked={is_returnable} inputProps={{ 'aria-label': 'is able to backtrack' }} onChange={handleChangeReturnable} /></div>
        <i className="tip fas fa-question-circle"></i>
        <section className="tip-info"><b>'Go back' Option?</b><br/>Can the player use the 'Go Back' option to return to this thread?</section>
    is able to backtrack?
      </label>
      
      <label className="lo-txt-con-sm">
    <div style={{ marginLeft: "1.5rem" }}>
          <Switch checked={is_ending} inputProps={{ 'aria-label': 'is an ending' }} onChange={handleChangeEnding} /></div>
        <i className="tip fas fa-question-circle"></i>
        <section className="tip-info"><b>An Ending to this Tale?</b><br/>Is this an ending? If so, the player will be given an achievement to know they completed this story, and depending on the Tale's settings, they will be unallowed to play this story again. They will be redirected to your Chronicle once they're finished as well.</section>
    is an ending?
      </label>
    </div>
    {/* <i className="tip fas fa-question-circle"></i> */}
    {/* <section className="tip-info">What other threads does this thread potentially lead to? Create connections to them by adding to a list of this thread's choices.</section> */}
    <AddToList
      creationType="choice"
      allItems={threads}
      addedItems={choices}
      setAddedItems={setChoices}
    />
  </>)
  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/threads/${id}/edit` : `/api/tales/${id}/threads/create`}
      creationType="thread"
      actionCreator={edit ? updateThread : addThread}
      uniqueContent={{ choices }}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={uniqueForm}
    />

    {/* <button onClick={addEffect}>+Effect</button> */}
    {/* <button onClick={addLock}>+Lock</button> */}

  </>)
}


function createListItems(listItems) {
  const stringItems = []
  for (let item of listItems) {
    console.log("pushing", `${item.id} ${item.title}`)
    stringItems.push(`${item.id} ${item.title}`)
  }
  console.log("stringItems", stringItems)
  return stringItems
}