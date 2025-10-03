const cpfInput = document.getElementById('cpf');
const form = document.getElementById('cadastroForm');
const formFeedback = document.getElementById('formFeedback');

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    const digits = cpf.split('').map(Number);
    let soma1 = 0;
    for (let i = 0; i < 9; i++) soma1 += (i + 1) * digits[i];
    soma1 %= 11;
    if (soma1 === 10) soma1 = 0;
    if (soma1 !== digits[9]) return false;
    let soma2 = 0;
    for (let i = 0; i < 9; i++) soma2 += (9 - i) * digits[i];
    soma2 %= 11;
    if (soma2 === 10) soma2 = 0;
    if (soma2 !== digits[10]) return false;
    return true;
}

cpfInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3 && value.length <= 6)
        value = value.replace(/(\d{3})(\d+)/, '$1.$2');
    else if (value.length > 6 && value.length <= 9)
        value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    else if (value.length > 9)
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    e.target.value = value;
});

cpfInput.addEventListener('blur', () => {
    if (validarCPF(cpfInput.value)) {
        cpfInput.classList.remove('is-invalid');
        cpfInput.classList.add('is-valid');
    } else {
        cpfInput.classList.remove('is-valid');
        cpfInput.classList.add('is-invalid');
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cpfValido = validarCPF(cpfInput.value);
    if (!cpfValido) {
        cpfInput.classList.add('is-invalid');
        cpfInput.focus();
        formFeedback.style.display = 'block';
        formFeedback.style.color = 'red';
        formFeedback.textContent = '❌ CPF inválido. Corrija os dados antes de enviar.';
        return;
    }
    formFeedback.style.display = 'block';
    formFeedback.style.color = 'green';
    formFeedback.textContent = '✅ Formulário enviado com sucesso!';
    form.reset();
    cpfInput.classList.remove('is-valid', 'is-invalid');
});