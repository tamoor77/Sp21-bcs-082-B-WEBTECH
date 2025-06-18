module.exports = {
  "marker-jacket": {
    id: "marker-jacket",
    name: "MARKER JACKET",
    description: "Tumbled Leather Black",
    price: "€895.00",
    image: "./../assets/images/MARKER_JACKET_BLACK_105443BLACK_1_360x450.jpg",
    colors: ["black"]
  },
  "just-landed": {
    id: "just-landed",
    name: "JUST LANDED",
    description: "LEGACY GANGSTER JACKET CORK",
    price: "",
    image: "./../assets/images/LEGACY_GANGSTER_JACKET-CORK-105359CORK_1_c48f195d-ca0a-4d1b-9642-eed4b86e5850_360x450.jpg",
    colors: []
  },
  "patterson-jacket": {
    id: "patterson-jacket",
    name: "PATTERSON JACKET",
    description: "Tanner Suede Washed Black",
    price: 1195,
    image: "./../assets/images/PATTERSON_JACKET_WASHED_BLACK_105441WSBLK_01_360x450.jpg",
    colors: ["brown", "beige"]
  },
  "waypoint-overshirt": {
    id: "waypoint-overshirt",
    name: "WAYPOINT OVERSHIRT",
    description: "Lightweight Suede Dark Ink",
    price: "€895.00",
    image: "./../assets/images/WAYPOINT_OVERSHIRT_DARK_INK_105444DKINK_1_eac10d3f-c181-4eb9-8353-ccd2d1cf60ae_360x450.jpg",
    colors: ["navy"]
  },
  "oulton-jacket": {
    id: "oulton-jacket",
    name: "OULTON JACKET",
    description: "Lander Leather BLACK",
    price: "€1,495.00",
    image: "./../assets/images/OULTON_JACKET_BLACK_105440BLACK_1_51219c67-fcdb-4d33-b10b-64aaacc2d337_360x450.jpg",
    colors: ["black"]
  },
  "gangster-jacket": {
    id: "gangster-jacket",
    name: "GANGSTER JACKET",
    description: "Hand Waxed Leather Insignia Blue",
    price: "€1,395.00",
    image: "./../assets/images/GANGSTER_JACKET_Natural_100008NATRL_1_360x450.jpg",
    colors: ["blue"]
  },
  "deck-smock": {
    id: "deck-smock",
    name: "DECK SMOCK",
    description: "Military Poplin Dark Ink",
    price: "€1,395.00",
    image: "./../assets/images/DECK_SMOCK_DARK_INK_105451DKINK_1_7aef923e-76ad-4a66-b4ca-6738eaed782a_40x.jpg",
    colors: ["blue"]
  },
  "weybridge-jacket": {
    id: "weybridge-jacket",
    name: "WEYBRIDGE JACKET",
    description: "LANDER Leather DARK PURPLE Green",
    price: "€950.00",
    image: "./../assets/images/WEYBRIDGE_JACKET_DARK_SURPLUS_GREEN_105519DKSGN_01_40x.jpg",
    colors: ["blue"]
  },
  "force-coat": {
    id: "force-coat",
    name: "FORCE COAT",
    description: "TriTech Faux Shaded Olive",
    price: "€1,195.00",
    image: "./../assets/images/FORCE_COAT_FADED_OLIVE_105466FDOLI_1_40x.jpg",
    colors: ["blue"]
  }
};
/*

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  console.log(productId);  // Add this to check if the ID is being read correctly

  // Access the product using the productId as the key
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
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `<p>Product not found.</p>`;
  }
});

function addToCart(id) {
  alert(`${products[id].name} added to cart!`);
}
*/