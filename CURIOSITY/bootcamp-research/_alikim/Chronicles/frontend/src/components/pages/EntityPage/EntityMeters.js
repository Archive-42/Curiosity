import React from 'react'
import { useSelector } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'

function MetersRadar({ entity }) {
  const meters = useSelector(state => state.meters)
  const data = []
  for (const m of entity.meters) {
    const fullCap = getFullCap(meters[m[0]])
    data.push({
      subject: meters[m[0]].title,
      a: Number(m[1] <= fullCap ? m[1] : fullCap),
      fullMark: fullCap,
    })
  }
console.log("data", data)
  return (
    <section style={{float: "right", margin: "2rem", backgroundColor: "white", padding: "2rem", width: "25rem", borderRadius: "10px"}}>
      <RadarChart outerRadius={100} width={400} height={300} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={0} domain={[0, 150]} />
        <Radar name={entity.title} dataKey="a" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    </section>
  )
}


export default function EntityMeters({ entity }) {
  const meters = useSelector(state => state.meters)

  return (
    <section style={{position: "relative"}}>
      <h3>Stats</h3>
      <ul style={{float: "left"}}>
        {entity.meters.map((m, i) => {
          const currentMeter = calculateLevel(meters[m[0]], m[1])
          return (
            <li key={i} style={{ margin: "0.5rem 0" }}>
              <MeterBar currentMeter={currentMeter} meter={meters[m[0]]} />
            </li>)
        })}
      </ul>
      <MetersRadar entity={entity} />
    </section>
  )
}


function MeterBar({ currentMeter, meter }) {
  const { currentPoints: points, currentCap: cap, level } = currentMeter
  const percent = points / cap * 100

  return (
    <div style={{ backgroundColor: "rgba(255,255,255,0.5)", width: "25rem", padding: "1rem" }}>
      <div style={{ display: "flex" }}>
        <div className="chip-con hvr">

          <section className="hvr-info">
            <h4>{meter.title} <i><small>(meter)</small></i></h4>
            <p>{meter.description}</p>
          </section>

          <div className="chip">
            <i className={`lo-center fas fa-2x fa-${meter.icon}`} style={{ position: "absolute", color: meter.color }}></i>
          </div>

        </div>

        <div style={{ marginLeft: "1rem" }}>
          <h4 style={{ margin: 0, fontSize: "1.2rem" }}> {meter.title}</h4>
          <i><small>(Level: {level}/{meter.max})</small></i>
        </div>
      </div>
      <p style={{ margin: "0 0 0.2rem", textAlign: "right" }}><small>{points ? points + "/" + cap : "MAXED"} POINTS</small></p>

      <LinearProgress variant="determinate" value={percent} />
    </div >)
}


function calculateLevel(meter, points) {
  let level = 0
  const mod = Number(meter.mod)
  let currentPoints = Number(points)
  let currentCap = Number(meter.base)
  let currentMod = mod
  // let cap = 0
  let i = 1
  console.log("calc meter", meter)
  while (currentPoints >= currentCap && currentCap > 0 && level < meter.max) {
    console.log("calc",currentPoints, currentCap, currentMod)
    level += 1
    currentPoints -= currentCap
    if (meter.algorithm == "constant") currentMod = 0
    else if (meter.algorithm = "linear") currentMod += mod
    else if (meter.algorithm = "exponential") currentMod += currentMod
    else if (meter.algorithm = "doubler") currentMod += mod * i
    else if (meter.algorithm = "multiplier") currentMod *= mod
    else if (meter.algorithm = "mod-multiplier") currentMod += mod * mod
    else currentMod += 0
    currentCap += currentMod
    i++
  }
  if (level === meter.max) {
    currentPoints = 0
    currentCap = 0
  }
  return { level, currentPoints, currentCap }
}

function getFullCap(meter) {
  let level = 0
  const mod = Number(meter.mod)
  let currentCap = Number(meter.base)
  let currentMod = mod
  let i = 1
  while (currentCap > 0 && level < meter.max) {
    level += 1
    if (meter.algorithm == "constant") currentMod = 0
    else if (meter.algorithm = "linear") currentMod += mod
    else if (meter.algorithm = "exponential") currentMod += currentMod
    else if (meter.algorithm = "doubler") currentMod += mod * i
    else if (meter.algorithm = "multiplier") currentMod *= mod
    else if (meter.algorithm = "mod-multiplier") currentMod += mod * mod
    else currentMod += currentMod + mod
    currentCap = currentCap*2 + currentMod
    i++
  }
  if (level === meter.max) return currentCap
}