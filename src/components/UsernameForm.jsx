import React from 'react';

function UsernameForm({ query, setQuery, fetchDetails }) {
    return (
        <div className="flex-grow-0 border-top">
            <div className="dFlex input-group">
                <input 
                type="text" 
                className="form-control"
                id="username" 
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Please provide the username"
                />
                <button className="btn btn-primary" onClick={() => fetchDetails(query)}>Fetch User Profile</button>
            </div>
        </div>
    )
}

export default UsernameForm;
