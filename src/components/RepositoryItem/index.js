import './index.css'

const RepositoryItem = props => {
  const {eachRepository} = props
  const {name, starsCount, forksCount, avatarUrl, issuesCount} = eachRepository
  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h3 className="head">{name}</h3>
      <div className="mini-section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="star"
          className="mini-image"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="mini-section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="mini-image"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="mini-section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="mini-image"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
