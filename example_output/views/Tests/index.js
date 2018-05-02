import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as testsActions from '../../src/redux/actions/tests';
import Tests from './Tests'

const mapStateToProps = (state) => ({
  tests: state.tests
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...testsActions
    }, dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Tests)