import { connect } from 'react-redux';
import { fetchGifs } from '../actions/gifActions';
import App from './App';

const getGifUrls = ({ gifs }) => (
  gifs.map(gif => gif.images.fixed_height.url)
);

const mapStateToProps = state => {
  return {
    // TODO: Pass `gifs` prop
    gifUrls: getGifUrls(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // TODO: Pass `fetchGifs` prop
    fetchGifs: (searchQuery) => dispatch(fetchGifs(searchQuery)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
