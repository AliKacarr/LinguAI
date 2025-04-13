import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Profile from './components/Profile'

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser && typeof storedUser === 'string') {
        const parsedUser = JSON.parse(storedUser)
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser)
        }
      }
    } catch (error) {
      console.error('Kullanıcı verisi yüklenirken hata oluştu:', error)
      localStorage.removeItem('user') // Geçersiz veriyi temizle
      setUser(null)
    }
  }, [])

  const [showProfile, setShowProfile] = useState(false);

  const handleProfile = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowProfile(true);
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleRegister = () => {
    setShowRegister(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
      <Header 
        user={user} 
        onLoginClick={() => setShowLogin(true)} 
        onRegisterClick={() => setShowRegister(true)}
        onLogout={handleLogout}
        onProfileClick={handleProfile} // Profil butonuna tıklama işlevi
      />
      
      <main>
        <div className="container">
          <h1>LinguAI - Dil Öğrenme Platformu</h1>
          <p>Yapay zeka destekli dil öğrenme deneyimi</p>
        </div>
      </main>

      {showLogin && (
        <LoginForm 
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false)
            setShowRegister(true)
          }}
          onLoginSuccess={(userData) => {
            setUser(userData);
            setShowLogin(false);
          }}
        />
      )}

      {showRegister && (
        <RegisterForm 
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false)
            setShowLogin(true)
          }}
          onRegisterSuccess={(userData) => {
            setUser(userData)
            setShowRegister(false)
          }}
        />
      )}

      {showProfile && (
  <div className="modal">
    <Profile 
      user={user} 
      onLogout={() => {
        handleLogout();
        setShowProfile(false);
      }}
      onClose={() => setShowProfile(false)}
    />
    <button className="close-btn" onClick={() => setShowProfile(false)}>&times;</button>
  </div>
)}
    </>
  );
}

export default App
