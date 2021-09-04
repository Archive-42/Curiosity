import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import SelectInput from './SelectInput'
import Info from './Info'

export default function AddToList({
  creationType,
  allItems,
  addedItems,
  setAddedItems
}) {
  const threads = useSelector(state => state.threads)
  const [itemId, setItemId] = useState("")

  const handleChange = (i) => (e) => {
    e.stopPropagation()
    const updatedAddedItems = [...addedItems]
    updatedAddedItems[i] = updatedAddedItems[i].split(" ")[0] + " " + e.target.value
    setAddedItems(updatedAddedItems)
  }
  
  const addItem = (e) => {
    if (itemId) {
      const updatedAddedItems = [...addedItems]
      const newAddedItem = `${itemId} Go to: ${threads[itemId].title}`
      updatedAddedItems.push(newAddedItem)
      setAddedItems(updatedAddedItems)
      setItemId("")
    }
  }

  const removeItem = (i) => (e) => {
    const updatedAddedItems = [...addedItems]
    updatedAddedItems.splice(i, 1)
    setAddedItems(updatedAddedItems)
  }
  return (<>
    <h3>Add a {creationType}</h3>

    <SelectInput
      label={creationType}
      values={allItems}
      value={itemId}
      setValue={setItemId}
    />

    <button type="button" onClick={addItem}>Add</button>

    <h4>Added {creationType}s</h4>
    {!addedItems.length && 
    <p>You haven't added any choices for players to branch into yet.</p>
    }
      <ul>
      {addedItems.map((addedItem, i) => {
        try {
          
        return (<div key={i} className={i}>
      <Info content={<div><b style={{borderBottom: "1px solid gray"}}>{threads[Number(addedItem.split(" ")[0])].title}</b> <br/><b>Description</b>{threads[Number(addedItem.split(" ")[0])].description}</div>} />
        <input type="text" value={addedItem.split(" ").slice(1).join(" ")} onChange={handleChange(i)} />
        <button type="button" onClick={removeItem(i)}>Remove</button>
        <br />
      </div>
      )
        } catch (e) {
          console.error("f", e, addedItem)
        }
      })}
    </ul>
    
  </>)
}