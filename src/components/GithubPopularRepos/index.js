import { Component } from 'react';
import Loader from 'react-loader-spinner';
import './index.css';
import LanguageFilterItem from '../LanguageFilterItem';
import RepositoryItem from '../RepositoryItem';

const languageFiltersData = [
  { id: 'ALL', language: 'All' },
  { id: 'JAVASCRIPT', language: 'Javascript' },
  { id: 'RUBY', language: 'Ruby' },
  { id: 'JAVA', language: 'Java' },
  { id: 'CSS', language: 'CSS' },
];

class GithubPopularRepos extends Component {
  state = { initialListId: languageFiltersData[0].id, list: [], loader: true };

  componentDidMount = () => {
    this.getLanguages();
  };

  updateLanguageList = (id) => {
    this.setState({ initialListId: id, loader: true }, this.getLanguages);
  };

  failureView = () => (
    <div data-testid="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <h1>Something went wrong</h1>
    </div>
  );

  getLanguages = async () => {
    const { initialListId } = this.state;
    const url = `https://apis.ccbp.in/popular-repos?language=${initialListId}`;
    const options = {
      method: 'GET',
    };

    const data = await fetch(url, options);
    const response = await data.json();

    if (data.ok) {
      const updatedList = response.popular_repos.map((eachItem) => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }));
      this.setState({ list: updatedList, loader: false });
    } else {
      console.error('Error fetching data:', response.message);
      this.failureView();
    }
  };

  render() {
    const { initialListId, list, loader } = this.state;
    return (
      <div className="bg-container">
        <h1 data-testid="heading">Popular</h1>
        <ul className="lang-list" data-testid="language-filters">
          {languageFiltersData.map((eachLang) => (
            <LanguageFilterItem
              key={eachLang.id}
              eachLanguage={eachLang}
              updateLanguageList={this.updateLanguageList}
              activeTabId={initialListId}
              data-testid={`language-filter-${eachLang.id}`}
            />
          ))}
        </ul>
        {loader ? (
          <Loader
            type="ThreeDots"
            color="#0284c7"
            height={80}
            width={80}
            className="loader"
            data-testid="loader"
          />
        ) : (
          <ul className="repo-list" data-testid="repository-list">
            {list.map((eachRepo) => (
              <RepositoryItem
                key={eachRepo.id}
                eachRepository={eachRepo}
                data-testid={`repository-item-${eachRepo.id}`}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default GithubPopularRepos;
