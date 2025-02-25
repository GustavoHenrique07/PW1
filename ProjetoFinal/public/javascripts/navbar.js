document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
  
    // Exibe/oculta a barra de pesquisa ao clicar no botão de pesquisa
    searchButton.addEventListener('click', () => {
      if (searchContainer.style.display === 'none' || !searchContainer.style.display) {
        searchContainer.style.display = 'flex';
        searchInput.focus();
      } else {
        searchContainer.style.display = 'none';
        searchResults.style.display = 'none';
      }
    });
  
    // Pesquisa dinâmica ao digitar na barra de pesquisa
    searchInput.addEventListener('input', async function () {
      const query = this.value.trim();
      searchResults.innerHTML = '';
  
      if (query.length > 2) {
        const response = await fetch(`/products/search?query=${query}`);
        const products = await response.json();
  
        if (products.length > 0) {
          products.forEach(product => {
            const item = document.createElement('a');
            item.href = `/products/${product._id}`;
            item.classList.add('dropdown-item');
            item.textContent = product.nome;
            searchResults.appendChild(item);
          });
          searchResults.style.display = 'block';
        } else {
          const noResult = document.createElement('div');
          noResult.classList.add('dropdown-item', 'text-muted');
          noResult.textContent = 'Nenhum produto encontrado';
          searchResults.appendChild(noResult);
          searchResults.style.display = 'block';
        }
      } else {
        searchResults.style.display = 'none';
      }
    });
  
    // Esconder dropdown quando clicar fora da pesquisa
    document.addEventListener('click', (event) => {
      if (!searchContainer.contains(event.target) && !searchButton.contains(event.target)) {
        searchContainer.style.display = 'none';
        searchResults.style.display = 'none';
      }
    });
  });
  