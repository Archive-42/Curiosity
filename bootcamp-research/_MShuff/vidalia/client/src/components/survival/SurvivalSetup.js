import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { authContext } from '../../Context'
import Footer from '../landingComponents/Footer';
import SetupCard from './SetupCards';


const SurvivalSetup = () => {
    const { id } = useContext(authContext);
    const [charList, setCharList] = useState([]);

    useEffect(() => {
        getChars()
    }, [])

    const getChars = async() => {
        const res = await fetch(`/api/character/${id}`)
        const data = await res.json();
        setCharList(data)
    }


    const charCards = charList.map((char) => <SetupCard key={char.id} char={char} />)

    return (
        <div className='body'>
            <div className='setup-header'>Choose your warrior</div>
            <div className='back-button'>
                <NavLink to='/' className='button-links2'>
                    <i className="fas fa-arrow-circle-left back-icon"></i>
                    <div>Head Back</div>
                </NavLink>
            </div>
            <div className='char-scroller'>
                {charCards}
            </div>
            <Footer />
        </div>
    )
}

export default SurvivalSetup;