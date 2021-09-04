import React from 'react'
import { useSelector } from 'react-redux'

import Info from '../../mylib/Info'


export default function EntitySlots({entity}) {
  const slots = useSelector(state => state.slots)
  
  return (
    <section>
          <h3>Equipped</h3>
      {/* TODO Show slots and contents */}
      {entity.slots.map((sl, i) => (
        <li key={i}>
          <Info content={slots[sl[0]].description} />
          <i className={`fas fa-lg fa-${slots[sl[0]].icon}`} style={{ color: slots[sl[0]].color }}></i>
          {slots[sl[0]].title}

        </li>
      ))}
    </section>
  )
}