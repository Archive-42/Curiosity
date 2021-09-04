import React from 'react'
import { useSelector } from 'react-redux'


export default function TagList({ tagIds }) {
  const tags = useSelector(state => state.charGen.tags)
console.log("taglist", tagIds)
if (tagIds && tagIds !== 'custom') {
  
  return (
    <small>
      <ul className="tag">
        {tagIds.map(tid => (
          <li key={`tag ${tid}`}> {tags[tid].tag} </li>)
        )}
      </ul>
    </small>
  )
} else if (tagIds === "custom") {
  return (
    <small>
    <ul className="tag">
        <li key={`tag-0`}> custom </li>
    </ul>
  </small>
  )
}
}
