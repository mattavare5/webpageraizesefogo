const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginFeedback = document.getElementById('loginFeedback');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const user = usernameInput.value.trim();
    const pass = passwordInput.value;
    if (user === 'teste@teste' && pass === 'teste') {
        loginFeedback.style.display = 'block';
        loginFeedback.style.color = 'green';
        loginFeedback.textContent = '✅ Login realizado com sucesso!';
        usernameInput.classList.remove('is-invalid');
        passwordInput.classList.remove('is-invalid');
    } else {
        loginFeedback.style.display = 'block';
        loginFeedback.style.color = 'red';
        loginFeedback.textContent = '❌ Usuário ou senha incorretos.';
        usernameInput.classList.add('is-invalid');
        passwordInput.classList.add('is-invalid');
    }
});