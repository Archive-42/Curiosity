import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

import { wipeErrors } from '../store/mainActions/errorActions'
import { updateSelection } from '../store/mainActions/selectionActions'


// MY COMPONENTS
import Info from './mylib/Info'
import ChronicleForm from './forms/ChronicleForm'
import TaleForm from './forms/TaleForm'
import ThreadForm from './forms/ThreadForm'
import ChoiceForm from './forms/ChoiceForm'
import DeleteForm from './forms/DeleteForm'
// import CharacterForm from '../forms/CharacterForm'
// import PlaceForm from '../forms/PlaceForm'
// import AssetForm from '../forms/AssetForm'
// import StatusForm from '../forms/StatusForm'
// import MeterForm from '../forms/MeterForm'

// ACTION CREATORS
import { deleteChronicle } from '../store/mainActions/chronicleActions'
import { deleteTale } from '../store/mainActions/taleActions'
import { deleteThread } from '../store/mainActions/threadActions'
import { deleteChoice } from '../store/mainActions/choiceActions'
// import { deleteCharacter } from '../store/mainActions/characterActions'
// import { deletePlace } from '../store/mainActions/placeActions'
// import { deleteAsset } from '../store/mainActions/assetActions'
// import { deleteStatus } from '../store/mainActions/statusActions'
// import { deleteMeter } from '../store/mainActions/meterActions'
// import { updateSelections, wipeSelections } from '../store/mainActions/selectionActions'


export function YourChronicles() {
  const user = useSelector(state => state.user)
  const chronicles = useSelector(state => state.chronicles)
  if (!user || !chronicles) return null
  return (
    <YourCreations
      creationType="chronicle"
      creations={chronicles}
      creations={Object.values(chronicles).filter(c => user.chronicle_ids.includes(c.id))}
      creationForm={ChronicleForm}
      deleteActionCreator={deleteChronicle}
    />
  )
}


export function YourTales() {
  const parentChronicle = useSelector(state => state.selections.chronicle)
  const tales = useSelector(state => state.tales)
  if (!parentChronicle || !tales) return null
  return (
    <YourCreations
      pid={parentChronicle.id}
      creationType="tale"
      creations={Object.values(tales).filter(t => parentChronicle ? parentChronicle.tale_ids.includes(t.id) : [])}
      filterBySelect={(tales, cid) => Object.values(tales).filter(tale => tale.chronicle_id === cid)}
      deleteActionCreator={deleteTale}
      creationForm={TaleForm}
      pagePath={`/chronicles/${parentChronicle.id}/tales`}
    />
  )
}


export function YourThreads() {
  const parentTale = useSelector(state => state.selections.tale)
  const threads = useSelector(state => state.threads)
  console.log("parentTale", parentTale)
  if (!parentTale || !threads) return null
  return (
    <YourCreations
      pid={parentTale.id}
      creationType="thread"
      creations={Object.values(threads).filter(th => parentTale.thread_ids.includes(th.id))}
      filterBySelect={(threads, tid) => Object.values(threads).filter(thread => thread.tale_id === tid)}
      deleteActionCreator={deleteThread}
      creationForm={ThreadForm}
      pagePath={`/chronicles/${parentTale.chronicle_id}/tales/${parentTale.id}/threads`}
    />
  )
}


export function YourChoices() {
  const parentThread = useSelector(state => state.selections.thread)
  const choices = useSelector(state => state.choices)
  if (!parentThread || !choices) return null
  const parentThreadChoiceIds = parentThread.choices.map(ch=>ch.id)
  return (
    <YourCreations
      pid={parentThread.id}
      creationType="choice"
      creations={Object.values(choices).filter(ch => parentThreadChoiceIds.includes(ch.id))}
      // creations={Object.values(choices).filter(ch => parentThread.choice_ids.includes(ch.id))}
      filterBySelect={(choices, thid) => Object.values(choices).filter(choice => choice.prev_thread_id === thid)}
      deleteActionCreator={deleteChoice}
      creationForm={ChoiceForm}
    />
  )
}


