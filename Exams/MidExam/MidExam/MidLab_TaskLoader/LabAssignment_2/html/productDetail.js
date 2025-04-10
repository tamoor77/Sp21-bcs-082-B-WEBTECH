document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  console.log(productId);  // Just for checking if it’s working

  const product = products[productId];
  const container = document.getElementById("product-container");

  if (product) {
    container.innerHTML = `
      <div class="product-detail">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h1>${product.name}</h1>
          <p>${product.description}</p>
          <div class="price">${product.price}</div>
          <button onclick="addToCart('${productId}')">Add to Cart</button>
          <button onclick="goToCheckout()">Buy Now</button>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `<p>Product not found.</p>`;
  }
});

// Static checkout navigation
function goToCheckout() {
  window.location.href = "/html/checkout.html";
}
