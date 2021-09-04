import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useParams, Link } from "react-router-dom";
import parse from 'html-react-parser'

export default function User() {
  const [user, setUser] = useState({});
  const { uid } = useParams();
  const userChronicles = useSelector(state => Object.values(state.chronicles).filter(chronicle => chronicle.user_id === Number(uid)))

  useEffect(() => {
    if (!uid) return
    (async () => {
      const response = await fetch(`/api/users/${uid}`)
      const user = await response.json()
      setUser(user)
    })()
  }, [uid])

  const handleEdit = (e) => console.log("handle edit please")

  if (!user) return null;

  return (
    <main>
      <h1>{user.username}'s Profile</h1>

      <button onClick={handleEdit} type="button">Edit</button>

      <dl>
        <dt>Email</dt>
        <dd>{user.email}</dd>
      </dl>

      <h2>Published Chronicles</h2>
      <ul className="gal">
        {userChronicles.map(chronicle => (
          <li key={chronicle.id} className="th-card">
            <Link to={`/chronicles/${chronicle.id}`}>
              <dl>
                <dt>Title</dt>
                <dd>{chronicle.title}</dd>
                <dt>Creator</dt>
                <dd><address>{chronicle.creator}</address></dd>
                {/* <dt>Latest Update</dt>
              <dd><datetime>{chronicle.updated_at}</datetime></dd>
              <dt>Tags</dt>
              <dd>{chronicle.tags}</dd>
              <dt>Description</dt> */}
                <dd>{parse(chronicle.description)}</dd>
                {/* TODO Notes like how many tales, how many users, wordcount, hearts/stars */}
              </dl>
            </Link>
          </li>
        ))}
      </ul>

      <h2>Player Characters</h2>
      <ul className="gal">
        {/* {userPcs.map(pc => (
          <li key={pc.id} className="th-card">
            <Link to={`/chronicles/${pc.chronicle_id}/players/${pc.id}`}>
              <dl>
                <dt>Name</dt>
                <dd>{pc.title}</dd>
                <dt>Chronicle</dt>
                <dd>{chronicles[pc.chronicle_id]}</dd>
                <dt>Joined at</dt>
                <dd>{pc.created_at.toLocaleString()}</dd>
              </dl>
            </Link>
          </li>
        ))} */}
      </ul>

    </main>
  )
}