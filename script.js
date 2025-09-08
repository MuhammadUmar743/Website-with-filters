const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const categoryLinks = document.querySelectorAll(".category-link");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
let allProducts = [];

// Fetch Products
async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    allProducts = data;
    displayProducts(data);
  } catch (error) {
    console.log("Error fetching products:", error);
  }
}

// Display Products
function displayProducts(products) {
  productContainer.innerHTML = "";

  if (products.length === 0) {
    productContainer.innerHTML = `
      <div class="no-product">⚠️ No product found</div>
    `;
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="card-content">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="price">$${product.price}</div>
      </div>
    `;
    productContainer.appendChild(card);
  });
}

// Category Filter
categoryLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const category = link.getAttribute("data-category");
    if (category === "all") {
      displayProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
      displayProducts(filtered);
    }
    navLinks.classList.remove("active");
  });
});

// Search Filter
searchInput.addEventListener("input", e => {
  const searchText = e.target.value.toLowerCase();
  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchText)
  );
  displayProducts(filtered);
});

// Toggle Menu
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Initial Fetch
fetchProducts();
