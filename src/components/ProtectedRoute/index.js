import {Component} from 'react'
import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

class Protected extends Component {
  render() {
    const jwt = Cookies.get('jwtToken')
    if (jwt === undefined) {
      return <Redirect to="/login" />
    }
    return <Route {...this.props} />
  }
}
export default Protected
