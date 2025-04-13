import React from 'react';
import '../styles/AuthForms.css'

function Profile({ user, onLogout, onClose }) {
  return (
    <div className="auth-container show">
      <div className="auth-form">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Profil Bilgileri</h2>
        <p>İsim: {user.name}</p>
        <p>Email: {user.email}</p>
        <button className="logout-btn" onClick={onLogout}>Çıkış Yap</button>
      </div>
    </div>
    
  );
}

export default Profile;
