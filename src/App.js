import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from 'react-use-localstorage';
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import UserCard from "./components/UserCard";
import Repos from "./components/Repos";
import { addUser } from './redux/actionCreators';
import LoadingImg from './components/LoadingImg';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import UsernameForm from './components/UsernameForm';

const App = () => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);

  const [previousUsernames, setPreviousUsernames] = useLocalStorage('previousUsernames',  JSON.stringify(users));
  const lastUsernames = JSON.parse(previousUsernames);
  
  const saveNewUser = (username) => {
    if (!lastUsernames.includes(username)) {
      const updatedPreviousUsers = [...lastUsernames, username];
      setPreviousUsernames(JSON.stringify(updatedPreviousUsers));
      dispatch(addUser(username));
    }
  }

  const fetchDetails = async (username) => {
    try {
      setIsLoading(true)
      const { data } = await Axios.get(`https://api.github.com/users/${username}`);
      setUser(data);
      saveNewUser(username)
      setIsLoading(false)
    } catch (error) {
      if(error.response.status === 404) {
        toast("Not able to locate user", { type: "error", theme: 'colored' });
      }
      setIsLoading(false)
    }
  };

  const searchPreviousUsername = async (e, username) => {
    e.preventDefault();
    await setQuery(username);
    await fetchDetails(username);
  }

  const prevUsernames = lastUsernames.reverse();
  return (
    <main className="content">
      <ToastContainer />
      <div className="container">
        <h1 className="text-center">Github User Searcher</h1>
        {isLoading ?
          <div style={{ textAlign: 'center', margin: '100px 0' }}>
            <LoadingImg />
          </div>
        : (
          <div className="dFlex" style={{ justifyContent: 'space-between' }}>
            <div className="user-section">
            <h2 className="subtitle">Search by Github username and preview the profile</h2>
              <UsernameForm query={query} setQuery={setQuery} fetchDetails={fetchDetails} />
              {user ? (
                <div>
                  <UserCard user={user} />
                  <Repos repos_url={user.repos_url} />
                 </div>
              ) : null}
              
            </div>
            
            <div className="history-section"> 
              <h2 className="subtitle">Previous searched username</h2>
              <ul>
                {prevUsernames.map(username => (
                  <li 
                    key={username}
                    onClick={(e) => searchPreviousUsername(e, username)}
                    aria-hidden="true"
                  >
                    {username}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      } 
      </div>
    </main>
  )
};

export default App;