export default function YourCreations({
  pid, // Parent-path id
  creationType,
  creations,
  filterBySelect,
  deleteActionCreator,
  creationForm: CreationForm,
  pagePath,
}) {
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)
  const selected = useSelector(state => state.selections)
  const [selectedCreations, setSelectedCreations] = useState(creations)
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const active = selected[creationType]
  // const active = selected[creationType] ? selected[creationType] : {id: ""}


  const handleActive = (selection) => (e) => dispatch(updateSelection(creationType, selection))
  const handleOpenCreate = () => setOpenCreate(true)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleOpenDelete = () => setOpenDelete(true)
  const handleCloseCreate = () => {
    if (errors.length) dispatch(wipeErrors())
    setOpenCreate(false)
  }
  const handleCloseEdit = () => {
    if (errors.length) dispatch(wipeErrors())
    setOpenEdit(false)
  }
  const handleCloseDelete = () => {
    if (errors.length) dispatch(wipeErrors())
    setOpenDelete(false)
  }

  useEffect(() => {
    if (filterBySelect) setSelectedCreations(filterBySelect(creations, pid))
    else setSelectedCreations(creations)
  }, [creations, selected])

  if (!selectedCreations) return null;
  const isEmpty = (selectedCreations.length) ? false : true

  return (
    <article>

      <button type="button" onClick={handleOpenCreate} className="lo-wow">
        Create {creationType} <i className="fas fa-feather-alt"></i>
      </button>

      {openCreate && <>
        <div className="pop lo-center">
          <button onClick={handleCloseCreate} className="lo-x">&times;</button>
          <CreationForm
            open={openCreate}
            handleClose={handleCloseCreate}
            id={pid}
          />
        </div>
        <div className="lo-screen"></div>
      </>}

      {openDelete && <>
        <div className="pop lo-center">
          <button onClick={handleCloseDelete} className="lo-x">&times;</button>
          <DeleteForm
            open={openDelete}
            handleClose={handleCloseDelete}
            creation={selected[creationType]}
            creationType={creationType}
            deleteActionCreator={deleteActionCreator}
          />
        </div>
        <div className="lo-screen"></div>
      </>}

      {openEdit && <>
        <div className="pop lo-center">
          <button onClick={handleCloseEdit} className="lo-x">&times;</button>
          <CreationForm
            open={openEdit}
            handleClose={handleCloseEdit}
            id={selected[creationType].id}
            edit={selected[creationType]}
          />
        </div>
        <div className="lo-screen"></div>
      </>}

      <h2 className="lo-center-h" style={{ margin: "0 auto", fontSize: "1rem", opacity: 0.8 }}>Your {creationType}s</h2>
      {isEmpty ? <p>You have no {creationType}s yet! Why not start one? :B</p> :
        <>
          <ul style={{display: "flex", flexDirection: "column-reverse"}}>
            {Object.values(selectedCreations).map(creation => (
              <li
                key={creation.id}
                onClick={handleActive(creation)}
                className={active.id === creation.id ? "card active" : "card"}
                style={active.id === creation.id ? { background: `linear-gradient(240deg, ${creation.color} -50%, rgba(250,250,255,0.8) 20%)` } : {}}
              >

                <Link to={pagePath ? pagePath+`/${creation.id}` : `/${creationType}s/${creation.id}`}>
                  <div style={{ backgroundColor: creation.color }} className="card-pic">
                    <i className={`fas fa-${creation.icon} lo-center `}></i>
                  </div>
                </Link>

                <div className="yrc-con lo-center-y">
                  {creation.title}
                  <div>
                    <button type="button" onClick={handleOpenEdit}>Edit</button>
                    <button type="button" onClick={handleOpenDelete}>Delete</button>
                    <Info content={<><b>DESCRIPTION</b> {creation.description
                      ? parse(creation.description) : "N/A"}</>}
                    />
                  </div>
                </div>

              </li>
            ))}
          </ul>
        </>
      }
    </article>
  )
}
