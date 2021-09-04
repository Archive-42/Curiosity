import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// YOUR COMPONENTS
import YourCreations from '../YourCreations'
import {
  YourChronicles
} from '../YourCreations'

// FORM COMPONENTS
import ChronicleForm from '../forms/ChronicleForm'
import CharacterForm from '../forms/CharacterForm'
import PlaceForm from '../forms/PlaceForm'
import AssetForm from '../forms/AssetForm'
import StatusForm from '../forms/StatusForm'
import MeterForm from '../forms/MeterForm'

// ACTION CREATORS
import { deleteChronicle } from '../../store/mainActions/chronicleActions'
import { deleteCharacter } from '../../store/mainActions/characterActions'
import { deletePlace } from '../../store/mainActions/placeActions'
import { deleteAsset } from '../../store/mainActions/assetActions'
import { deleteStatus } from '../../store/mainActions/statusActions'
import { deleteMeter } from '../../store/mainActions/meterActions'


export default function WorldWeaver() {

  // TODO QUESTION Ask, is this less efficient than selecting each individually??
  const user = useSelector(state => state.user)
  const characters = useSelector(state => Object.values(state.entities).filter(e=>e.type === "character"))
  const assets = useSelector(state => state.assets)
  const places = useSelector(state => Object.values(state.entities).filter(e=>e.type === "place"))
  const statuses = useSelector(state => state.statuses)
  const meters = useSelector(state => state.meters)

  if (!user) return null

  return (
    <main>
      {/* <p>Welcome, {user.username}...</p> */}

      <div className="lo-wow" style={{ margin: "2rem 0", padding: "0.5rem", textAlign: "center", backgroundColor: "rgba(70,40,60,0.2)", borderRadius: "1rem 0", transform: "skew(-10deg)" }}>
        <Link to={`/talespinner`}>Go to TaleSpinner</Link>
      </div>

      <YourChronicles />
      
      <YourCreations
        creationType="character"
        creations={Object.values(characters).filter(char => user.entity_ids.includes(char.id))}
        deleteActionCreator={deleteCharacter}
        creationForm={CharacterForm}
      />

      {/* places */}
      <YourCreations
        creationType="place"
        creations={Object.values(places).filter(p => user.entity_ids.includes(p.id))}
        deleteActionCreator={deletePlace}
        creationForm={PlaceForm}
      />

      {/* assets */}
      <YourCreations
        creationType="asset"
        creations={Object.values(assets).filter(a => user.asset_ids.includes(a.id))}
        deleteActionCreator={deleteAsset}
        creationForm={AssetForm}
      />

      {/* statuses */}
      <YourCreations
        creationType="status"
        creations={Object.values(statuses).filter(cond => user.status_ids.includes(cond.id))}
        deleteActionCreator={deleteStatus}
        creationForm={StatusForm}
      />


      <YourCreations
        creationType="meter"
        creations={Object.values(meters).filter(m => user.meter_ids.includes(m.id))}
        deleteActionCreator={deleteMeter}
        creationForm={MeterForm}
      />


    </main>
  )
}
