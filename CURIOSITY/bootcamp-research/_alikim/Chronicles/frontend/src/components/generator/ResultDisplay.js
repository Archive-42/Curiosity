import React from 'react'
import { useSelector } from 'react-redux'

import TagList from './TagList'


export default function ResultDisplay({handleSave}) {
  const categories = useSelector(state => state.charGen.categories)
  const traitTypes = useSelector(state => state.charGen.traitTypes)
  const traits = useSelector(state => state.charGen.traits)
  const settings = useSelector(state => state.charGen.setting)

  if (!Object.keys(categories)) return null

  return (
    <article id="npc-display">
      <h2>Character Results</h2>
      
      <hr/>
      
      {Object.values(categories).map(c => (<>
      
        <h3 key={c.id}>{c.category.toUpperCase()}</h3>
        <dl className="dis">
          {c.traitTypeIds.map(ttid => {
            const setting = settings[traitTypes[ttid].traitType]
            let displaySetting
            let tagIds = []
            if (typeof setting === "number") {
              displaySetting = traits[setting].trait
              tagIds = traits[setting].tagIds
            } else if (setting && typeof setting === "string") {
              displaySetting = setting
              tagIds = "custom"
            }
            return (<div>
              <dt key={ttid}>{traitTypes[ttid].traitType}:&nbsp;&nbsp;</dt>
              <dd>
                {displaySetting}
                <TagList tagIds={tagIds} />
              </dd>
              <hr/>
            </div>)
            
          })}
        </dl>
      </>))}
      <hr/>
      <div style={{marginLeft: "20%", transformX: "-50%"}}>
          <div style={{ position: "relative", height: "6rem", width: "100%", margin: "0 auto" }}>
            <button className="lo-wow lo-center" style={{ position: "absolute", display: "flex", alignItems: "center", textAlign: "center" }}>
              <i className="fas fa-2x fa-dice"></i> <span>&nbsp;&nbsp;Randomize!&nbsp;&nbsp; </span><i className=" fas fa-2x fa-dice-d20"></i>
            </button>
          </div>
        </div>
    </article>
  )
}