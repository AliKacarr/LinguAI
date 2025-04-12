import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <>
      <Header 
        user={user} 
        onLoginClick={() => setShowLogin(true)} 
        onRegisterClick={() => setShowRegister(true)}
        onLogout={handleLogout}
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
            setUser(userData)
            setShowLogin(false)
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
          onRegisterSuccess={() => {
            setShowRegister(false)
            setShowLogin(true)
          }}
        />
      )}
    </>
  )
}

export default App
