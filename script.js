/* =====================================================
   ZENTROMAX - MAIN JAVASCRIPT
   ===================================================== */


/* ================= PRODUCTS ================= */

const products = [

  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "electronics",
    price: 1499,
    oldPrice: 1999,
    rating: 4.5,
    reviews: 128,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },

  {
    id: 2,
    name: "Smart Watch",
    category: "electronics",
    price: 2499,
    oldPrice: 3299,
    rating: 4.3,
    reviews: 94,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
  },

  {
    id: 3,
    name: "Men's Casual Shirt",
    category: "fashion",
    price: 899,
    oldPrice: 1299,
    rating: 4.2,
    reviews: 76,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=600&q=80"
  },

  {
    id: 4,
    name: "Women's Fashion Bag",
    category: "fashion",
    price: 1299,
    oldPrice: 1799,
    rating: 4.4,
    reviews: 112,
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
  },

  {
    id: 5,
    name: "Modern Table Lamp",
    category: "home",
    price: 799,
    oldPrice: 1099,
    rating: 4.1,
    reviews: 63,
    badge: "Deal",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
  },

  {
    id: 6,
    name: "The Psychology of Money",
    category: "books",
    price: 399,
    oldPrice: 599,
    rating: 4.8,
    reviews: 245,
    badge: "Top Rated",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80"
  },

  {
    id: 7,
    name: "Skincare Beauty Set",
    category: "beauty",
    price: 999,
    oldPrice: 1499,
    rating: 4.5,
    reviews: 87,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=600&q=80"
  },

  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    category: "electronics",
    price: 1199,
    oldPrice: 1599,
    rating: 4.4,
    reviews: 91,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"
  }

];


/* ================= CART ================= */

let cart = [];


/* ================= WISHLIST ================= */

let wishlist = [];


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(list = products) {

  const container = document.getElementById("products");

  if (!container) return;

  container.innerHTML = "";

  if (list.length === 0) {

    container.innerHTML = `
      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:60px 20px;
        background:white;
        border-radius:16px;
      ">
        <h2>No products found</h2>
        <p style="color:#64748b;margin-top:10px;">
          Try searching for something else.
        </p>
      </div>
    `;

    return;
  }


  list.forEach(product => {

    const isWishlisted =
      wishlist.includes(product.id);


    const card =
      document.createElement("div");

    card.className = "product";


    card.innerHTML = `

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:8px;
      ">

        <span style="
          background:#eff6ff;
          color:#2563eb;
          padding:5px 9px;
          border-radius:20px;
          font-size:11px;
          font-weight:700;
        ">
          ${product.badge}
        </span>

        <button
          class="wishlist-button"
          onclick="toggleWishlist(${product.id})"
          title="Wishlist"
        >
          ${isWishlisted ? "❤️" : "♡"}
        </button>

      </div>


      <img
        src="${product.image}"
        alt="${product.name}"
        onclick="openProductDetails(${product.id})"
      >


      <h3
        onclick="openProductDetails(${product.id})"
      >
        ${product.name}
      </h3>


      <div class="rating">
        ⭐ ${product.rating}
        <span style="
          color:#94a3b8;
          font-size:12px;
        ">
          (${product.reviews})
        </span>
      </div>


      <div class="price">
        ₹${product.price.toLocaleString("en-IN")}

        <span style="
          font-size:13px;
          color:#94a3b8;
          text-decoration:line-through;
          font-weight:400;
          margin-left:5px;
        ">
          ₹${product.oldPrice.toLocaleString("en-IN")}
        </span>
      </div>


      <div class="product-buttons">

        <button
          class="add-cart"
          onclick="addToCart(${product.id})"
        >
          🛒 Add to Cart
        </button>

        <button
          class="wishlist-button"
          onclick="toggleWishlist(${product.id})"
        >
          ${isWishlisted ? "❤️" : "♡"}
        </button>

      </div>

    `;


    container.appendChild(card);

  });

}


/* ================= ADD TO CART ================= */

function addToCart(id) {

  const product =
    products.find(p => p.id === id);

  if (!product) return;


  const existing =
    cart.find(item => item.id === id);


  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }


  updateCart();


  alert(`${product.name} added to your cart!`);

}


/* ================= UPDATE CART ================= */

