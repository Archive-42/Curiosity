import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import parse from 'html-react-parser'
import PlayerCharacterForm from '../forms/PlayerCharacterForm'
import ChronicleForm from '../forms/ChronicleForm'
import DeleteForm from '../forms/DeleteForm'


import Header from '../Header'
import Info from '../mylib/Info'

import { getChronicle, deleteChronicle } from '../../store/mainActions/chronicleActions'
import { getTales } from '../../store/mainActions/taleActions'


export default function ChroniclePage({ auth, setAuth }) {
  const { cid } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const chronicle = useSelector(state => state.chronicles[cid])
  const tales = useSelector(state => state.tales)
  const pc = useSelector(state => Object.values(state.entities)
    .find(char => char.chronicle_id === Number(cid) && user.pc_ids.includes(char.id)))
  const assets = useSelector(state => state.assets)
  const statuses = useSelector(state => state.statuses)
  const meters = useSelector(state => state.meters)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleOpenDelete = () => setOpenEdit(true)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = (e) => setOpenEdit(false)
  const handleCloseDelete = () => setOpenDelete(false)

  // Get the page's chronicle, its list of tales, and user's character
  useEffect(() => {
    if (!chronicle) {
      (async () => {
        const res = await fetch(`/api/chronicles/${cid}`)
        if (res.ok) {
          const { chronicle, tales } = await res.json()
          dispatch(getChronicle(chronicle, tales))
        } else {
          console.error("Chronicle fetch fail D: ")
        }
      })()
    } else if (Object.keys(tales).filter(t => chronicle.tale_ids.includes(Number(t))).length !== chronicle.tale_ids.length) {
      (async () => {
        const res = await fetch(`/api/tales/chronicle/${cid}`)
        if (res.ok) {
          const tales = await res.json()
          dispatch(getTales(tales))
        } else {
          console.error("Tales fetch faile D: ")
        }
      })()
    }
  }, [])

  console.log("chron", chronicle)

  if (!chronicle) return null
  if (Object.keys(tales).filter(t => chronicle.tale_ids.includes(Number(t))).length !== chronicle.tale_ids.length) return null

  const h = <>
    <address>Created by <Link to={`/users/${chronicle.user_id}`}>{chronicle.creator}</Link>
    </address> <small>on {chronicle.created_at.toLocaleString()}</small>
  </>

  return (<>
    <Header
      auth={auth} setAuth={setAuth}
      imageUrl={chronicle.image}
      title={chronicle.title}
      subtitle={h}
    />

    <main>

      {user.id === chronicle.user_id && <>
        <button type="button" onClick={handleOpenEdit}>Edit</button>
        <button type="button" onClick={handleOpenDelete}>Delete</button>

        {openEdit && <ChronicleForm
          open={openEdit}
          handleClose={handleCloseEdit}
          id={cid}
          edit={chronicle}
        />}
        {openDelete && <DeleteForm
          open={openDelete}
          handleClose={handleCloseDelete}
          creation={chronicle}
          creationType="chronicle"
          deleteActionCreator={deleteChronicle}
        />}
      </>}

      <h3>About <i>"{chronicle.title}"</i></h3>
      <p>{parse(chronicle.description)}</p>

      {/* Character maker + chronicle start, restricted to new players */}
      {/* {!pc && <>
        <h2>Start "{chronicle.title}": Make Your Character!</h2>
        <PlayerCharacterForm tid={chronicle.first_tale_id} />
      </>} */}


      {pc && <section>
        <h2>Profile: {pc.title}
          <i className="tip fas fa-question-circle">
            <section className="tip-info">Keep track of your character's status, possessions, levels, conditions, and levels.</section></i>
        </h2>

        <i className={`fa-10x fas fa-${pc.icon}`} style={{ color: pc.color }}></i>

        {/* <h3>About</h3>
        <p>{pc.description) ? parse(pc.description)}</p> */}

        <section style={{ position: "relative" }}>
          <h3>
            Assets <i className="tip fas fa-question-circle">
              <section className="tip-info">Your current possessions.</section>
            </i>
          </h3>
          <ul style={{ paddingLeft: "2rem" }}>
            {pc.assets.map(a => <li key={a.asset_id} style={{ listStyle: "square" }}><i><b>{assets[a.asset_id].title}</b></i> (Quantity: {a.quantity})</li>)}
          </ul>

          <hr />

          <h3>Levels
          <i className="tip fas fa-question-circle">
              <section className="tip-info">'Levels' can be any number of things, but they are all measured by a number, and are usually able to be improved and leveled up.</section></i>
          </h3>

          <ul>
            {pc.meters.map(m => <li key={m.meter_id}>
              <div className="tip-card" style={{ backgroundColor: meters[m.meter_id].color }}>
                <i className={`tip fas fa-2x fa-${meters[m.meter_id].icon}`} >
                  <section className="tip-info" style={{ color: "black" }}><b>{meters[m.meter_id].title}</b>: <hr />{parse(meters[m.meter_id].description)}</section>
                </i></div>
              <dl>
                <li><b>Level Type:</b> {meters[m.meter_id].title}</li>
                <li><b>Current Level:</b> {m.total}</li>
                <li><b>Progress:</b> {m.progress} / {meters[m.meter_id].base}</li>
              </dl>
            </li>)}
          </ul>

          <hr />


          <h3>Conditions
        <i className="tip fas fa-question-circle">
              <section className="tip-info">These are conditions that are currently afflicting your character, for good or ill.</section>
            </i></h3>

          <p><i>N/A</i></p>
          <ul>
            {/* {pc.conditions.map(c => <li key={c}>
          <dl>
            <dt>Condition</dt>
            <dd>{conditions[c].title}</dd>
            <dt>Description</dt>
            <dd>{parse(conditions[c].description)}</dd>
            <dt>Effect</dt>
            <dd>{conditions[c].modifiers}</dd>
            <dt>Time Limit</dt>
            <dd>{conditions[c].expiry</dd>
          </dl></li>)} */}
          </ul>

          <hr />
        </section>
      </section>
      }

      {/* TODO Add bulletin board for announcements, updates, etc. */}

      {/* TODO Add clickable map of locations */}

      {/* TODO Add list of started and finished tales */}
      <hr />
      <h2>The Tales of "{chronicle.title}" <i className="tip fas fa-question-circle">
        <section className="tip-info">These are the available stories for "{chronicle.title}" that you can play. Maybe you can unlock more depending on certain circumstances...</section>
      </i></h2>
      <div className="lo-board">
        <ul className="gal">
          {chronicle.tale_ids.map(tid => (
            <li key={tid} className="th-card gal-card hack-card">
              <Link to={`/chronicles/${cid}/tales/${tid}`}>
                <div className="hack-img" style={{ backgroundImage: `url(${tales[tid].image})`, }}>
                </div>
                <article className="hack-lower">
                  <h3 style={{ margin: "0" }}><Info content={parse(tales[tid].description)} /> {tales[tid].title}</h3>
                  <small><address>Created by {tales[tid].creator}</address></small>
                </article>
              </Link>
            </li>
          ))}
        </ul>
</div>
    </main>
  </>)
}
