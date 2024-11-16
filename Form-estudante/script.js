document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('preferencesForm');
    const email = document.getElementById('email');
    const cpf = document.getElementById('cpf');
    const submitBtn = document.getElementById('submitBtn');
    const nome = document.getElementById('nome');
    const celular = document.getElementById('celular');
    const idade = document.getElementById('idade');
    const dataNascimento = document.getElementById('dataNascimento');
    const endereco = document.getElementById('endereco');
    const senha = document.getElementById('senha');
    const clearBtn = document.getElementById('clearBtn');

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
    endereco.addEventListener('input', validateFields);
    senha.addEventListener('input', validateFields);

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

        // Validar endereco
        const enderecoRegex = /^(Rua\s)?(.+),?\s?(bairro\s)?(.+),?\s?(numero\s)?(\d+)$/;
        const enderecoErro = document.getElementById('enderecoErro');
        if (!enderecoRegex.test(endereco.value)) {
            enderecoErro.textContent = 'Endereço inválido';
            endereco.classList.add('invalid');
            isValid = false;
        } else {
            enderecoErro.textContent = '';
            endereco.classList.remove('invalid');
            endereco.classList.add('valid');
        }

        // Validar senha 
        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const senhaErro = document.getElementById('senhaErro');
        if (!senhaRegex.test(senha.value)) {
            senhaErro.textContent = 'Senha inválida';
            senha.classList.add('invalid');
            isValid = false;
        } else {
            senhaErro.textContent = '';
            senha.classList.remove('invalid');
            senha.classList.add('valid');
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
        if (idade.value < 18 || idade.value > 109) {
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

    // Carregar preferências salvas ao carregar a página
    window.addEventListener('load', () => {
        const preferences = JSON.parse(localStorage.getItem('userPreferences'));
        if (preferences) {
            nome.value = preferences.nome || '';
        }
    });

    // Salvar preferências quando o formulário é enviado
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir o comportamento padrão do formulário

        if (!submitBtn.disabled) {
            const preferences = {
                nome: nome.value,
                email: email.value,
                cpf: cpf.value,
                celular: celular.value,
                idade: idade.value,
                dataNascimento: dataNascimento.value,
                endereco: endereco.value,
                senha: senha.value,
            };

            localStorage.setItem('userPreferences', JSON.stringify(preferences));
            alert('Preferências salvas!');

            // Simulação de envio para o servidor
            console.log('Enviando dados para o servidor...', preferences);
        }
    });

    // Função para limpar as preferências
    clearBtn.addEventListener('click', () => {
        localStorage.removeItem('userPreferences');
        form.reset();
        alert('Preferências removidas!');
    });
});
