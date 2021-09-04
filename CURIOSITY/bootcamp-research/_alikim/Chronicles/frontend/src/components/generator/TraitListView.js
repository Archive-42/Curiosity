import React from 'react'
import { useSelector } from 'react-redux'

import TagList from './TagList'

export default function TraitListView({ traitType, traitsOfType }) {
  return (<section>
    <h3>Traits for {traitType}</h3>
    <ul>
      {traitsOfType.map(trait => (
        <li key={`trait ${trait.id}`}>
          {trait.trait}
          <TagList tagIds={trait.tagIds} />
        </li>
      ))}
    </ul>
  </section>)
}
