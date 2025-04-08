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
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Here you would typically send this data to your server
        console.log('Login attempt:', { email, password });
        
        // For demo purposes, just show an alert
        alert('Giriş başarılı!');
        loginContainer.classList.remove('show');
    });

    // Handle register form submission
    registerForm.addEventListener('submit', function(e) {
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
        
        // Here you would typically send this data to your server
        console.log('Registration attempt:', { name, email, password });
        
        // For demo purposes, just show an alert
        alert('Kayıt başarılı!');
        registerContainer.classList.remove('show');
    });

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