function updateCart() {

  const count =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  const countElement =
    document.getElementById("cartCount");

  if (countElement) {
    countElement.textContent = count;
  }


  const container =
    document.getElementById("cartItems");

  if (!container) return;


  container.innerHTML = "";


  let total = 0;


  if (cart.length === 0) {

    container.innerHTML = `

      <div style="
        text-align:center;
        padding:60px 15px;
        color:#64748b;
      ">

        <div style="font-size:50px;">
          🛒
        </div>

        <h3 style="
          color:#0f172a;
          margin-top:15px;
        ">
          Your cart is empty
        </h3>

        <p style="margin-top:8px;">
          Add some products to get started.
        </p>

      </div>

    `;

  }


  cart.forEach(item => {

    total +=
      item.price * item.quantity;


    const div =
      document.createElement("div");

    div.className = "cart-item";


    div.innerHTML = `

      <img
        src="${item.image}"
        alt="${item.name}"
      >

      <div style="flex:1">

        <strong>
          ${item.name}
        </strong>

        <p>
          ₹${item.price.toLocaleString("en-IN")}
        </p>

        <p>
          Quantity:
          <strong>
            ${item.quantity}
          </strong>
        </p>


        <div>

          <button
            onclick="decrease(${item.id})"
          >
            −
          </button>

          <button
            onclick="increase(${item.id})"
          >
            +
          </button>

          <button
            onclick="removeFromCart(${item.id})"
          >
            Remove
          </button>

        </div>

      </div>

    `;


    container.appendChild(div);

  });


  const totalElement =
    document.getElementById("cartTotal");


  if (totalElement) {

    totalElement.textContent =
      total.toLocaleString("en-IN");

  }

}


/* ================= INCREASE ================= */

function increase(id) {

  const item =
    cart.find(item => item.id === id);


  if (item) {

    item.quantity++;

  }


  updateCart();

}


/* ================= DECREASE ================= */

function decrease(id) {

  const item =
    cart.find(item => item.id === id);


  if (!item) return;


  item.quantity--;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        item => item.id !== id
      );

  }


  updateCart();

}


/* ================= REMOVE ================= */

function removeFromCart(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );


  updateCart();

}


/* ================= SEARCH ================= */

function searchProducts() {

  const input =
    document.getElementById("searchInput");


  if (!input) return;


  const query =
    input.value
      .trim()
      .toLowerCase();


  if (query === "") {

    displayProducts(products);

    return;

  }


  const results =
    products.filter(product =>
      product.name
        .toLowerCase()
        .includes(query)
    );


  displayProducts(results);

}


/* ================= CATEGORY ================= */

function filterCategory(category) {

  if (category === "all") {

    displayProducts(products);

  } else {

    const filtered =
      products.filter(
        product =>
          product.category === category
      );

    displayProducts(filtered);

  }


  scrollToProducts();

}


/* ================= OPEN CART ================= */

function openCart() {

  const panel =
    document.getElementById("cartPanel");

  const overlay =
    document.getElementById("overlay");


  if (panel) {

    panel.classList.add("open");

  }


  if (overlay) {

    overlay.classList.add("show");

  }

}


/* ================= CLOSE CART ================= */

function closeCart() {

  const panel =
    document.getElementById("cartPanel");


  if (panel) {

    panel.classList.remove("open");

  }


  closeOverlay();

}


/* ================= WISHLIST ================= */

function toggleWishlist(id) {

  if (wishlist.includes(id)) {

    wishlist =
      wishlist.filter(
        item => item !== id
      );

  } else {

    wishlist.push(id);

  }


  updateWishlist();

  displayProducts(
    getCurrentlyDisplayedProducts()
  );

}


/* ================= GET DISPLAYED PRODUCTS ================= */

function getCurrentlyDisplayedProducts() {

  const input =
    document.getElementById("searchInput");


  if (
    !input ||
    input.value.trim() === ""
  ) {

    return products;

  }


  const query =
    input.value
      .trim()
      .toLowerCase();


  return products.filter(product =>
    product.name
      .toLowerCase()
      .includes(query)
  );

}


/* ================= UPDATE WISHLIST ================= */

function updateWishlist() {

  const count =
    document.getElementById(
      "wishlistCount"
    );


  if (count) {

    count.textContent =
      wishlist.length;

  }


  const container =
    document.getElementById(
      "wishlistItems"
    );


  if (!container) return;


  container.innerHTML = "";


  if (wishlist.length === 0) {

    container.innerHTML = `

      <div style="
        text-align:center;
        padding:60px 15px;
        color:#64748b;
      ">

        <div style="font-size:50px;">
          ♡
        </div>

        <h3 style="
          color:#0f172a;
          margin-top:15px;
        ">
          Your wishlist is empty
        </h3>

        <p style="margin-top:8px;">
          Save products you love here.
        </p>

      </div>

    `;

    return;

  }


  wishlist.forEach(id => {

    const product =
      products.find(
        p => p.id === id
      );


    if (!product) return;


    const item =
      document.createElement("div");


    item.className =
      "wishlist-item";


    item.innerHTML = `

      <img
        src="${product.image}"
        alt="${product.name}"
      >

      <div style="flex:1">

        <strong>
          ${product.name}
        </strong>

        <div style="
          font-weight:800;
          margin-top:5px;
        ">
          ₹${product.price.toLocaleString("en-IN")}
        </div>

        <button
          onclick="addToCart(${product.id})"
        >
          🛒 Add to Cart
        </button>

        <button
          onclick="toggleWishlist(${product.id})"
        >
          Remove
        </button>

      </div>

    `;


    container.appendChild(item);

  });

}


