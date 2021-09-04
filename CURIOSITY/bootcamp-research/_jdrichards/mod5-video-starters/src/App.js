import Message from './components/Message';
import PictureDisplay from './components/PictureDisplay';

function App() {
  return (
    <>
      <h1>Turkey Builder</h1>
      <h3>Set the features of your turkey</h3>
      <div className='button-controls'>
        Size
        <button onClick={() => console.log('s')}>Small</button>
        <button onClick={() => console.log('m')}>Mediium</button>
        <button onClick={() => console.log('l')}>Large</button>
        <button onClick={() => console.log('xl')}>Extra Large</button>
      </div>
      <div className='button-controls'>
        Feather Count:
        <input
          onChange={(e) => console.log(e.target.value)}
          type='number'
          defaultValue={0}
          min={0}
          max={10}
        />
      </div>
      <div className='button-controls'>
        Feather Color(s):
        <label>
          <input type='checkbox' onChange={() => console.log('red')} />
          Red
        </label>
        <label>
          <input type='checkbox' onChange={() => console.log('orange')} />
          Orange
        </label>
        <label>
          <input type='checkbox' onChange={() => console.log('brown')} />
          Brown
        </label>
        <label>
          <input type='checkbox' onChange={() => console.log('light Brown')} />
          Light Brown
        </label>
        <label>
          <input type='checkbox' onChange={() => console.log('yellow')} />
          Yellow
        </label>
      </div>
      <h3>Enjoy Your Turkey </h3>
      <PictureDisplay
        size='m'
        featherCount={3}
        featherColors={['red', 'yellow']}
      />
      <Message size={'m'} />
    </>
  );
}

export default App;
