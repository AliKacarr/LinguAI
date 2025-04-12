class AuthService {
  async login(email, password) {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, user: data.user };
      } else {
        throw new Error(data.message || 'Giriş başarısız');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Giriş sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }

  async register(name, email, password) {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return { success: true };
      } else {
        throw new Error(data.message || 'Kayıt başarısız');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Kayıt sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

export const authService = new AuthService();