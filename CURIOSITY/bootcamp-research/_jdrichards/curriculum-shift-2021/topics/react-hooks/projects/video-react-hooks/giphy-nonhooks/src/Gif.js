import React from 'react';
import { apiBaseUrl } from './config';
import { GifContext } from './GifContext';

class Gif extends React.Component {
  static contextType = GifContext;
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: '',
      isLoading: true,
    };
  }

  async componentDidUpdate() {
    try {
      const res = await fetch(`${apiBaseUrl}&q=${this.context.searchQuery}`);
      
      if (!res.ok) throw (res);
      const giphyRes = await res.json();
      const gifUrl = giphyRes.data[0].images.fixed_width.url;
      
      this.setState({
        imgUrl: gifUrl,
        isLoading: false,
      });

    } catch (err) {
      console.error(err);
    }
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Searching for gif...</h1>;
    }

    return (
      <img src={`${this.state.imgUrl}`} alt="gif" />
    );
  }
}

export default Gif;
