import React from 'react'
import '../styles/Header.css'

function Header({ user, onLoginClick, onRegisterClick, onLogout }) {
  return (
    <header>
      <div className="logo">LinguAI</div>
      <nav>
        <ul>
          <li><a href="#">Ana Sayfa</a></li>
          <li><a href="#">Dersler</a></li>
          <li><a href="#">Hakkımızda</a></li>
          <li><a href="#">İletişim</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {user ? (
          <>
            <span>Merhaba, {user.name}</span>
            <button className="logout-btn" onClick={onLogout}>Çıkış Yap</button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={onLoginClick}>Giriş Yap</button>
            <button className="register-btn" onClick={onRegisterClick}>Kayıt Ol</button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header