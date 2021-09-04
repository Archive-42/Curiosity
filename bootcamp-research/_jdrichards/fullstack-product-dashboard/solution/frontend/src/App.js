import Products from './components/Product';
import CreateProduct from './components/CreateProduct';
import { Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';

function App() {
  return (
    <>
      <Navigation />

      <Switch>
        <Route exact path='/'>
          <Products />
        </Route>
        <Route path='/create'>
          <CreateProduct />
        </Route>
      </Switch>
    </>
  );
}

export default App;
