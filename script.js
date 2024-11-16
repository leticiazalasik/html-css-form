const form = document.getElementById('cadastroRealTime');
const email = document.getElementById('email');
const cpf = document.getElementById('cpf');
const submitBtn = document.getElementById('submitBtn');
const nome = document.getElementById('nome');


// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    
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


function validateFields() {
    let isValid = true;
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        document.getElementById('emailErro').textContent = 'Email inválido';
        email.classList.add('invalid');
        isValid = false;
    } else {
        document.getElementById('emailErro').textContent = '';
        email.classList.remove('invalid');
        email.classList.add('valid');
    }

    // Validar nome
    const nome = document.getElementById('nome');
    const nomeErro = document.getElementById('nomeErro');
    if (nome.value.length < 3) {
        nomeErro.textContent = 'Nome deve ter pelo menos 3 caracteres';
        isValid = false;
    } else {
        nomeErro.textContent = '';
        // Verificar se o nome tem pelo menos duas palavras
        const nomeParts = nome.value.trim().split(/\s+/); 
        if (nomeParts.length < 2) { 
            nomeErro.textContent = 'Por favor, insira o nome completo'; 
            isValid = false; 
        } else if (isValid) { 
            nomeErro.textContent = ''; 
        } 
        return isValid;
    }
    
    // Validar CPF
    if (!validarCPF(cpf.value)) {
        document.getElementById('cpfErro').textContent = 'CPF inválido';
        cpf.classList.add('invalid');
        isValid = false;
    } else {
        document.getElementById('cpfErro').textContent = '';
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