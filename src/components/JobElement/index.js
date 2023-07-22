import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobElement = props => {
  const {eachCard} = props
  const {
    companyLogoUrl,
    employmentType,
    title,
    jobDescription,
    location,
    id,
    packagePerAnnum,
    rating,
  } = eachCard
  return (
    <Link to={`/jobs/${id}`} className="link-style-changes">
      <li className="job-element-list">
        <div className="list-companyprofile-contianer">
          <img
            src={companyLogoUrl}
            alt="companyprofile"
            className="job-element-profile"
          />
          <div className="title-rating-contianer">
            <h1 className="job-element-title">{title}</h1>
            <div className="star-contianer">
              <AiFillStar className="fillstar" />
              <p className="job-element-para-title">{rating}</p>
            </div>
          </div>
        </div>
        <div className="jobelement-briefdetails">
          <div className="location-set laptop-view">
            <MdLocationOn className="locationon" />
            <p className="job-element-para-title-style">{location}</p>
          </div>
          <div className="location-set laptop-view">
            <BsFillBriefcaseFill className="locationon" />
            <p className="job-element-para-title-style">{employmentType}</p>
          </div>
          <div className="mobile-view-briefs">
            <div className="location-set">
              <MdLocationOn className="locationon" />
              <p className="job-element-para-title-style">{location}</p>
            </div>
            <div className="location-set">
              <BsFillBriefcaseFill className="locationon" />
              <p className="job-element-para-title-style">{employmentType}</p>
            </div>
          </div>
          <p className="job-element-para-title-style">{packagePerAnnum}</p>
        </div>
        <hr className="linebreaking" />
        <h1 className="job-element-description-title">Description</h1>
        <p className="job-element-para-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobElement

/*  <div className="list-companyprofile-contianer">
          <img
            src={companyLogoUrl}
            alt="companyprofile"
            className="job-element-profile"
          />
          <div className="title-rating-contianer">
            <h1 className="job-element-title">{title}</h1>
            <div className="star-contianer">
              <AiFillStar className="fillstar" />
              <p className="job-element-para-title">{rating}</p>
            </div>
          </div>
        </div> ---
        <div className="jobelement-briefdetails">
          <div className="location-set">
            <MdLocationOn className="locationon" />
            <p className="job-element-para-title-style">{location}</p>
          </div>
          <div className="location-set">
            <BsFillBriefcaseFill className="locationon" />
            <p className="job-element-para-title-style">{employmentType}</p>
          </div>
          <p className="job-element-para-title-style">{packagePerAnnum}</p>
        </div>--
        <hr className="linebreaking" />
        <h1 className="job-element-description-title">Description</h1>
        <p className="job-element-para-description">{jobDescription}</p> */
