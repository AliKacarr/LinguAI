import React, { useState } from 'react'
import FormInput from './common/FormInput'
import { authService } from '../services/auth.service'
import '../styles/AuthForms.css'

function RegisterForm({ onClose, onSwitchToLogin, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target
    const fieldName = id.replace('register', '')
    // Özel durum: confirmPassword için camelCase korunmalı
    const key = fieldName === 'ConfirmPassword' ? 'confirmPassword' : fieldName.toLowerCase()
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor!')
      return
    }
    
    setIsLoading(true)
    
    try {
      const { success } = await authService.register(
        formData.name,
        formData.email,
        formData.password
      )
      
      if (success) {
        onRegisterSuccess()
      }
    } catch (error) {
      console.error('Registration error:', error)
      setError('Kayıt sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container show">
      <div className="auth-form">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Kayıt Ol</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <FormInput
            id="registerName"
            label="Ad Soyad"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <FormInput
            id="registerEmail"
            label="E-posta"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <FormInput
            id="registerPassword"
            label="Şifre"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <FormInput
            id="registerConfirmPassword"
            label="Şifre Tekrar"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
            </button>
          </div>
        </form>
        
        <div className="form-switch">
          Zaten hesabınız var mı? <a onClick={onSwitchToLogin}>Giriş Yap</a>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm