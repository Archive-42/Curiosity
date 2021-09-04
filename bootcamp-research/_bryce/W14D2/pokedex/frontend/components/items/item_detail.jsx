import React from 'react'

const ItemDetail = ({item}) => {
    return(
        <div className='item-detail'>
            <p>{item.name}</p>
            <p>Happiness: {item.happiness}</p>
            <p>Price: ${item.price}</p>
        </div>
    )
}

export default ItemDetail