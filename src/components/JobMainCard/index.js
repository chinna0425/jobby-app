import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import './index.css'

import Skills from '../Skills'

const JobCardSet = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    lifeAtCompany,
    companyWebsiteUrl,
    location,
    rating,
    jobDescription,
    title,
    packagePerAnnum,
    skills,
    employmentType,
  } = jobDetails
  const {description, imageUrl} = lifeAtCompany
  return (
    <div className="maincard-container">
      <div className="main-card-img-text-container">
        <img src={companyLogoUrl} alt="comapnylogo" className="maincard-logo" />
        <div className="main-card-text-container">
          <h1 className="job-element-title">{title}</h1>
          <div className="main-card-rating-contianer">
            <AiFillStar className="fillstar" />
            <p className="job-element-para-title">{rating}</p>
          </div>
        </div>
      </div>
      <div className="main-card-brief-details-container">
        <div className="main-card-location-emptype">
          <div className="main-card-location-container space-add-bottom">
            <MdLocationOn className="locationon" />
            <p className="job-element-para-title-style">{location}</p>
          </div>
          <div className="main-card-location-container">
            <BsFillBriefcaseFill className="locationon" />
            <p className="job-element-para-title-style">{employmentType}</p>
          </div>
        </div>
        <p className="job-element-para-title-style">{packagePerAnnum}</p>
      </div>
      <hr />
      <div className="main-card-description-visit-cont">
        <h1 className="job-element-description-title addDesc">Description</h1>
        <a href={companyWebsiteUrl} target="blank" className="visit-button">
          Visit
          <BiLinkExternal className="link-item" />
        </a>
      </div>
      <p className="job-element-para-description addDescPara">
        {jobDescription}
      </p>
      <h1 className="job-element-description-title addDesc">Skills</h1>
      <ul className="unorder-skills-container">
        {skills.map(eachIter => (
          <Skills eachIter={eachIter} key={eachIter.id} />
        ))}
      </ul>
      <h1 className="job-element-description-title addDesc">Life at Company</h1>
      <div className="lifeatcompany-container">
        <p className="life-desc">{description}</p>
        <div className="image-container">
          <img src={imageUrl} alt="lifeatcomapany" className="life-image" />
        </div>
      </div>
    </div>
  )
}
export default JobCardSet
