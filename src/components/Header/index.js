import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'

/* import 'reactjs-popup/dist/index.css' */
import './index.css'

const Header = props => {
  const {history} = props
  const logOutButton = () => {
    Cookies.remove('jwtToken')
    history.replace('/login')
  }
  return (
    <nav className="navbar-container">
      <div className="nav-inner-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </Link>
        <div className="routingelements">
          <Link to="/" className="link-ele">
            <h1 className="nav-heading">Home</h1>
          </Link>
          <Link to="/jobs" className="link-ele">
            <h1 className="nav-heading">Jobs</h1>
          </Link>
        </div>
        <Popup
          modal
          trigger={
            <button type="button" className="nav-button pop-set">
              Logout
            </button>
          }
        >
          {close => (
            <div className="laptoppopup-container">
              <div>
                <h1 className="popup-title">Are You Sure Want to Logout?</h1>
              </div>
              <div className="button-contianer">
                <button
                  type="button"
                  className="nav-button cancel-button"
                  onClick={() => close()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="nav-button cancel-button"
                  onClick={logOutButton}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </Popup>
        <div className="mobile-icons-contianer">
          <Link to="/" className="link-ele">
            <AiFillHome className="mobile-home" />
          </Link>
          <Link to="/jobs" className="link-ele">
            <BsFillBriefcaseFill className="mobile-home margin-size" />
          </Link>
          <Popup
            modal
            trigger={
              <button type="button" className="icon-logoutnav-button">
                <FiLogOut className="mobile-home margin-size" />
              </button>
            }
          >
            {close => (
              <div className="popup-container">
                <div>
                  <h1 className="popup-title">Are You Sure Want to Logout?</h1>
                </div>
                <div className="button-contianer">
                  <button
                    type="button"
                    className="nav-button cancel-button"
                    onClick={() => close()}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="nav-button cancel-button"
                    onClick={logOutButton}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
