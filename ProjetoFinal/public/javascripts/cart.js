document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Atualiza o contador do carrinho e a interface do modal
  function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItemsList = document.getElementById("cart-items");

    if (!cartCount || !cartItemsList) return;

    cartCount.textContent = cart.length; // Atualiza o número no ícone do carrinho
    cartItemsList.innerHTML = ""; // Limpa a lista de produtos no modal

    if (cart.length === 0) {
      cartItemsList.innerHTML = "<p class='text-center'>O carrinho está vazio.</p>";
      return;
    }

    cart.forEach((item, index) => {
      const productCard = document.createElement("div");
      productCard.classList.add("card", "mb-3");
      productCard.style.width = "100%";

      productCard.innerHTML = `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${item.imagem}" class="img-fluid rounded-start" alt="${item.nome}" style="max-width: 100px; height: auto;">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${item.nome}</h5>
              <p class="card-text"><strong>R$ ${item.preco.toFixed(2)}</strong></p>
              <button class="btn btn-danger btn-sm remove-from-cart position-absolute bottom-0 end-0 m-2" data-index="${index}">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;

      cartItemsList.appendChild(productCard);
    });

    // Adiciona eventos para remover produtos
    document.querySelectorAll(".remove-from-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.closest("button").getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
      });
    });
  }

  // Função para adicionar ao carrinho
  function addToCart(event) {
    const button = event.target.closest(".add-to-cart");
    if (!button) return;

    const product = {
      id: button.getAttribute("data-id"),
      nome: button.getAttribute("data-nome"),
      preco: parseFloat(button.getAttribute("data-preco")),
      imagem: button.getAttribute("data-imagem"),
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }

  // Garante que os botões de adicionar ao carrinho funcionem corretamente
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  // Atualiza o carrinho ao carregar a página
  updateCartUI();
});
