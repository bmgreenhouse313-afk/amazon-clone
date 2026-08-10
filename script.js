/* =====================================================
   ZENTROMAX
   COMPLETE JAVASCRIPT
   ===================================================== */


/* =====================================================
   PRODUCTS
   ===================================================== */

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
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description:
      "Enjoy clear sound, deep bass and comfortable wireless listening with these premium Bluetooth headphones."
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
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description:
      "A stylish smart watch designed to keep you connected, active and organized throughout the day."
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
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=600&q=80",
    description:
      "A comfortable and stylish casual shirt suitable for everyday wear and modern outfits."
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
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
    description:
      "A modern fashion bag with an elegant design, perfect for everyday use and special occasions."
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
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    description:
      "Add a modern touch to your home with this elegant and practical table lamp."
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
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
    description:
      "A popular book about money, investing, behavior and building a better relationship with finances."
  },


  {
    id: 7,
    name: "Skincare Beauty Set",
    category: "beauty",
    price: 999,
    oldPrice: 1399,
    rating: 4.5,
    reviews: 87,
    badge: "Beauty Pick",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=600&q=80",
    description:
      "A carefully selected skincare beauty set for a simple and refreshing daily routine."
  },


  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    category: "electronics",
    price: 1199,
    oldPrice: 1599,
    rating: 4.4,
    reviews: 103,
    badge: "Hot Deal",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    description:
      "Take your music anywhere with this compact portable Bluetooth speaker with powerful sound."
  }

];


/* =====================================================
   STATE
   ===================================================== */

let cart = [];

let wishlist = [];


/* =====================================================
   DISPLAY PRODUCTS
   ===================================================== */

function displayProducts(list = products) {

  const container =
    document.getElementById("products");


  if (!container) return;


  container.innerHTML = "";


  if (list.length === 0) {

    container.innerHTML = `

      <div class="empty-cart">

        <div class="empty-cart-icon">
          🔎
        </div>

        <h3>
          No products found
        </h3>

        <p>
          Try another search.
        </p>

      </div>

    `;

    return;

  }


  list.forEach(product => {

    const card =
      document.createElement("article");


    card.className = "product";


    const isWishlisted =
      wishlist.includes(product.id);


    card.innerHTML = `

      <span class="product-badge">
        ${product.badge}
      </span>


      <button
        class="product-wishlist ${
          isWishlisted ? "active" : ""
        }"
        onclick="
          event.stopPropagation();
          toggleWishlist(${product.id});
        "
      >
        ${isWishlisted ? "♥" : "♡"}
      </button>


      <div
        class="product-image-box"
        onclick="openProductDetails(${product.id})"
      >

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

      </div>


      <h3
        onclick="openProductDetails(${product.id})"
      >
        ${product.name}
      </h3>


      <div class="rating">

        ⭐ ${product.rating}

        <span>
          (${product.reviews})
        </span>

      </div>


      <div class="price">

        ₹${product.price.toLocaleString("en-IN")}

        <span class="old-price">
          ₹${product.oldPrice.toLocaleString("en-IN")}
        </span>

      </div>


      <div class="product-bottom">

        <button
          class="add-cart"
          onclick="
            event.stopPropagation();
            addToCart(${product.id});
          "
        >
          🛒 Add to Cart
        </button>


        <button
          class="view-product"
          onclick="
            event.stopPropagation();
            openProductDetails(${product.id});
          "
          title="View Product"
        >
          👁
        </button>

      </div>

    `;


    container.appendChild(card);

  });

}


/* =====================================================
   CART
   ===================================================== */

function addToCart(id) {

  const product =
    products.find(
      product => product.id === id
    );


  if (!product) return;


  const existing =
    cart.find(
      item => item.id === id
    );


  if (existing) {

    existing.quantity++;

  } else {

    cart.push({

      ...product,

      quantity: 1

    });

  }


  updateCart();


  /* Small feedback */

  showToast(
    `${product.name} added to cart`
  );

}


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

    countElement.textContent =
      count;

  }


  const container =
    document.getElementById("cartItems");


  if (!container) return;


  if (cart.length === 0) {

    container.innerHTML = `

      <div class="empty-cart">

        <div class="empty-cart-icon">
          🛒
        </div>

        <h3>
          Your cart is empty
        </h3>

        <p>
          Add some products to get started.
        </p>

      </div>

    `;

    updateCartTotal();

    return;

  }


  container.innerHTML = "";


  cart.forEach(item => {

    const div =
      document.createElement("div");


    div.className =
      "cart-item";


    div.innerHTML = `

      <img
        src="${item.image}"
        alt="${item.name}"
      >


      <div class="cart-item-content">

        <div class="cart-item-name">
          ${item.name}
        </div>


        <div class="cart-item-price">
          ₹${item.price.toLocaleString("en-IN")}
        </div>


        <div class="quantity-controls">

          <button
            onclick="decreaseQuantity(${item.id})"
          >
            −
          </button>


          <strong>
            ${item.quantity}
          </strong>


          <button
            onclick="increaseQuantity(${item.id})"
          >
            +
          </button>


          <button
            class="remove-button"
            onclick="removeFromCart(${item.id})"
          >
            Remove
          </button>

        </div>

      </div>

    `;


    container.appendChild(div);

  });


  updateCartTotal();

}


