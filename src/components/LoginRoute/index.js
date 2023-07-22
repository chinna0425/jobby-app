import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', msg: ''}

  addUsername = event => {
    this.setState({username: event.target.value})
  }

  addPassword = event => {
    this.setState({password: event.target.value})
  }

  onLogin = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const {history} = this.props
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const res = await fetch(url, options)
    const respo = await res.json()
    if (res.ok) {
      const jwt = {jwttoken: respo.jwt_token}
      Cookies.set('jwtToken', jwt.jwttoken, {expires: 30})
      this.setState({username: '', password: ''})
      history.replace('/')
    } else {
      this.setState({msg: respo.error_msg})
    }
  }

  render() {
    const {username, password, msg} = this.state
    const jwt = Cookies.get('jwtToken')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <form className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-size"
          />
          <div className="input-contianer">
            <label htmlFor="username" className="label-element-style">
              USERNAME
            </label>
            <br />
            <input
              id="username"
              className="input-field-container"
              placeholder="USERNAME"
              type="text"
              value={username}
              onChange={this.addUsername}
            />
          </div>
          <div className="input-contianer">
            <label htmlFor="password" className="label-element-style">
              PASSWORD
            </label>
            <br />
            <input
              id="password"
              className="input-field-container"
              placeholder="PASSWORD"
              type="password"
              value={password}
              onChange={this.addPassword}
            />
          </div>
          <div className="button-container">
            <button
              type="button"
              className="login-button-style"
              onClick={this.onLogin}
            >
              Login
            </button>
          </div>
          {msg !== '' ? <p className="errormsg">{msg}</p> : ''}
        </form>
      </div>
    )
  }
}
export default Login
