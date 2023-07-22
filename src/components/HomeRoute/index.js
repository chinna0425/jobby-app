import {Link} from 'react-router-dom'
import './index.css'

import Header from '../Header'

const Home = () => (
  <div className="header-container">
    <Header />
    <div className="header-align-contianer">
      <div className="header-inner-container">
        <div className="header-text-container">
          <h1 className="header-title">Find The Job That Fits Your Life</h1>
          <p className="header-description">
            Millions of people are searching for jobs,salary information,company
            reviews.Find the job that fits your abilities and potential.
          </p>
          <Link to="/jobs" className="link-style">
            <button type="button" className="header-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
)
export default Home
