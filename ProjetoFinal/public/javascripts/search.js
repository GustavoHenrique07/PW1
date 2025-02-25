document.getElementById('searchInput').addEventListener('input', async function () {
    const query = this.value.trim();
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';
  
    if (query.length > 2) {
      const response = await fetch(`/products/search?query=${query}`);
      const products = await response.json();
  
      if (products.length > 0) {
        products.forEach(product => {
          const item = document.createElement('a');
          item.href = `/products/${product._id}`;
          item.classList.add('dropdown-item');
          item.textContent = product.nome;
          resultsContainer.appendChild(item);
        });
        resultsContainer.style.display = 'block';
      } else {
        const noResult = document.createElement('div');
        noResult.classList.add('dropdown-item', 'text-muted');
        noResult.textContent = 'Nenhum produto encontrado';
        resultsContainer.appendChild(noResult);
        resultsContainer.style.display = 'block';
      }
    } else {
      resultsContainer.style.display = 'none';
    }
  });
  