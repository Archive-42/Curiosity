import React from 'react'
import '../../styles/user.css'

export default ({ user }) => {
  const initials = user.full_name
    .split(' ')
    .map(name => name[0].toUpperCase())
    .join('')
  return <div className="avatar">{initials}</div>
}
