import './index.css'

const Skills = props => {
  const {eachIter} = props

  const {name, imageUrl} = eachIter
  return (
    <div className="skills-container">
      <img src={imageUrl} alt="skills" className="skill-logo" />
      <h4 className="skill-name">{name}</h4>
    </div>
  )
}
export default Skills
