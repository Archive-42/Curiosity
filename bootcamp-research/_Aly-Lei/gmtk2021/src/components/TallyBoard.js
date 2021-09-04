import React from 'react'
import { useSelector } from 'react-redux'


export default function Tallyboard() {

  const happyCustomers = useSelector(state => state.active.score.customers)

  return (
    <aside>
      <h2>Achievements!</h2>

      <h3>Happy Customers</h3>
        {happyCustomers.map(customer => (
          <img src="../images/images/gui/heart.png" alt="heart" />
        ))}
      

    </aside>
  )
}

function Tally(type, count, markerType) {
  return (
    <section>

    <h3>{type}</h3>
    {[...Array(count)].map(_ => (
      <img src={`../../images/gui/${markerType}.png`} alt={markerType} />)
    )}

    </section>
  )
}