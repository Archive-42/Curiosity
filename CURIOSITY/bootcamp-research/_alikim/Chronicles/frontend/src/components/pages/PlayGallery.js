import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

import Info from '../mylib/Info'

import { getGalleryChronicles } from '../../store/mainActions/chronicleActions'


export default function PlayGallery() {

  const dispatch = useDispatch()
  const chronicles = useSelector(state => state.chronicles)
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
      <h1>The Chronicles</h1>
      <h2>Discover, Play, or To Be Continued...</h2>
      <small>No account? No problem! Play now and if you enjoy the tale you've started but haven't finished, you can make an account to save your progress any time before you leave!</small>

      <article>
            <h2>Today's Spotlight</h2>
        <div className="spotlight"  style={{position: "relative", height: "30rem"}}>
          <Link to={`/chronicles/${chronicles[1].id}`}>
            {/* <img src={`/images/${item.icon}.svg`} alt={`Splash image for "${item.title}" by ${item.creator}`} /> */}

            <div className="hack-img" style={{ backgroundImage: `url(${chronicles[1].image})` }}></div>
            <article className="hack-lower" style={{marginLeft: "2rem"}}>
            <br/>
              <h2 style={{ margin: "0" }}><Info content={parse(chronicles[1].description)} /> {chronicles[1].title}</h2>
              <dd><address>Created by: {chronicles[1].creator}</address></dd>
              {/* <dt>Latest Update</dt>
              <dd><datetime>{item.updated_at}</datetime></dd>
              <dt>Tags</dt>
              <dd>{item.tags}</dd>
              <dt>Description</dt> */}
              <dd>{parse(chronicles[1].description)}</dd>
              {/* TODO Notes like how many tales, how many users, wordcount, hearts/stars */}
            </article>
          </Link>
        </div>
      </article>

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
    </main>
  )
}