import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Login from './components/LoginRoute'
import Home from './components/HomeRoute'
import JobRoute from './components/JobsRoute'
import JobItemView from './components/JobItemDetails'
import NotFound from './components/NotFoundRoute'
import Protected from './components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Protected exact path="/" component={Home} />
    <Protected exact path="/jobs" component={JobRoute} />
    <Protected exact path="/jobs/:id" component={JobItemView} />
    <Protected exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
