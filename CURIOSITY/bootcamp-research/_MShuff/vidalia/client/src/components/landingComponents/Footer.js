import React from 'react';


const Footer = () => {

    return (
        <div className='footer-wrapper'>
            <div>This project was made with:</div>
            <div>
                <div>Javascript, Express</div>
                <div>Sequelize, PostgreSQL</div>
                <div>CSS, Material-UI</div>
            </div>
            <div className='footer-container'>
                <div className='footer-link-container'>
                    <a className='footer-link' href='https://github.com/OnionQueenMemu'>
                        <i className="fab fa-github-square"></i>
                    </a>
                </div>
                <div className='footer-link-container'>
                    <a className='footer-link' href='https://twitter.com/OnionQueenMemu'>
                        <i className="fab fa-twitter-square"></i>
                    </a>
                </div>
                <div className='footer-link-container'>
                    <a className='footer-link' href='https://www.linkedin.com/in/miah-barnes-2260111aa/'>
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer;