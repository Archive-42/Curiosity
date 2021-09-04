import React from 'react';


const PageNotFound = () => {

    return (
        <>
            <div className='page-not-found-wrapper'>
                <div className='page-not-found-body'>
                    <p className='page-not-found-banner'>Uncharted territories turn back!</p>
                    <div className='knight'></div>
                </div>
            </div>
            <div className='error-container'>
                <div className='error-message-wrapper'>
                    <div className='error-message'>404: Page Not Found.</div>
                </div>
            </div>
        </>
    )
}

export default PageNotFound;