import React from 'react';
import Login from './Login';
import SignUp from './Signup';
// import LandingBody from './LandingBody';
import logo from '../../images/redlogo.png';
import Footer from './Footer';


const Landing = () => {


    return (
        <>
            <div className='landing-nav'>
                <img className='logo' src={logo} alt='logo' />
                <p className='vidalia-landing-title'>Vidalia</p>
                <Login />
                <SignUp />
            </div>
            <div className='landing-banner'>
                <div className='landing-banner-title'>Welcome to Vidalia</div>
            </div>
            <Footer />
        </>
    )
};



export default Landing;