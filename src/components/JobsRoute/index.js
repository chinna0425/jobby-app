import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import ProfileFolder from '../ProfileFolder'
import JobElement from '../JobElement'

const isStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class JobRoute extends Component {
  state = {
    jobs: [],
    status: isStatus.initial,
    searchq: '',
    employment: [],
    salaryVal: '',
  }

  componentDidMount() {
    this.getTheData()
  }

  getTheData = async () => {
    const jwt = Cookies.get('jwtToken')
    const {searchq, employment, salaryVal} = this.state
    const joinedData = employment.join(',')
    const data2 = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${joinedData}&minimum_package=${salaryVal}&search=${searchq}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    )
    const res2 = await data2.json()
    if (data2.ok) {
      const jobconverteddata = res2.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobs: jobconverteddata,
        status: isStatus.success,
      })
    } else {
      this.setState({status: isStatus.failure})
    }
  }

  isLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.setState({status: isStatus.initial}, this.getTheData)
  }

  isSuccess = () => {
    const {jobs} = this.state
    const len = jobs.length
    return len > 0 ? (
      <ul className="jobsroute-unorderlist">
        {jobs.map(eachCard => (
          <JobElement eachCard={eachCard} key={eachCard.id} />
        ))}
      </ul>
    ) : (
      <ul className="jobsroutefailure-unorderlist">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="failure"
          className="failure-view"
        />
        <div>
          <h1 className="failure-title">No Jobs Found</h1>
          <p className="failure-desc">
            We could not find any jobs.Try other filters.
          </p>
        </div>
      </ul>
    )
  }

  isFailure = () => (
    <ul className="jobsroutefailure-unorderlist">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure"
        className="failure-view"
      />
      <div>
        <h1 className="failure-title">Oops! Something Went Wrong</h1>
        <p className="failure-desc">
          We Cannot Seem to find the page you are looking for.
        </p>
        <div className="failure-button-container">
          <button type="button" className="retrybutton" onClick={this.onRetry}>
            Retry
          </button>
        </div>
      </div>
    </ul>
  )

  getResult = () => {
    const {status} = this.state
    switch (status) {
      case isStatus.initial:
        return this.isLoading()
      case isStatus.success:
        return this.isSuccess()
      case isStatus.failure:
        return this.isFailure()
      default:
        return null
    }
  }

  onSearchFind = event => {
    this.setState({searchq: event.target.value})
  }

  onKeyDownSubmit = event => {
    if (event.key === 'Enter') {
      this.setState(
        {searchq: event.target.value, status: isStatus.initial},
        this.getTheData,
      )
    }
  }

  onSubmitSearch = () => {
    const {searchq} = this.state
    this.setState({searchq, status: isStatus.initial}, this.getTheData)
  }

  onFullTime = event => {
    const {employment} = this.state
    if (event.target.checked) {
      employment.push(event.target.value)
      console.log(employment)
      this.setState({employment, status: isStatus.initial}, this.getTheData)
    } else {
      const newarr = employment.filter(
        eachValue => eachValue !== event.target.value,
      )
      const res = newarr.join(',')
      console.log(res)
      this.setState(
        {employment: newarr, status: isStatus.initial},
        this.getTheData,
      )
    }
  }

  onRadioValue = event => {
    if (event.target.checked) {
      this.setState(
        {salaryVal: event.target.value, status: isStatus.initial},
        this.getTheData,
      )
    }
  }

  render() {
    const {searchq} = this.state
    return (
      <div className="job-container">
        <Header />
        <div className="job-search-container mobile-search">
          <input
            type="search"
            className="input-search"
            placeholder="Search"
            value={searchq}
            onChange={this.onSearchFind}
            onKeyDown={this.onKeyDownSubmit}
          />
          <button
            type="button"
            className="job-search-button"
            onClick={this.onSubmitSearch}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="job-contianer1">
          <div className="job-inner-container">
            <div className="profile-container">
              <ProfileFolder />
              <div className="line-breaking-container">
                <hr className="line-break" />
              </div>
              <h1 className="typeof-heading">Type Of Employment</h1>
              <div>
                <div className="job-input-container">
                  <input
                    className="jobs-input"
                    id="fulltime"
                    type="checkbox"
                    value="FULLTIME"
                    onClick={this.onFullTime}
                  />
                  <label htmlFor="fulltime" className="jobs-label">
                    Full Time
                  </label>
                </div>
                <div className="job-input-container">
                  <input
                    className="jobs-input"
                    value="PARTTIME"
                    id="parttime"
                    type="checkbox"
                    onClick={this.onFullTime}
                  />
                  <label htmlFor="parttime" className="jobs-label">
                    Part Time
                  </label>
                </div>
                <div className="job-input-container">
                  <input
                    id="freelance"
                    value="FREELANCE"
                    className="jobs-input"
                    type="checkbox"
                    onClick={this.onFullTime}
                  />
                  <label htmlFor="freelance" className="jobs-label">
                    Freelance
                  </label>
                </div>
                <div className="job-input-container">
                  <input
                    id="internships"
                    value="INTERNSHIP"
                    className="jobs-input"
                    type="checkbox"
                    onClick={this.onFullTime}
                  />
                  <label htmlFor="internships" className="jobs-label">
                    Internship
                  </label>
                </div>
              </div>
              <div className="line-breaking-container">
                <hr className="line-break" />
              </div>
              <h1 className="typeof-heading">Salary Range</h1>
              <div>
                <div className="job-input-container">
                  <input
                    className="jobs-input"
                    value="1000000"
                    id="10lpa"
                    type="radio"
                    name="salary"
                    onClick={this.onRadioValue}
                    defaultChecked
                  />
                  <label htmlFor="10lpa" className="jobs-label">
                    10 LPA and above
                  </label>
                </div>
                <div className="job-input-container">
                  <input
                    className="jobs-input"
                    value="2000000"
                    id="20lpa"
                    type="radio"
                    name="salary"
                    onClick={this.onRadioValue}
                  />
                  <label htmlFor="20lpa" className="jobs-label">
                    20 LPA and above
                  </label>
                </div>
                <div className="job-input-container">
                  <input
                    id="30lpa"
                    value="3000000"
                    className="jobs-input"
                    type="radio"
                    name="salary"
                    onClick={this.onRadioValue}
                  />
                  <label htmlFor="30lpa" className="jobs-label">
                    30 LPA and above
                  </label>
                </div>
                <div className="job-input-container">
                  <input
                    id="40lpa"
                    value="4000000"
                    className="jobs-input"
                    type="radio"
                    name="salary"
                    onClick={this.onRadioValue}
                  />
                  <label htmlFor="40lpa" className="jobs-label">
                    40 LPA and above
                  </label>
                </div>
              </div>
            </div>
            <div className="jobs-container">
              <div className="job-search-container video-search">
                <input
                  type="search"
                  className="input-search"
                  placeholder="Search"
                  value={searchq}
                  onChange={this.onSearchFind}
                  onKeyDown={this.onKeyDownSubmit}
                />
                <button
                  type="button"
                  className="job-search-button"
                  onClick={this.onSubmitSearch}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.getResult()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default JobRoute
