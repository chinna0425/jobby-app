import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import JobCardSet from '../JobMainCard'
import SimilarJob from '../SimilarJobs'

const isStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class JobItemView extends Component {
  state = {jobDetails: {}, similar: [], status: isStatus.initial}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const jwt = Cookies.get('jwtToken')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const data1 = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const res = await data1.json()
    if (data1.ok) {
      const convertedSkills = res.job_details.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))
      console.log(res)
      const converted1 = {
        id: res.job_details.id,
        companyLogoUrl: res.job_details.company_logo_url,
        companyWebsiteUrl: res.job_details.company_website_url,
        jobDescription: res.job_details.job_description,
        location: res.job_details.location,
        rating: res.job_details.rating,
        title: res.job_details.title,
        packagePerAnnum: res.job_details.package_per_annum,
        employmentType: res.job_details.employment_type,
        skills: convertedSkills,
        lifeAtCompany: {
          description: res.job_details.life_at_company.description,
          imageUrl: res.job_details.life_at_company.image_url,
        },
      }
      const converted2 = res.similar_jobs.map(eachSimilar => ({
        companyLogoUrl: eachSimilar.company_logo_url,
        employmentType: eachSimilar.employment_type,
        id: eachSimilar.id,
        jobDescription: eachSimilar.job_description,
        location: eachSimilar.location,
        rating: eachSimilar.rating,
        title: eachSimilar.title,
      }))
      this.setState({
        jobDetails: converted1,
        similar: converted2,
        status: isStatus.success,
      })
    } else {
      this.setState({status: isStatus.failure})
    }
  }

  onLoadingStage = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.setState({status: isStatus.initial}, this.getTheData)
  }

  onSuccessStage = () => {
    const {similar, jobDetails} = this.state
    return (
      <>
        <JobCardSet jobDetails={jobDetails} />
        <h1 className="simillar-heading">Similar Jobs</h1>
        <ul className="jobitemdetails-unorder-container">
          {similar.map(eachCard => (
            <SimilarJob eachCard={eachCard} />
          ))}
        </ul>
      </>
    )
  }

  onFailureCase = () => (
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

  onSearchData = () => {
    const {status} = this.state
    switch (status) {
      case isStatus.initial:
        return this.onLoadingStage()
      case isStatus.success:
        return this.onSuccessStage()
      case isStatus.failure:
        return this.onFailureCase()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobitem-details-container">
          <div className="jobitem-details-inner-container">
            {this.onSearchData()}
          </div>
        </div>
      </>
    )
  }
}
export default JobItemView
