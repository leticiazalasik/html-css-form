document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('preferencesForm');
    const produto1 = document.getElementById('produto1');
    const produto2 = document.getElementById('produto2');
    const totalField = document.getElementById('total');
    const endereco = document.getElementById('endereco');
    const metodoPagamento = document.getElementById('metodoPagamento');
    const submitBtn = document.getElementById('submitBtn');
    const clearBtn = document.getElementById('clearBtn');

    const produto1Preco = 10.00;
    const produto2Preco = 20.00;

    function calcularTotal() {
        const quantidade1 = parseInt(produto1.value) || 0;
        const quantidade2 = parseInt(produto2.value) || 0;
        const total = (quantidade1 * produto1Preco) + (quantidade2 * produto2Preco);
        totalField.value = `R$ ${total.toFixed(2)}`;
    }

    produto1.addEventListener('input', calcularTotal);
    produto2.addEventListener('input', calcularTotal);

    // Carregar preferências salvas ao carregar a página
    window.addEventListener('load', () => {
        const preferences = JSON.parse(localStorage.getItem('userPreferences'));
        if (preferences) {
            produto1.value = preferences.produto1 || 0;
            produto2.value = preferences.produto2 || 0;
            endereco.value = preferences.endereco || '';
            metodoPagamento.value = preferences.metodoPagamento || 'cartao';
            calcularTotal();
        }
    });

    // Salvar preferências quando o formulário é enviado
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir o comportamento padrão do formulário

        const preferences = {
            produto1: produto1.value,
            produto2: produto2.value,
            endereco: endereco.value,
            metodoPagamento: metodoPagamento.value
        };

        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        alert('Pedido salvo!');

        // Simulação de envio para o servidor
        console.log('Enviando dados para o servidor...', preferences);

        // Salvar no histórico de pedidos
        let historico = JSON.parse(localStorage.getItem('historicoPedidos')) || [];
        historico.push(preferences);
        localStorage.setItem('historicoPedidos', JSON.stringify(historico));
    });

    // Função para limpar as preferências e histórico
    clearBtn.addEventListener('click', () => {
        localStorage.removeItem('userPreferences');
        localStorage.removeItem('historicoPedidos');  // Adicionado para limpar o histórico de pedidos
        form.reset();
        totalField.value = '';
        alert('Preferências e histórico removidos!');
    });
});
