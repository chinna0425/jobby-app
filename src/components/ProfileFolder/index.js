import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const isStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class ProfileFolder extends Component {
  state = {profile: {}, status: isStatus.initial}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    const jwt = Cookies.get('jwtToken')
    const data1 = await fetch('https://apis.ccbp.in/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const res = await data1.json()

    if (data1.ok) {
      const profileDetails = {
        profileImageUrl: res.profile_details.profile_image_url,
        name: res.profile_details.name,
        shortBio: res.profile_details.short_bio,
      }
      this.setState({profile: profileDetails, status: isStatus.success})
    } else {
      this.setState({status: isStatus.failure})
    }
  }

  isLoadingProfile = () => (
    <div className="profileLoading-contianer1">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetryData = () => {
    this.setState({status: isStatus.initial}, this.getProfileData)
  }

  isLoadingSuccess = () => {
    const {profile} = this.state
    const {profileImageUrl, name, shortBio} = profile
    return (
      <div className="profile-contianer1">
        <div className="profilefolder">
          <img
            src={profileImageUrl}
            alt="profile"
            className="profile-logoset"
          />
          <h1 className="profile-title">{name}</h1>
          <p className="profile-bio">{shortBio}</p>
        </div>
      </div>
    )
  }

  isLoadingFailure = () => (
    <div className="profileLoading-contianer1">
      <div className="failure-button-container">
        <button
          type="button"
          className="retrybutton"
          onClick={this.onRetryData}
        >
          Retry
        </button>
      </div>
    </div>
  )

  getProfileLoading = () => {
    const {status} = this.state
    switch (status) {
      case isStatus.initial:
        return this.isLoadingProfile()
      case isStatus.success:
        return this.isLoadingSuccess()
      case isStatus.failure:
        return this.isLoadingFailure()
      default:
        return null
    }
  }

  render() {
    return <>{this.getProfileLoading()}</>
  }
}

export default ProfileFolder
