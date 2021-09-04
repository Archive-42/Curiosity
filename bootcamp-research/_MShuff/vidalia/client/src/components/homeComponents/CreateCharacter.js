import React, { useContext, useEffect, useState } from 'react';
import Nav from './Nav';
import { authContext } from '../../Context';
import TextField from '@material-ui/core/TextField';
import { NavLink } from 'react-router-dom';


const CreateCharacter = () => {
    const [name, setName] = useState('');
    const [story, setStory] = useState('');
    const [abilityId, setAbilityId] = useState(1);
    const [classId, setClassId] = useState(1);
    const [classChoices, setClassChoices] = useState([]);
    const [abilityChoices, setAbilityChoices] = useState([]);

    const { id } = useContext(authContext);

    useEffect(() => {
        getFormDataInfo();
    }, [])

    const getFormDataInfo = async() => {
        const res = await fetch('/api/create-character/form-data-info')
        const data = await res.json();
        setAbilityChoices(data.abilities);
        setClassChoices(data.classes)
    }

    const handleCreateCharacter = async() => {
        const data = { creatorId: id, name: name, story: story,
             abilityId: abilityId, classId: classId }
        await fetch('/api/create-character/make', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        // return (
        //     <Redirect to="/characters"/>
        // )
    }

    const chooseAbility = (e) => {
        setAbilityId(Number(e.target.value))
    }

    const chooseClass = (e) => {
        setClassId(Number(e.target.value))
    }

    const updateName = e => setName(e.target.value);
    const updateStory = e => setStory(e.target.value);


    const abilityElements = abilityChoices.map((ability) => {
        return(
            <div key={ability.name} className='ability-list'>
                <div className='ability-name'>{`Ability: ${ability.name}`}</div>
                <div className='ability-description'>{`Description: ${ability.description}`}</div>
            </div>
        )
    })

    const classElements = classChoices.map((classEl) => {
        return (
            <div key={classEl.description} className='ability-list'>
                <div className='ability-name'>{`Class: ${classEl.name}`}</div>
                <div className='ability-description'>{`Description: ${classEl.description}`}</div>
            </div>
        )
    })

    const abilitySelectElements = abilityChoices.map((ability) => {
        return (
            <option value={ability.id} className='select-element'>{ability.name}</option>
        )
    })

    const classSelectElements = classChoices.map((classChoice) => {
        return (
            <option value={classChoice.id} className='select-element'>{classChoice.name}</option>
        )
    })


    return(
        <>
            <Nav />
            <div className='form-wrapper'>
                <div className='character-maker-form'>
                    <h2 className='char-maker-header'>Character Creator</h2>
                    <form className='form-area'>
                        <TextField onChange={updateName} label="Name" variant='outlined' className='text-field'/>
                        <textarea onChange={updateStory} placeholder='Write your character backstory...' className='story-field'></textarea>
                        <div className='ability-intro'>Choose from a variety of unique abilities that fits with your playstyle.</div>
                        <div className='select-box-wrapper'>
                            <select className='selector-box' onChange={chooseAbility}>
                                {abilitySelectElements}
                            </select>
                        </div>
                        {abilityElements}
                        <div className='class-intro'>Choose a unique class for your character.</div>
                        <div className='select-box-wrapper'>
                            <select className='selector-box' onChange={chooseClass}>
                                {classSelectElements}
                            </select>
                        </div>
                        {classElements}
                        <div className='link-butn-wrapper'>
                            <NavLink to='/characters' className='butn-link-char-maker'>
                                <div className='char-maker-button' onClick={handleCreateCharacter}>Create Character</div>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateCharacter;