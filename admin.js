// ===============================
// ZENTROMAX ADMIN PANEL
// ===============================

// Default Products
const defaultProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "electronics",
    price: 1499,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "electronics",
    price: 2499,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Men's Casual Shirt",
    category: "fashion",
    price: 899,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    name: "Women's Fashion Bag",
    category: "fashion",
    price: 1299,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    name: "Modern Table Lamp",
    category: "home",
    price: 799,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    name: "The Psychology of Money",
    category: "books",
    price: 399,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    name: "Skincare Beauty Set",
    category: "beauty",
    price: 999,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    category: "electronics",
    price: 1199,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80"
  }
];


// ===============================
// LOCAL STORAGE
// ===============================

let products =
  JSON.parse(localStorage.getItem("zentromaxProducts")) ||
  defaultProducts;

let orders =
  JSON.parse(localStorage.getItem("zentromaxOrders")) ||
  [];


// Save products
function saveProducts() {
  localStorage.setItem(
    "zentromaxProducts",
    JSON.stringify(products)
  );
}


// Save orders
function saveOrders() {
  localStorage.setItem(
    "zentromaxOrders",
    JSON.stringify(orders)
  );
}


// ===============================
// PAGE NAVIGATION
// ===============================

function showSection(sectionName) {

  const sections =
    document.querySelectorAll(".section");

  sections.forEach(section => {
    section.classList.remove("active-section");
  });


  const selected =
    document.getElementById(sectionName);

  if (selected) {
    selected.classList.add("active-section");
  }


  // Sidebar active button
  const buttons =
    document.querySelectorAll(".sidebar nav button");

  buttons.forEach(button => {
    button.classList.remove("active");
  });


  buttons.forEach(button => {

    if (
      button.getAttribute("onclick") &&
      button.getAttribute("onclick")
        .includes("'" + sectionName + "'")
    ) {
      button.classList.add("active");
    }

  });


  const titles = {
    dashboard: "Dashboard",
    products: "Products",
    orders: "Orders",
    customers: "Customers",
    settings: "Store Settings"
  };


  const title =
    document.getElementById("pageTitle");

  if (title) {
    title.textContent =
      titles[sectionName] || "Dashboard";
  }


  if (sectionName === "products") {
    renderProducts();
  }

  if (sectionName === "orders") {
    renderOrders();
  }

  if (sectionName === "dashboard") {
    updateDashboard();
  }
}


// ===============================
// DASHBOARD
// ===============================

function updateDashboard() {

  const totalProducts =
    document.getElementById("totalProducts");

  const totalOrders =
    document.getElementById("totalOrders");

  const totalCustomers =
    document.getElementById("totalCustomers");

  const totalSales =
    document.getElementById("totalSales");


  if (totalProducts) {
    totalProducts.textContent =
      products.length;
  }


  if (totalOrders) {
    totalOrders.textContent =
      orders.length;
  }


  if (totalCustomers) {

    const customers =
      new Set(
        orders.map(order => order.customer)
      );

    totalCustomers.textContent =
      customers.size || 0;
  }


  let sales = 0;

  orders.forEach(order => {
    sales += Number(order.total) || 0;
  });


  if (totalSales) {

    totalSales.textContent =
      "₹" +
      sales.toLocaleString("en-IN");
  }


  renderRecentOrders();
}


// ===============================
// RECENT ORDERS
// ===============================

function renderRecentOrders() {

  const container =
    document.getElementById("recentOrders");

  if (!container) return;


  if (orders.length === 0) {

    container.innerHTML = `
      <div class="empty">
        No orders yet.
      </div>
    `;

    return;
  }


  const recent =
    orders.slice(-5).reverse();


  container.innerHTML =
    recent.map(order => `

      <div class="order-row">

        <div>

          <div class="order-id">
            #${order.id}
          </div>

          <div class="order-customer">
            ${escapeHTML(order.customer)}
          </div>

        </div>

        <div class="order-price">
          ₹${Number(order.total).toLocaleString("en-IN")}
        </div>

        <span class="status">
          ${escapeHTML(order.status || "Pending")}
        </span>

      </div>

    `).join("");
}


// ===============================
// PRODUCTS
// ===============================

