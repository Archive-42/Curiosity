import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import Header from '../Header'



export default function CreationPage({ auth, setAuth }) {
  const { charid } = useParams()
  const dispatch = useDispatch()
  const creation = useSelector(state => state.entities[charid])

  useEffect(() => {
    // if (!creation) {
    //   (async () => {
    //     const res = await fetch(`/api/characters/${charid}`)
    //     const newChar = await res.json()
    //     dispatch(addCharacter(newChar))
    //   })()
    // }
  }, [creation])

  if (!creation) return null
  return (<>
    <Header
      auth={auth} setAuth={setAuth}
      imageUrl={creation.image}
      title={creation.title}
      subtitle={creation.title}
    />
    <main>
      <img src={creation.image} alt={creation.title} />

      <dl>
        <dt>Name</dt>
        <dd>{creation.title}</dd>

        <dt>Created at</dt>
        <dd>{creation.created_at.toLocaleString()}</dd>

        <dt>Creator</dt>
        <dd>{creation.creator}</dd>

        <dt>About</dt>
        <dd>{creation.description}</dd>
      </dl>

      <h2>Details</h2>
      <dl>
        <dt>Stats</dt>
        {/* TODO Integrate recharts chart with character meter stats */}
        <dd></dd>

        <dt>Assets</dt>
        {/* TODO Map list of asset items by type */}
        <dd></dd>

        <dt>Equipped</dt>
        {/* TODO Show slots and contents */}
        <dd></dd>

        <dt>Status</dt>
        {/* TODO Show conditions */}
        <dd></dd>

      </dl>

    </main>
  </>)
}