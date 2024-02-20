import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, updateLanguageList, activeTabId} = props
  const {id, language} = eachLanguage
  const activeTabClass = activeTabId === id ? 'active-class' : ''
  const updateFilter = () => {
    updateLanguageList(id)
  }
  return (
    <li className="list-item" onClick={updateFilter}>
      <button className={`lang-btn ${activeTabClass}`} type="button">
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
