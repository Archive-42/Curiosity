import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation, Link } from 'react-router-dom'
import parse from 'html-react-parser'

import Header from '../Header'

export default function CurrentThread({auth, setAuth}) {
  const { cid, tid } = useParams()
  const tale = useSelector(state => state.tales[tid])
  const { effects, threads } = useSelector(state => state)
  const [history, setHistory] = useState([])
  console.log("tid", tid, tale)
  const [currentThread, setCurrentThread] = useState(threads[Number(tale.first_thread_id)])
  const [currentChoices, setCurrentChoices] = useState(threads[Number(tale.first_thread_id)].choices)

  const handleChoice = (chid) => (e) => {
    const updatedHistory = [...history]
    updatedHistory.push(currentThread.id)
    setHistory(updatedHistory)
    console.log("history", history)
    setCurrentThread(threads[chid])
    setCurrentChoices(threads[chid].choices)
  }

  const handleGoBack = (e) => {
    console.log("history", history)
    const prevThread = threads[history[history.length - 1]]
    setHistory(history.slice(0, history.length - 1))
    setCurrentThread(threads[prevThread.id])
    setCurrentChoices(prevThread.choices)
  }

  const checkLocks = (e) => {
    return true
    // TODO Check for locks. On each lock, check requirements, then eventually return final yes/no
  }

  if (!currentThread) return null
  return (<>
        <Header
          auth={auth} setAuth={setAuth}
          imageUrl={currentThread.image}
          title={tale.title}
          subtitle="What shall you do?"
        />
    
    <main>
    <section>
    <div style={{ margin: "1rem" }}><Link to={`/chronicles/${cid}/tales/${tid}`}><i className="fas fa-arrow-left" ></i> Go Back</Link></div>

    <section className="spotlight" style={{padding: "2rem"}}>
      <h2>{currentThread.title}</h2>
      <p>{parse(currentThread.description)}</p>
    </section>

    <hr />
    <h3>Effects</h3>
    <i>N/A</i>
    {/* <ul>
      {currentThread.asset_effects.map(i => <li key={i}>Effect: {effects[i].title}</li>)}
    </ul> */}
    <hr />


    <h3>Make Your Choice...</h3>
    <ul>
    {/* TODO Check if 'is_returnable' before allowing Go Back option */}
      {currentThread.is_returnable && history.length
        ? <li className="card" >
        <button onClick={handleGoBack} className="yrc-con lo-center-y">
        <span><i className="fas fa-arrow-left" ></i> Go Back</span>
        </button>
        </li>
        : <li className="card"><Link to={`/chronicles/${cid}/tales/${tid}`}   className="yrc-con lo-center-y"><span><i className="fas fa-arrow-left" ></i> Go Back</span></Link></li>
      }
      {currentChoices.filter(choice => checkLocks(choice)).map(choice => (
        

        <li key={choice.id} className="card" onClick={handleChoice(choice.next_thread_id)}>
        <div style={{ backgroundColor: choice.color }} className="card-pic">
                  <i className={`fas fa-${choice.icon} lo-center-y`}></i>
                </div>
                <div className="yrc-con lo-center-y">
        {choice.title}
        </div>
        </li>
      ))}
    </ul>
  </section>
  </main>
  </>)
}