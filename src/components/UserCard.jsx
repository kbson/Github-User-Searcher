import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="card dFlex">
      <img alt="user-avatar" src={user.avatar_url} className="img-thumbnail user-avatar" />
      <div className="card-body basic-details">
        <p style={{ marginTop: 0 }}>Name: <span className="text-primary">{user.name}</span></p>
        <p>Location: <span className="text-primary">{user.location}</span></p>
        <p>Bio: <span className="text-primary">{user.bio}</span></p>
        <p>
          Available for hire: <span className="text-info">{user.hireable ? "YES" : "NO"}</span>
        </p>
        <p>Followers: <span className="text-info">{user.followers}</span></p>
      </div>
    </div>
  );
};

export default UserCard;
