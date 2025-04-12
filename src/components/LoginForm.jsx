import React, { useState } from 'react'
import FormInput from './common/FormInput'
import { authService } from '../services/auth.service'
import '../styles/AuthForms.css'

function LoginForm({ onClose, onSwitchToRegister, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id.replace('login', '').toLowerCase()]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      const { success, user } = await authService.login(formData.email, formData.password)
      if (success) {
        onLoginSuccess(user)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container show">
      <div className="auth-form">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Giriş Yap</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <FormInput
            id="loginEmail"
            label="E-posta"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <FormInput
            id="loginPassword"
            label="Şifre"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </div>
        </form>
        
        <div className="form-switch">
          Hesabınız yok mu? <a onClick={onSwitchToRegister}>Kayıt Ol</a>
        </div>
      </div>
    </div>
  )
}

export default LoginForm