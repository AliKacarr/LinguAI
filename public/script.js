document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    const loginCloseBtn = document.getElementById('loginCloseBtn');
    const registerCloseBtn = document.getElementById('registerCloseBtn');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Show login form
    loginBtn.addEventListener('click', function() {
        loginContainer.classList.add('show');
    });

    // Show register form
    registerBtn.addEventListener('click', function() {
        registerContainer.classList.add('show');
    });

    // Hide login form
    loginCloseBtn.addEventListener('click', function() {
        loginContainer.classList.remove('show');
    });

    // Hide register form
    registerCloseBtn.addEventListener('click', function() {
        registerContainer.classList.remove('show');
    });

    // Switch from login to register
    switchToRegister.addEventListener('click', function() {
        loginContainer.classList.remove('show');
        registerContainer.classList.add('show');
    });

    // Switch from register to login
    switchToLogin.addEventListener('click', function() {
        registerContainer.classList.remove('show');
        loginContainer.classList.add('show');
    });

    // Handle login form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            // Show loading indicator or disable button here if needed
            
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                console.log('Login successful:', data);
                alert(data.message);
                loginContainer.classList.remove('show');
                // Store user info in localStorage or sessionStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                // Update UI to show logged in state
                updateUIAfterLogin(data.user);
            } else {
                console.error('Login failed:', data);
                alert(data.message || 'Giriş başarısız');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Giriş sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
    });

    // Handle register form submission
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Şifreler eşleşmiyor!');
            return;
        }
        
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
                alert(data.message);
                registerContainer.classList.remove('show');
                loginContainer.classList.add('show');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Kayıt sırasında bir hata oluştu');
        }
    });

    // Function to update UI after login
    function updateUIAfterLogin(user) {
        // Update header to show user is logged in
        const authButtons = document.querySelector('.auth-buttons');
        authButtons.innerHTML = `
            <span>Merhaba, ${user.name}</span>
            <button class="logout-btn" id="logoutBtn">Çıkış Yap</button>
        `;
        
        // Add logout functionality
        document.getElementById('logoutBtn').addEventListener('click', function() {
            localStorage.removeItem('user');
            window.location.reload();
        });
    }

    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        updateUIAfterLogin(JSON.parse(storedUser));
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginContainer) {
            loginContainer.classList.remove('show');
        }
        if (e.target === registerContainer) {
            registerContainer.classList.remove('show');
        }
    });
});