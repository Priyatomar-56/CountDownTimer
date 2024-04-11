import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInfo.css'; // Import CSS file

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedUsers, setSortedUsers] = useState([]);
  const [pastSearchTerms, setPastSearchTerms] = useState([]);

  useEffect(() => {
    // Fetch users data
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setSortedUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    // Retrieve past search terms from local storage
    const savedSearchTerms = JSON.parse(localStorage.getItem('pastSearchTerms')) || [];
    setPastSearchTerms(savedSearchTerms);
  }, []);

  useEffect(() => {
    // Save past search terms to local storage whenever it changes
    localStorage.setItem('pastSearchTerms', JSON.stringify(pastSearchTerms));
  }, [pastSearchTerms]);

  const handleSearch = () => {
    if (searchTerm) {
      const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setSortedUsers(filteredUsers);
      // Update past search terms
      setPastSearchTerms(prevTerms => [...prevTerms, searchTerm]);
    } else {
      setSortedUsers(users);
    }
  };

  const handleSortByName = () => {
    const sortedByName = [...sortedUsers].sort((a, b) => a.name.localeCompare(b.name));
    setSortedUsers(sortedByName);
  };

  return (
    <div>
      <div className="search-container">
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="past-search-terms">
        <h2>Past Search Terms:</h2>
        <ul>
          {pastSearchTerms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleSortByName}>Sort by Name</button>
      <ul>
        {sortedUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserInfo;
