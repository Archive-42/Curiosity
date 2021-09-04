import React, { useEffect, useState } from 'react'
import BeastCard from './BeastCard';


const Beastiary = () => {
    const [beastList, setBeastList] = useState([]);

    useEffect(() => {
        getMonsters()
    }, [])

    const getMonsters = async(e) => {
        let letter;
        if(!e){
            letter = 'A'
        } else {
            letter = e.target.innerHTML
        }
        const res = await fetch(`/api/beasts/${letter}`)
        const data = await res.json();
        setBeastList(data)
    }

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z']
    const letterDivs = letters.map((lett) => <div key={lett} onClick={getMonsters} className='letter'>{lett}</div> )

    const monsters = beastList.map((beast) => <BeastCard key={beast.id} beast={beast} />)

    return(
        <>
            <div className='beast-header'>Beastiary</div>
            <div className='letters'>
                {letterDivs}
            </div>
            <div className='monster-scroller'>
                {monsters}
            </div>
        </>
    )
}

export default Beastiary;