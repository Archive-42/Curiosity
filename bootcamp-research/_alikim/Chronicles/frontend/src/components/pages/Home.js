import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { getGalleryChronicles } from '../../store/mainActions/chronicleActions'

// import { updateSelections, wipeSelections } from '../actions/selectionActions'

// COMPONENTS
import Info from '../mylib/Info'
// import LoginForm from "../auth/LoginForm"
// import SignUpForm from "../auth/SignUpForm"
import Header from '../Header'

export default function Home({ auth, setAuth }) {
  const dispatch = useDispatch()
  let gallery_ids = useSelector(state => state.chronicles.gallery_ids)
  gallery_ids = Array.from(gallery_ids)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/chronicles/newest/12`)
      if (res.ok) {
        const chronicles = await res.json()
        dispatch(getGalleryChronicles(chronicles))
      }
    })()
  }, [])

  if (!gallery_ids.length) return null;

  return (
    <main>
      {!auth && <>
        <div style={{ position: "relative", width: "70%", margin: "0 15%", height: "8rem", backgroundColor: "rgba(255,255,255,0.5)", borderRadius: "20px" }}>
          <div style={{ position: "absolute", width: "100%", margin: "0 auto", textAlign: "center" }}>
            <div className="lo-wow"><Link to="/sign-up">Create an Account</Link></div>
            <div className="lo-wow"><Link to="/login">Login</Link></div>
          </div>
        </div>
      </>}

      <GalleryRibbon gallery_ids={gallery_ids} />

    </main>)
}

{/* Want to make games but don't know programming?
      Want to tell a story where the player can decide who they are and what they do?
      
      Welcome! 
      Who are you? What experience in life is it you seek?
      1. Player. --> kinds of games? --> length --> type of player (card suits)
      2. Creator. --> kind of story
      3. Both.
      4. Not sure. */}

function GalleryRibbon({ gallery_ids }) {
  const chronicles = useSelector(state => state.chronicles)

  return (
    <aside style={{ margin: "4rem 10%", width: "80%" }}>
      <h2>Discover Your Next Adventure!</h2>
      <small>No account? No problem! Play now and if you enjoy the tale you've started but haven't finished, you can make an account to save your progress any time before you leave!</small>
      <div className="lo-board">
        <ul className="gal">
          {gallery_ids.map(id => (
            <li key={id} className="th-card gal-card hack-card">
              <Link to={`/chronicles/${id}`}>
                <div className="hack-img" style={{ backgroundImage: `url(${chronicles[id].image})`, }}>
                </div>
                {/* <img src={`/images/${item.icon}.svg`} alt={`Splash image for "${item.title}" by ${item.creator}`} /> */}
                <article className="hack-lower">

                  <h3 style={{ margin: "0" }}><Info content={parse(chronicles[id].description)} /> {chronicles[id].title}</h3>
                  <small><address>Created by {chronicles[id].creator}</address></small>
                  {/* <dt>Latest Update</dt>
              <dd><datetime>{item.updated_at}</datetime></dd>
              <dt>Tags</dt>
              <dd>{item.tags}</dd> */}
                  {/* TODO Notes like how many tales, how many users, wordcount, hearts/stars */}
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}