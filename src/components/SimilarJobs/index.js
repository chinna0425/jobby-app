import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJob = props => {
  const {eachCard} = props
  const {
    companyLogoUrl,
    location,
    rating,
    employmentType,
    jobDescription,
    title,
  } = eachCard
  return (
    <li className="similarjob-card-list">
      <div className="similarcard-image-contianer">
        <img
          src={companyLogoUrl}
          alt="companylogo"
          className="similar-card-logo"
        />
        <div className="similar-text-container">
          <h1 className="similarcard-title">{title}</h1>
          <div className="similarcard-rating-conta">
            <AiFillStar className="fillstar" />
            <p className="job-element-para-title">{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="similar-card-desc-title">Description</h3>
        <p className="similar-card-dec-parastyle">{jobDescription}</p>
      </div>
      <div className="similar-card-location-brief">
        <div className="main-card-location-container">
          <MdLocationOn className="locationon" />
          <p className="job-element-para-title-style">{location}</p>
        </div>
        <div className="main-card-location-container space-on-left">
          <BsFillBriefcaseFill className="locationon" />
          <p className="job-element-para-title-style">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJob
