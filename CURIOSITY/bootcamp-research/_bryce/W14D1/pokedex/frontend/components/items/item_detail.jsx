import React from 'react'

const ItemDetail = ({item}) => {
    return(
        <div>
            <h4>{item.name}</h4>
            <h4>Happiness: {item.happiness}</h4>
            <h4>Price: ${item.price}</h4>
        </div>
    )
}

export default ItemDetail