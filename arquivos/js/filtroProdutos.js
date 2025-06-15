let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
  });

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  slides[slideIndex - 1].classList.add('active');
  dots[slideIndex - 1].classList.add('active');

  setTimeout(showSlides, 4000); // Troca a cada 4 segundos
}

// Chame showSlides apenas se os elementos do carrossel existirem
document.addEventListener('DOMContentLoaded', () => {
  if (slides.length > 0 && dots.length > 0) {
    showSlides();
  }
});


// Filtros para a PG de produtos
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll(".item-produto");

  // Função para aplicar o filtro
  function applyFilter(filterValue) {
    products.forEach(product => {
      const productCategories = product.getAttribute("data-category").split(' ');

      if (filterValue === "all") {
        product.style.display = "block";
      } else if (productCategories.includes(filterValue)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });

    // Opcional: Adicionar classe 'active' ao botão de filtro correspondente
    buttons.forEach(btn => {
      if (btn.getAttribute("data-filter") === filterValue) {
        btn.classList.add("active-filter-btn"); // Adicione uma classe para estilizar o botão ativo
      } else {
        btn.classList.remove("active-filter-btn");
      }
    });
  }

  // Adiciona listeners para os botões de filtro existentes
  buttons.forEach(button => {
    button.addEventListener("click", function() {
      const filter = this.getAttribute("data-filter");
      applyFilter(filter);
    });
  });

  // Lógica para verificar o parâmetro de URL ao carregar a página
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('categoria'); // Pega o valor do parâmetro 'categoria'

  if (initialCategory) {
    // Se houver uma categoria na URL, aplica o filtro correspondente
    applyFilter(initialCategory);
  } else {
    // Se não houver categoria na URL, exibe todos os produtos por padrão
    applyFilter('all');
  }
});

// A função adicionarAoCarrinho e outras funções do carrinho permanecem as mesmas
// (assumindo que carrinho.js está carregado separadamente ou as funções estão aqui)
// Exemplo (se estiverem neste arquivo):
/*
function adicionarAoCarrinho(nome, preco) {
    // ... sua lógica de adicionar ao carrinho
}
*/