function renderProducts() {

  const container =
    document.getElementById("productTable");

  if (!container) return;


  const searchInput =
    document.getElementById("productSearch");

  const query =
    searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";


  const filtered =
    products.filter(product => {

      return (
        product.name
          .toLowerCase()
          .includes(query) ||

        product.category
          .toLowerCase()
          .includes(query)
      );

    });


  if (filtered.length === 0) {

    container.innerHTML = `
      <p style="padding:20px;color:#64748b">
        No products found.
      </p>
    `;

    return;
  }


  container.innerHTML = `

    <div class="table-wrapper">

      <table class="admin-table">

        <thead>

          <tr>

            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          ${filtered.map(product => `

            <tr>

              <td>

                <div class="product-info">

                  <img
                    src="${product.image}"
                    alt="${escapeHTML(product.name)}"
                  >

                  <div>

                    <div class="product-name">
                      ${escapeHTML(product.name)}
                    </div>

                    <div class="product-category">
                      ID: ${product.id}
                    </div>

                  </div>

                </div>

              </td>


              <td>
                ${capitalize(product.category)}
              </td>


              <td>
                ₹${Number(product.price).toLocaleString("en-IN")}
              </td>


              <td>
                ⭐ ${product.rating}
              </td>


              <td>

                <button
                  class="edit-btn"
                  onclick="editProduct(${product.id})">

                  ✏️ Edit

                </button>


                <button
                  class="delete-btn"
                  onclick="deleteProduct(${product.id})">

                  🗑️ Delete

                </button>

              </td>

            </tr>

          `).join("")}

        </tbody>

      </table>

    </div>
  `;
}


// ===============================
// OPEN PRODUCT FORM
// ===============================

function openProductForm() {

  const modal =
    document.getElementById("productModal");

  if (!modal) return;


  document.getElementById("formTitle")
    .textContent = "Add Product";


  document.getElementById("editProductId")
    .value = "";


  document.getElementById("productName")
    .value = "";


  document.getElementById("productCategory")
    .value = "electronics";


  document.getElementById("productPrice")
    .value = "";


  document.getElementById("productRating")
    .value = "4.5";


  document.getElementById("productImage")
    .value = "";


  modal.classList.add("show");
}


// ===============================
// CLOSE PRODUCT FORM
// ===============================

function closeProductForm() {

  const modal =
    document.getElementById("productModal");

  if (modal) {
    modal.classList.remove("show");
  }
}


// ===============================
// SAVE PRODUCT
// ===============================

function saveProduct(event) {

  event.preventDefault();


  const id =
    document.getElementById("editProductId")
      .value;


  const name =
    document.getElementById("productName")
      .value.trim();


  const category =
    document.getElementById("productCategory")
      .value;


  const price =
    Number(
      document.getElementById("productPrice")
        .value
    );


  const rating =
    Number(
      document.getElementById("productRating")
        .value
    );


  const image =
    document.getElementById("productImage")
      .value.trim();


  if (!name || !price || !image) {

    alert("Please fill all required fields.");

    return;
  }


  if (id) {

    // EDIT PRODUCT

    const product =
      products.find(
        product =>
          product.id === Number(id)
      );


    if (product) {

      product.name = name;
      product.category = category;
      product.price = price;
      product.rating = rating;
      product.image = image;

    }

  } else {

    // ADD PRODUCT

    const newProduct = {

      id:
        Date.now(),

      name:
        name,

      category:
        category,

      price:
        price,

      rating:
        rating,

      image:
        image

    };


    products.push(newProduct);

  }


  saveProducts();

  renderProducts();

  updateDashboard();

  closeProductForm();


  alert(
    id
      ? "Product updated successfully!"
      : "Product added successfully!"
  );
}


// ===============================
// EDIT PRODUCT
// ===============================

function editProduct(id) {

  const product =
    products.find(
      product =>
        product.id === Number(id)
    );


  if (!product) return;


  document.getElementById("formTitle")
    .textContent = "Edit Product";


  document.getElementById("editProductId")
    .value = product.id;


  document.getElementById("productName")
    .value = product.name;


  document.getElementById("productCategory")
    .value = product.category;


  document.getElementById("productPrice")
    .value = product.price;


  document.getElementById("productRating")
    .value = product.rating;


  document.getElementById("productImage")
    .value = product.image;


  document.getElementById("productModal")
    .classList.add("show");
}