function updateCartTotal() {

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.quantity,
      0
    );


  const totalElement =
    document.getElementById("cartTotal");


  if (totalElement) {

    totalElement.textContent =
      total.toLocaleString("en-IN");

  }

}


function increaseQuantity(id) {

  const item =
    cart.find(
      item => item.id === id
    );


  if (item) {

    item.quantity++;

  }


  updateCart();

}


function decreaseQuantity(id) {

  const item =
    cart.find(
      item => item.id === id
    );


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


function removeFromCart(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );


  updateCart();

}


/* =====================================================
   OPEN / CLOSE CART
   ===================================================== */

function openCart() {

  const cartPanel =
    document.getElementById("cartPanel");

  const wishlistPanel =
    document.getElementById("wishlistPanel");

  const overlay =
    document.getElementById("overlay");


  wishlistPanel.classList.remove("open");

  cartPanel.classList.add("open");

  overlay.classList.add("show");

  document.body.style.overflow =
    "hidden";

}


function closeCart() {

  const cartPanel =
    document.getElementById("cartPanel");

  const overlay =
    document.getElementById("overlay");


  cartPanel.classList.remove("open");

  overlay.classList.remove("show");

  document.body.style.overflow =
    "";

}


/* =====================================================
   WISHLIST
   ===================================================== */

function toggleWishlist(id) {

  if (wishlist.includes(id)) {

    wishlist =
      wishlist.filter(
        item => item !== id
      );

    showToast(
      "Removed from wishlist"
    );

  } else {

    wishlist.push(id);

    showToast(
      "Added to wishlist ❤️"
    );

  }


  updateWishlist();

  displayProducts();

}


function addToWishlist(id) {

  if (!wishlist.includes(id)) {

    wishlist.push(id);

  }


  updateWishlist();

  displayProducts();

  showToast(
    "Added to wishlist ❤️"
  );

}


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


  if (wishlist.length === 0) {

    container.innerHTML = `

      <div class="empty-cart">

        <div class="empty-cart-icon">
          ❤️
        </div>

        <h3>
          Your wishlist is empty
        </h3>

        <p>
          Save products you love here.
        </p>

      </div>

    `;

    return;

  }


  container.innerHTML = "";


  wishlist.forEach(id => {

    const product =
      products.find(
        item => item.id === id
      );


    if (!product) return;


    const div =
      document.createElement("div");


    div.className =
      "wishlist-item";


    div.innerHTML = `

      <img
        src="${product.image}"
        alt="${product.name}"
      >


      <div class="wishlist-item-info">

        <h4>
          ${product.name}
        </h4>


        <strong>
          ₹${product.price.toLocaleString("en-IN")}
        </strong>


        <button
          class="add-cart"
          onclick="addToCart(${product.id})"
        >
          Add to Cart
        </button>

      </div>

    `;


    container.appendChild(div);

  });

}


function openWishlist() {

  const wishlistPanel =
    document.getElementById(
      "wishlistPanel"
    );

  const cartPanel =
    document.getElementById(
      "cartPanel"
    );

  const overlay =
    document.getElementById("overlay");


  cartPanel.classList.remove("open");

  wishlistPanel.classList.add("open");

  overlay.classList.add("show");

  document.body.style.overflow =
    "hidden";

}


function closeWishlist() {

  const wishlistPanel =
    document.getElementById(
      "wishlistPanel"
    );

  const overlay =
    document.getElementById("overlay");


  wishlistPanel.classList.remove(
    "open"
  );

  overlay.classList.remove("show");

  document.body.style.overflow =
    "";

}


function closeAllPanels() {

  closeCart();

  closeWishlist();

}


/* =====================================================
   PRODUCT DETAILS
   ===================================================== */

