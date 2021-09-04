import { useState } from 'react';

function App() {
    const [count, setCount] = useState(0);

    const fastCount = () => setCount(count + 1);
    const fastPrevState = () => setCount((prevState) => prevState + 1);
    const slowCount = () => setTimeout(fastCount, 2000);
    const slowPrevState = () => setTimeout(fastPrevState, 2000);

    return (
        <div className='app'>
            <h1>Count: {count}</h1>
            <p>Click buttons multiple times in a row to see the difference.</p>

            <div className='buttons'>
                <div className='fast'>
                    <p>Buttons with no delay</p>
                    <div>
                        <button onClick={fastCount}>setCount(count + 1)</button>
                        <button onClick={fastPrevState}>
                            {`setCount((prevState) => prevState + 1)`}
                        </button>
                    </div>
                </div>
                <p>Buttons with 2 second delay</p>
                <div>
                    <button onClick={slowCount}>setCount(count + 1)</button>
                    <button
                        onClick={slowPrevState}
                    >{`setCount((prevState) => prevState + 1)`}</button>
                </div>
            </div>
        </div>
    );
}

export default App;
