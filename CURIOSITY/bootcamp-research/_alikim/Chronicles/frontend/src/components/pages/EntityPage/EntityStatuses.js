import React from "react"
import { useSelector } from 'react-redux'
import Countdown from 'react-countdown'
import Badge from '@material-ui/core/Badge'

import ChipWithBadge from '../../mylib/ChipWithBadge'


export default function EntityStatuses({ entity }) {
  const statuses = useSelector(state => state.statuses)

  return (
    <section>
      <h3>Status</h3>
      <ul style={{ display: "flex" }}>
        {entity.statuses.map((st) => (<>
          <ChipWithBadge
            badgeContent={<Countdown date={new Date(st[1])} renderer={expiryBadge} />}
            badgeColor="secondary"
            itemType="status condition"
            item={statuses[st[0]]}
          />
          {/* <Countdown date={new Date(st[1])} renderer={expiryRenderer} /> */}
       </> ))}
      </ul>

    </section>
  )
}


function expiryBadge({ days, hours, minutes, seconds, completed }) {
  if (completed) return <span>fin</span>
  else if (days > 0) return <span>{days}d</span>
  else if (hours > 0) return <span>{hours}h</span>
  else if (minutes > 0) return <span>{minutes}m</span>
  else if (seconds > 0) return <span>{seconds}s</span>
}


function expiryRenderer({ days, hours, minutes, seconds, completed }) {
  if (completed) {
    // Render a complete state
    return <span>(expired)</span>
  } else {
    // Render a countdown
    return (
      <p><small>
        <b>Expires in:</b> {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
      </small>
      </p>
    )
  }
}