function openProductDetails(id) {

  const product =
    products.find(
      item => item.id === id
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


  const isWishlisted =
    wishlist.includes(product.id);


  details.innerHTML = `

    <div class="product-detail">


      <div class="detail-image-box">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

      </div>


      <div>


        <span class="detail-category">

          ${product.category}

        </span>


        <h2>
          ${product.name}
        </h2>


        <div class="detail-rating">

          ⭐ ${product.rating}

          <span style="color:#94a3b8;">
            (${product.reviews} reviews)
          </span>

        </div>


        <div class="detail-price">

          ₹${product.price.toLocaleString("en-IN")}

          <span class="old-price">
            ₹${product.oldPrice.toLocaleString("en-IN")}
          </span>

        </div>


        <div class="detail-stock">
          ✓ In Stock
        </div>


        <p class="detail-description">
          ${product.description}
        </p>


        <div class="detail-actions">

          <button
            class="detail-cart"
            onclick="
              addToCart(${product.id});
              closeProductDetails();
            "
          >
            🛒 Add to Cart
          </button>


          <button
            class="detail-wishlist"
            onclick="
              toggleWishlist(${product.id});
              updateProductModal(${product.id});
            "
          >
            ${isWishlisted ? "♥" : "♡"}
          </button>

        </div>


        <div style="
          margin-top:25px;
          padding-top:20px;
          border-top:1px solid #e2e8f0;
          color:#64748b;
          line-height:2;
        ">

          🚚 Fast Delivery

          <br>

          🔒 Secure Shopping

          <br>

          ↩️ Easy Returns

        </div>


      </div>

    </div>

  `;


  modal.classList.add("show");

  document.body.style.overflow =
    "hidden";

}


function updateProductModal(id) {

  const product =
    products.find(
      item => item.id === id
    );


  if (product) {

    openProductDetails(id);

  }

}


function closeProductDetails() {

  const modal =
    document.getElementById(
      "productModal"
    );


  modal.classList.remove("show");

  document.body.style.overflow =
    "";

}


/* =====================================================
   SEARCH
   ===================================================== */

function searchProducts() {

  const input =
    document.getElementById(
      "searchInput"
    );


  const query =
    input.value
      .trim()
      .toLowerCase();


  const results =
    products.filter(product =>
      product.name
        .toLowerCase()
        .includes(query)
      ||
      product.category
        .toLowerCase()
        .includes(query)
    );


  displayProducts(results);


  const title =
    document.getElementById(
      "productsTitle"
    );


  if (query) {

    title.textContent =
      `Search results for "${query}"`;

  } else {

    title.textContent =
      "Today's Picks";

  }

}


/* =====================================================
   CATEGORY
   ===================================================== */

function filterCategory(category) {

  if (category === "all") {

    displayProducts(products);

    document.getElementById(
      "productsTitle"
    ).textContent =
      "Today's Picks";

    return;

  }


  const filtered =
    products.filter(
      product =>
        product.category === category
    );


  displayProducts(filtered);


  document.getElementById(
    "productsTitle"
  ).textContent =
    category.charAt(0).toUpperCase() +
    category.slice(1);

}


/* =====================================================
   SCROLL
   ===================================================== */

function scrollToProducts() {

  const section =
    document.getElementById(
      "products"
    );


  section.scrollIntoView({
    behavior: "smooth"
  });

}


/* =====================================================
   HOME
   ===================================================== */

function goHome() {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });


  const input =
    document.getElementById(
      "searchInput"
    );


  if (input) {

    input.value = "";

  }


  displayProducts(products);

  document.getElementById(
    "productsTitle"
  ).textContent =
    "Today's Picks";

}


/* =====================================================
   CHECKOUT
   ===================================================== */

function checkout() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty. Please add a product first."
    );

    return;

  }


  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.quantity,
      0
    );


  alert(
    `Checkout\n\nOrder Total: ₹${total.toLocaleString("en-IN")}\n\nCheckout system will be connected in the next step.`
  );

}


/* =====================================================
   TOAST
   ===================================================== */

function showToast(message) {

  const oldToast =
    document.querySelector(
      ".zentromax-toast"
    );


  if (oldToast) {

    oldToast.remove();

  }


  const toast =
    document.createElement("div");


  toast.className =
    "zentromax-toast";


  toast.textContent =
    message;


  toast.style.position =
    "fixed";

  toast.style.bottom =
    "25px";

  toast.style.left =
    "50%";

  toast.style.transform =
    "translateX(-50%)";

  toast.style.background =
    "#0f172a";

  toast.style.color =
    "white";

  toast.style.padding =
    "13px 22px";

  toast.style.borderRadius =
    "10px";

  toast.style.fontWeight =
    "700";

  toast.style.zIndex =
    "10000";

  toast.style.boxShadow =
    "0 10px 30px rgba(0,0,0,.2)";


  document.body.appendChild(
    toast
  );


  setTimeout(() => {

    toast.remove();

  }, 2000);

}


/* =====================================================
   MODAL CLICK / ESC
   ===================================================== */

document.addEventListener(
  "click",
  function(event) {

    const modal =
      document.getElementById(
        "productModal"
      );


    if (
      event.target === modal
    ) {

      closeProductDetails();

    }

  }
);


document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Escape"
    ) {

      closeProductDetails();

      closeAllPanels();

    }

  }
);


/* =====================================================
   INITIAL LOAD
   ===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    displayProducts();

    updateCart();

    updateWishlist();

  }
);
