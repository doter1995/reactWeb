import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'search',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Search = require('./containers/SearchContainer').default
      const reducer = require('./modules/search').default
      injectReducer(store, { key: 'search', reducer })
      cb(null, Search)
    })
  }
})
