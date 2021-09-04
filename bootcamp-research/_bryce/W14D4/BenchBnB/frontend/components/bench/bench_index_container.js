import { connect } from 'react-redux';
import { fetchBenches } from '../../actions/bench_actions'
import BenchIndex from './bench_index'

const msp = state => ({
  benches: Object.values(state.entities.benches)
})

const mdp = dispatch => ({
  fetchBenches: () => dispatch(fetchBenches())
})

export default connect(msp, mdp)(BenchIndex);