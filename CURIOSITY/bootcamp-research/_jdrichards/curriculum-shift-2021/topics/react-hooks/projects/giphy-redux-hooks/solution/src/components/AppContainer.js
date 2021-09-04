import { connect } from 'react-redux';
import { fetchGifs } from '../actions/gifActions';
import App from './App';

const mapStateToProps = state => {
  return {
    gifs: state.gifs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGifs: searchQuery => dispatch(fetchGifs(searchQuery)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