// ===============================
// DELETE PRODUCT
// ===============================

function deleteProduct(id) {

  const product =
    products.find(
      product =>
        product.id === Number(id)
    );


  if (!product) return;


  const confirmed =
    confirm(
      `Delete "${product.name}"?`
    );


  if (!confirmed) return;


  products =
    products.filter(
      product =>
        product.id !== Number(id)
    );


  saveProducts();

  renderProducts();

  updateDashboard();


  alert("Product deleted.");
}


// ===============================
// ORDERS
// ===============================

function renderOrders() {

  const container =
    document.getElementById("ordersTable");

  if (!container) return;


  if (orders.length === 0) {

    container.innerHTML = `
      <div class="empty">
        <h3>No Orders Yet</h3>
        <p>Customer orders will appear here.</p>
      </div>
    `;

    return;
  }


  container.innerHTML = `

    <div class="table-wrapper">

      <table class="admin-table">

        <thead>

          <tr>

            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          ${orders.slice().reverse().map(order => `

            <tr>

              <td>
                <strong>#${order.id}</strong>
              </td>

              <td>
                ${escapeHTML(order.customer)}
              </td>

              <td>
                ${escapeHTML(order.date || "-")}
              </td>

              <td>
                <strong>
                  ₹${Number(order.total).toLocaleString("en-IN")}
                </strong>
              </td>

              <td>

                <span class="status">
                  ${escapeHTML(order.status || "Pending")}
                </span>

              </td>

            </tr>

          `).join("")}

        </tbody>

      </table>

    </div>

  `;
}


// ===============================
// SETTINGS
// ===============================

function saveSettings() {

  const name =
    document.getElementById("storeName")
      .value.trim();


  const logo =
    document.getElementById("logoLetter")
      .value.trim();


  const description =
    document.getElementById("storeDescription")
      .value.trim();


  const settings = {

    name:
      name || "Zentromax",

    logo:
      logo || "Z",

    description:
      description ||
      "Smart Shopping. Better Living."

  };


  localStorage.setItem(
    "zentromaxSettings",
    JSON.stringify(settings)
  );


  document.title =
    settings.name + " Admin";


  document.querySelector(".brand span")
    .textContent =
    settings.name;


  document.querySelector(".brand-logo")
    .textContent =
    settings.logo;


  alert("Settings saved successfully!");
}


// ===============================
// LOAD SETTINGS
// ===============================

function loadSettings() {

  const settings =
    JSON.parse(
      localStorage.getItem(
        "zentromaxSettings"
      )
    );


  if (!settings) return;


  const storeName =
    document.getElementById("storeName");

  const logoLetter =
    document.getElementById("logoLetter");

  const storeDescription =
    document.getElementById("storeDescription");


  if (storeName) {
    storeName.value =
      settings.name;
  }


  if (logoLetter) {
    logoLetter.value =
      settings.logo;
  }


  if (storeDescription) {
    storeDescription.value =
      settings.description;
  }


  document.querySelector(".brand span")
    .textContent =
    settings.name;


  document.querySelector(".brand-logo")
    .textContent =
    settings.logo;


  document.title =
    settings.name + " Admin";
}


// ===============================
// LOGOUT
// ===============================

function logout() {

  const confirmLogout =
    confirm(
      "Are you sure you want to logout?"
    );


  if (!confirmLogout) return;


  alert(
    "Logout system will be connected with login in the next step."
  );
}


// ===============================
// HELPER FUNCTIONS
// ===============================

function capitalize(text) {

  if (!text) return "";

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  );
}


function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// ===============================
// INITIALIZE
// ===============================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    updateDashboard();

    renderProducts();

    renderOrders();

    loadSettings();

  }
);


// ===============================
// CLOSE MODAL BY CLICKING OUTSIDE
// ===============================

document.addEventListener(
  "click",
  function (event) {

    const modal =
      document.getElementById("productModal");


    if (
      modal &&
      event.target === modal
    ) {

      closeProductForm();

    }

  }
);
