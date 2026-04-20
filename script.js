"https://fakestoreapi.com/products"

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let allProducts = [];

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    renderProducts(allProducts);
  });

function renderProducts(products) {
  productGrid.innerHTML = "";

  products.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title.slice(0, 40)}...</h3>
      <p class="price">$${item.price}</p>
      <button>Add to cart</button>
    `;

    productGrid.appendChild(card);
  });
}

function filterProducts() {
  const searchValue = searchInput.value.toLowerCase();
  const categoryValue = categoryFilter.value;

  const filtered = allProducts.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchValue);
    const matchesCategory =
      categoryValue === "all" || item.category === categoryValue;

    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);