/* ================= OPEN WISHLIST ================= */

function openWishlist() {

  const panel =
    document.getElementById(
      "wishlistPanel"
    );


  const overlay =
    document.getElementById("overlay");


  if (panel) {

    panel.classList.add("open");

  }


  if (overlay) {

    overlay.classList.add("show");

  }

}


/* ================= CLOSE WISHLIST ================= */

function closeWishlist() {

  const panel =
    document.getElementById(
      "wishlistPanel"
    );


  if (panel) {

    panel.classList.remove("open");

  }


  closeOverlay();

}


/* ================= PRODUCT DETAILS ================= */

function openProductDetails(id) {

  const product =
    products.find(
      p => p.id === id
    );


  if (!product) return;


  const modal =
    document.getElementById(
      "productModal"
    );


  const details =
    document.getElementById(
      "productDetails"
    );


  if (!modal || !details) return;


  details.innerHTML = `

    <div class="product-detail">

      <div>

        <img
          src="${product.image}"
          alt="${product.name}"
        >

      </div>


      <div>

        <span style="
          display:inline-block;
          background:#eff6ff;
          color:#2563eb;
          padding:6px 12px;
          border-radius:20px;
          font-size:12px;
          font-weight:700;
        ">
          ${product.badge}
        </span>


        <h2 style="margin-top:15px;">
          ${product.name}
        </h2>


        <div class="rating">
          ⭐ ${product.rating}
          (${product.reviews} reviews)
        </div>


        <div class="detail-price">
          ₹${product.price.toLocaleString("en-IN")}
        </div>


        <p class="detail-description">
          Premium quality product available
          at Zentromax. Enjoy reliable quality,
          great value and a smooth shopping
          experience.
        </p>


        <div style="
          margin-bottom:20px;
          color:#16a34a;
          font-weight:700;
        ">
          ✓ In Stock
        </div>


        <button
          class="detail-add-cart"
          onclick="addToCart(${product.id}); closeProductDetails();"
        >
          🛒 Add to Cart
        </button>

        <button
          class="wishlist-button"
          style="
            margin-left:8px;
            vertical-align:middle;
          "
          onclick="toggleWishlist(${product.id})"
        >
          ${
            wishlist.includes(product.id)
              ? "❤️"
              : "♡"
          }
        </button>

      </div>

    </div>

  `;


  modal.classList.add("show");

}


/* ================= CLOSE PRODUCT ================= */

function closeProductDetails() {

  const modal =
    document.getElementById(
      "productModal"
    );


  if (modal) {

    modal.classList.remove("show");

  }

}


/* ================= LOGIN ================= */

function openLogin() {

  const modal =
    document.getElementById(
      "loginModal"
    );


  if (modal) {

    modal.classList.add("show");

  }

}


function closeLogin() {

  const modal =
    document.getElementById(
      "loginModal"
    );


  if (modal) {

    modal.classList.remove("show");

  }

}


/* ================= LOGIN USER ================= */

function loginUser() {

  const email =
    document.getElementById(
      "loginEmail"
    ).value.trim();


  const password =
    document.getElementById(
      "loginPassword"
    ).value.trim();


  if (!email || !password) {

    alert(
      "Please enter your email and password."
    );

    return;

  }


  alert(
    `Welcome to Zentromax!`
  );


  closeLogin();

}


/* ================= REGISTER ================= */

function registerUser() {

  alert(
    "Registration system will be connected to a database in the next step."
  );

}


/* ================= CHECKOUT ================= */

function checkout() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty!"
    );

    return;

  }


  alert(
    "Checkout page will be connected in the next step."
  );

}


/* ================= SCROLL ================= */

function scrollToProducts() {

  const section =
    document.getElementById(
      "productsTitle"
    );


  if (section) {

    section.scrollIntoView({
      behavior: "smooth"
    });

  }

}


/* ================= OVERLAY ================= */

function closeOverlay() {

  const overlay =
    document.getElementById("overlay");


  if (overlay) {

    overlay.classList.remove("show");

  }

}


/* ================= CLOSE EVERYTHING ================= */

function closeAllPanels() {

  closeCart();

  closeWishlist();

  closeProductDetails();

  closeLogin();

}


/* ================= INITIAL LOAD ================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    displayProducts();

    updateCart();

    updateWishlist();

  }
);
