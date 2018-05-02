import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as TestsActions from '../../src/redux/actions/Tests';
import Tests from './Tests'

const mapStateToProps = (state) => ({
  Tests: state.Tests
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...TestsActions
    }, dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Tests)