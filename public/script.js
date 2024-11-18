async function fetchProducts() {
  const response = await fetch("/api/products");
  const products = await response.json();
  const cardsContainer = document.querySelector(".section_content_cards");

  cardsContainer.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "section_content_cards_card";
    card.innerHTML = `
        <img src="${product.imagem}" alt="${product.nome}" />
        <p>${product.nome}</p>
        <div class="section_content_cards_card_info">
          <p>${product.preco}</p>
          <img src="imagens/trash.svg" alt="Ícone de lata de lixo" class="delete-icon" data-id="${product.id}" />
        </div>
      `;
    cardsContainer.appendChild(card);
  });

  document.querySelectorAll(".delete-icon").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      deleteProduct(id);
    });
  });
}

fetchProducts();

document.querySelector(".guardar").addEventListener("click", async (e) => {
  e.preventDefault();
  const nome = document.querySelector('input[placeholder="nome..."]').value;
  const preco = document.querySelector('input[placeholder="valor..."]').value;
  const imagem = document.querySelector('input[placeholder="imagem..."]').value;

  await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, preco, imagem }),
  });

  fetchProducts();
});

async function deleteProduct(id) {
  try {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    console.log(`Produto com ID ${id} deletado com sucesso.`);
    fetchProducts();
  } catch (error) {
    console.error("Erro ao deletar o produto:", error);
  }
}
