// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import SearchRoute from './Search'
import RouteRoute from './Route'
import PageNotFound from './PageNotFound'
import Redirect from './PageNotFound/redirect'
import LoginRe from './LoginRe'
import MySite from './MySite'
import New from './New'
import Passage from './Passage'
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    Passage,
    MySite,
    New,
    LoginRe,
    SearchRoute(store),
    RouteRoute(store),
    PageNotFound(),
    Redirect
  ]
})
export default createRoutes
