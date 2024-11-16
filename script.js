const form = document.getElementById('cadastroRealTime');
const email = document.getElementById('email');
const cpf = document.getElementById('cpf');
const submitBtn = document.getElementById('submitBtn');
const nome = document.getElementById('nome');
const celular = document.getElementById('celular');
const idade = document.getElementById('idade');
const dataNascimento = document.getElementById('dataNascimento');


// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digito1 = 11 - (soma % 11);
    if (digito1 > 9) digito1 = 0;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let digito2 = 11 - (soma % 11);
    if (digito2 > 9) digito2 = 0;

    return (cpf.charAt(9) == digito1 && cpf.charAt(10) == digito2);
}

// Validação em tempo real
email.addEventListener('input', validateFields);
cpf.addEventListener('input', validateFields);
nome.addEventListener('input', validateFields);
celular.addEventListener('input', validateFields);
idade.addEventListener('input', validateFields);
dataNascimento.addEventListener('input', validateFields);

function validateFields() {
    let isValid = true;

    // Validar nome
    const nomeErro = document.getElementById('nomeErro');
    if (nome.value.length < 3) {
        nomeErro.textContent = 'Nome deve ter pelo menos 3 caracteres';
        isValid = false;
    } else {
        // Verificar se o nome tem pelo menos duas palavras
        const nomeParts = nome.value.trim().split(/\s+/);
        if (nomeParts.length < 2) {
            nomeErro.textContent = 'Por favor, insira o nome completo';
            isValid = false;
        } else {
            nomeErro.textContent = '';
        }
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailErro = document.getElementById('emailErro');
    if (!emailRegex.test(email.value)) {
        emailErro.textContent = 'Email inválido';
        email.classList.add('invalid');
        isValid = false;
    } else {
        emailErro.textContent = '';
        email.classList.remove('invalid');
        email.classList.add('valid');
    }

    // Validar celular
    const celularRegex = /^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/;
    const celularErro = document.getElementById('celularErro');
    if (!celularRegex.test(celular.value)) {
        celularErro.textContent = 'Celular inválido';
        celular.classList.add('invalid');
        isValid = false;
    } else {
        celularErro.textContent = '';
        celular.classList.remove('invalid');
        celular.classList.add('valid');
    }

    // Validar data nascimento
    const dataNascimentoRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19[0-9]{2}|20[0-9]{2})$/;
    const dataNascimentoErro = document.getElementById('dataNascimentoErro');
    if (!dataNascimentoRegex.test(dataNascimento.value)) {
        dataNascimentoErro.textContent = 'Data de nascimento inválida';
        dataNascimento.classList.add('invalid');
        isValid = false;
    } else {
        dataNascimentoErro.textContent = '';
        dataNascimento.classList.remove('invalid');
        dataNascimento.classList.add('valid');
    }


    // Validar idade
    const idadeErro = document.getElementById('idadeErro');
    if (idade.value <18 || idade.value >109) {
        idadeErro.textContent = 'Idade inválida';
        idade.classList.add('invalid');
        isValid = false;
    } else {
        idadeErro.textContent = '';
        idade.classList.remove('invalid');
        idade.classList.add('valid');
    }

    // Validar CPF
    const cpfErro = document.getElementById('cpfErro');
    if (!validarCPF(cpf.value)) {
        cpfErro.textContent = 'CPF inválido';
        cpf.classList.add('invalid');
        isValid = false;
    } else {
        cpfErro.textContent = '';
        cpf.classList.remove('invalid');
        cpf.classList.add('valid');
    }

    submitBtn.disabled = !isValid;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!submitBtn.disabled) {
        alert('Dados válidos! Enviando...');
        // Aqui você enviaria os dados para o servidor
    }
});
