import React, { useState, useEffect } from "react";
import Axios from "axios";

const Repos = ({ repos_url }) => {
  const [repos, setRepos] = useState([]);

  const fetchRepos = async () => {
    const { data } = await Axios.get(repos_url);
    setRepos(data);
  };

  useEffect(() => {
    fetchRepos();
  }, [repos_url]);

  return (
    <div>
      <h2>User repositories</h2>
      <div className="list-group" style={{ margin: '20px 0' }}>
        {repos.map(repo => (
          <div className="list-group-item" key={repo.id}>
            {console.log('repo ===>', repo)}
            <div className="text-primary repo-name"><a href={repo.html_url}>{repo.name}</a></div>
            <div className="text-secondary repo-lang">{repo.language}</div>
            <div className="text-info">{repo.description}</div>
          </div>
        ))}
      </div>
    </div>
   
  );
};

export default Repos;
