import { connect } from 'react-redux'
import { plus } from './../modules/search'

import Search from './../components/Search'

const mapDispatchtoProps = {
  plus
}

const mapStateToProps = (state) => ({
  search: state.search
})

export default connect(mapStateToProps, mapDispatchtoProps)(Search)
