import React, { useEffect, useState } from 'react';
import Nav from '../homeComponents/Nav';


const QuestResults = () => {
    const [questList, setQuestList] = useState([]);

    useEffect(() => {
        getQuests()
    }, [])

    const getQuests = async() => {
        const res = await fetch('/api/quests/')
        const data = await res.json();
        setQuestList(data)
    }

    const questElements = questList.map((quest) => {
        return (
            <div className='quest-container' key={quest.id}>
                <div className='quest-header'>
                    <div className='quest-title'>{quest.title}</div>
                    <div className='quest-creator'>{`Created by: ${quest.User.username}`}</div>
                </div>
                <div className='quest-description'>{quest.description}</div>
            </div>
        )
    })

    return(
        <>
            <Nav />
            {questElements}
        </>
    )
}

export default QuestResults;