import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import BreedList from './BreedList';
import DogPicture from './DogPicture';

class DogBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breeds: [],
    };
  }

  async componentDidMount() {
    try {
      const url = 'https://dog.ceo/api/breeds/list/all';
      const response = await fetch(url);
      if (response.ok) {
        const { message } = await response.json();
        return this.setState({
          breeds: Object.keys(message),
        });
      }
    } catch (e) {

    }
  }

  render() {
    return (
      <main className="list-detail-layout">
        <BrowserRouter>
          <BreedList breeds={this.state.breeds} />
          <Route path="/breeds/:breed" component={DogPicture} />
        </BrowserRouter>
      </main>
    );
  }
}

export default DogBrowser;
