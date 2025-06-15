document.addEventListener('DOMContentLoaded', () => {
    atualizarContadorCarrinho(); // Garante que o contador esteja correto ao carregar qualquer página

    // Só chama atualizarCarrinho() se estiver na página do carrinho
    if (document.getElementById("carrinho")) {
        atualizarCarrinho();
    }
});

// Recupera carrinho do localStorage
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Adiciona um item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    salvarCarrinho();
    atualizarContadorCarrinho(); // <--- JÁ EXISTE E ESTÁ CORRETO
    alert(`"${nome}" foi adicionado ao carrinho!`);
}

// Remove um item específico
function removerItem(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    salvarCarrinho();
    atualizarCarrinho();
    atualizarContadorCarrinho(); // <--- ADICIONE ESTA LINHA AQUI!
}

// Limpa o carrinho
function limparCarrinho() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        carrinho = [];
        salvarCarrinho();
        atualizarCarrinho();
        atualizarContadorCarrinho(); // <--- ADICIONE ESTA LINHA AQUI!
    }
}

// Salva carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Atualiza a interface do carrinho (somente se os elementos existirem)
function atualizarCarrinho() {
    const lista = document.getElementById("carrinho");
    const totalDisplay = document.getElementById("total");

    if (!lista || !totalDisplay) {
        atualizarContadorCarrinho(); // Chamada redundante aqui, mas não causa problema
        return;
    }

    lista.innerHTML = "";
    let total = 0;
    let quantidadeTotal = 0; // Esta variável não está sendo usada para nada, pode remover se quiser.

    if (carrinho.length === 0) {
        lista.innerHTML = '<li>Seu carrinho está vazio.</li>';
        totalDisplay.textContent = 'Total: R$ 0,00';
        atualizarContadorCarrinho(); // <--- Chame aqui também para garantir, caso o carrinho.html seja a página inicial e esteja vazio.
        return;
    }

    carrinho.forEach(item => {
        const divItem = document.createElement("div");
        divItem.classList.add("mb-3");

        divItem.innerHTML = `
            <div class="carrinho-item">
                <h3>${item.nome}</h3>
                <p>Valor Unitário: R$ ${item.preco.toFixed(2)}</p>
                <div class="item-details">
                    <p>${item.quantidade} unidade(s)</p>
                    <p class="item-total">R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
                </div>
                <button class="remover-btn" onclick="removerItem('${item.nome}')">Remover</button>
            </div>
        `;
        lista.appendChild(divItem);
        total += item.preco * item.quantidade;
        quantidadeTotal += item.quantidade; // Esta variável ainda não está sendo usada.
    });

    totalDisplay.textContent = `Total: R$ ${total.toFixed(2)}`;
    // A chamada a atualizarContadorCarrinho() aqui é redundante se já foi feita nas funções de ação
    // ou se o carrinho estiver vazio. Melhor deixar apenas nas funções de ação.
    // Você pode remover a linha abaixo se preferir que só as ações de add/remover/limpar atualizem.
    // atualizarContadorCarrinho();
}

// Atualiza o número de itens no ícone do carrinho (todas as páginas)
function atualizarContadorCarrinho() {
    const contadorElemento = document.getElementById("cart-count");
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

    if (contadorElemento) {
        contadorElemento.textContent = totalItens;
        contadorElemento.classList.toggle("visible", totalItens > 0);
    }
}
