/* =========================
   SELLER LOGIN CHECK
========================= */

const currentSeller = JSON.parse(
  localStorage.getItem("zentromaxSeller")
);

if (!currentSeller) {
  window.location.href = "seller-login.html";
}


/* =========================
   SELLER PRODUCTS
========================= */

let sellerProducts = JSON.parse(
  localStorage.getItem("zentromaxProducts")
) || [];


/*
  IMPORTANT:
  ಪ್ರತಿಯೊಂದು productಗೆ sellerId save ಮಾಡಲಾಗುತ್ತದೆ.
  ಆದ್ದರಿಂದ seller ತನ್ನ products ಮಾತ್ರ ನೋಡುತ್ತಾನೆ.
*/

function getMyProducts() {
  return sellerProducts.filter(
    product => product.sellerId === currentSeller.id
  );
}


/* =========================
   SELLER INFORMATION
========================= */

function loadSellerInformation() {

  document.getElementById("sellerName").textContent =
    currentSeller.name;

  document.getElementById("welcomeSeller").textContent =
    "Welcome, " + currentSeller.name;

  document.getElementById("profileName").textContent =
    currentSeller.name;

  document.getElementById("profileEmail").textContent =
    currentSeller.email;
}


/* =========================
   SECTION NAVIGATION
========================= */

function showSellerSection(section) {

  const sections = {
    dashboard: "sellerDashboard",
    products: "sellerProducts",
    orders: "sellerOrders",
    profile: "sellerProfile"
  };

  Object.values(sections).forEach(id => {
    document
      .getElementById(id)
      .classList.remove("active");
  });

  document
    .getElementById(sections[section])
    .classList.add("active");


  const titles = {
    dashboard: "Dashboard",
    products: "My Products",
    orders: "My Orders",
    profile: "My Profile"
  };

  document.getElementById(
    "sellerPageTitle"
  ).textContent = titles[section];


  document.querySelectorAll(".nav-btn").forEach(
    button => button.classList.remove("active")
  );

  const buttons = document.querySelectorAll(".nav-btn");

  const index = {
    dashboard: 0,
    products: 1,
    orders: 2,
    profile: 3
  };

  if (buttons[index[section]]) {
    buttons[index[section]]
      .classList.add("active");
  }


  if (section === "products") {
    renderSellerProducts();
  }

  if (section === "dashboard") {
    renderDashboardProducts();
  }

  if (section === "orders") {
    renderSellerOrders();
  }
}


/* =========================
   DASHBOARD PRODUCTS
========================= */

function renderDashboardProducts() {

  const container =
    document.getElementById(
      "dashboardProducts"
    );

  const products = getMyProducts();

  document.getElementById(
    "sellerProductCount"
  ).textContent = products.length;


  if (products.length === 0) {

    container.innerHTML = `
      <div class="empty-state">
        <h3>No products yet</h3>
        <p>Add your first product to start selling.</p>
      </div>
    `;

    return;
  }


  const latestProducts =
    products.slice(-5).reverse();


  container.innerHTML = `
    <div class="table-wrapper">

      <table class="seller-table">

        <thead>

          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
          </tr>

        </thead>

        <tbody>

          ${latestProducts.map(product => `

            <tr>

              <td>

                <div class="seller-product-info">

                  <img
                    src="${product.image}"
                    alt="${escapeHTML(product.name)}"
                  >

                  <div>

                    <div class="seller-product-name">
                      ${escapeHTML(product.name)}
                    </div>

                    <div class="seller-product-category">
                      ${escapeHTML(product.category)}
                    </div>

                  </div>

                </div>

              </td>

              <td>
                ${escapeHTML(product.category)}
              </td>

              <td>
                ₹${Number(product.price).toLocaleString("en-IN")}
              </td>

              <td>
                ⭐ ${product.rating}
              </td>

            </tr>

          `).join("")}

        </tbody>

      </table>

    </div>
  `;
}


/* =========================
   ALL MY PRODUCTS
========================= */

function renderSellerProducts() {

  const container =
    document.getElementById(
      "sellerProductTable"
    );

  const searchInput =
    document.getElementById(
      "sellerProductSearch"
    );

  const query =
    searchInput.value
      .trim()
      .toLowerCase();


  let products = getMyProducts();


  if (query) {

    products = products.filter(product =>
      product.name
        .toLowerCase()
        .includes(query)
    );

  }


  if (products.length === 0) {

    container.innerHTML = `
      <div class="empty-state">

        <h3>
          No products found
        </h3>

        <p>
          Add a product to your seller store.
        </p>

      </div>
    `;

    return;
  }


  container.innerHTML = `

    <div class="table-wrapper">

      <table class="seller-table">

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

          ${products.map(product => `

            <tr>

              <td>

                <div class="seller-product-info">

                  <img
                    src="${product.image}"
                    alt="${escapeHTML(product.name)}"
                  >

                  <div>

                    <div class="seller-product-name">
                      ${escapeHTML(product.name)}
                    </div>

                    <div class="seller-product-category">
                      Product ID: ${product.id}
                    </div>

                  </div>

                </div>

              </td>

              <td>
                ${escapeHTML(product.category)}
              </td>

              <td>
                ₹${Number(product.price).toLocaleString("en-IN")}
              </td>

              <td>
                ⭐ ${product.rating}
              </td>

              <td>

                <button
                  class="edit-product"
                  onclick="editSellerProduct('${product.id}')">

                  Edit

                </button>

                <button
                  class="delete-product"
                  onclick="deleteSellerProduct('${product.id}')">

                  Delete

                </button>

              </td>

            </tr>

          `).join("")}

        </tbody>

      </table>

    </div>
  `;
}


/* =========================
   ADD PRODUCT FORM
========================= */

function openSellerProductForm() {

  document.getElementById(
    "sellerProductModal"
  ).classList.add("show");


  document.getElementById(
    "sellerFormTitle"
  ).textContent = "Add Product";


  document.getElementById(
    "sellerProductForm"
  ).reset();


  document.getElementById(
    "sellerEditProductId"
  ).value = "";
}


function closeSellerProductForm() {

  document.getElementById(
    "sellerProductModal"
  ).classList.remove("show");
}


/* =========================
   SAVE PRODUCT
========================= */

function saveSellerProduct(event) {

  event.preventDefault();


  const editId =
    document.getElementById(
      "sellerEditProductId"
    ).value;


  const name =
    document.getElementById(
      "sellerProductName"
    ).value.trim();


  const category =
    document.getElementById(
      "sellerProductCategory"
    ).value;


  const price =
    Number(
      document.getElementById(
        "sellerProductPrice"
      ).value
    );


  const rating =
    Number(
      document.getElementById(
        "sellerProductRating"
      ).value
    );


  const image =
    document.getElementById(
      "sellerProductImage"
    ).value.trim();


  if (!name || !price || !image) {

    alert("Please fill all required fields.");

    return;
  }


  /* EDIT EXISTING PRODUCT */

  if (editId) {

    const product =
      sellerProducts.find(
        item =>
          String(item.id) === String(editId) &&
          item.sellerId === currentSeller.id
      );


    if (!product) {

      alert(
        "You can only edit your own products."
      );

      return;
    }


    product.name = name;
    product.category = category;
    product.price = price;
    product.rating = rating;
    product.image = image;


    alert("Product updated successfully.");

  }


  /* ADD NEW PRODUCT */

  else {

    const newProduct = {

      id:
        "seller-" +
        currentSeller.id +
        "-" +
        Date.now(),

      name: name,

      category: category,

      price: price,

      rating: rating,

      image: image,

      sellerId: currentSeller.id,

      sellerName: currentSeller.name,

      quantity: 1

    };


    sellerProducts.push(newProduct);


    alert("Product added successfully.");
  }


  localStorage.setItem(
    "zentromaxProducts",
    JSON.stringify(sellerProducts)
  );


  closeSellerProductForm();

  refreshSellerDashboard();
}


/* =========================
   EDIT PRODUCT
========================= */

function editSellerProduct(id) {

  const product =
    sellerProducts.find(
      item =>
        String(item.id) === String(id) &&
        item.sellerId === currentSeller.id
    );


  if (!product) {

    alert(
      "You can only edit your own products."
    );

    return;
  }


  document.getElementById(
    "sellerProductModal"
  ).classList.add("show");


  document.getElementById(
    "sellerFormTitle"
  ).textContent = "Edit Product";


  document.getElementById(
    "sellerEditProductId"
  ).value = product.id;


  document.getElementById(
    "sellerProductName"
  ).value = product.name;


  document.getElementById(
    "sellerProductCategory"
  ).value = product.category;


  document.getElementById(
    "sellerProductPrice"
  ).value = product.price;


  document.getElementById(
    "sellerProductRating"
  ).value = product.rating;


  document.getElementById(
    "sellerProductImage"
  ).value = product.image;
}


/* =========================
   DELETE PRODUCT
========================= */

function deleteSellerProduct(id) {

  const product =
    sellerProducts.find(
      item =>
        String(item.id) === String(id) &&
        item.sellerId === currentSeller.id
    );


  if (!product) {

    alert(
      "You can only delete your own products."
    );

    return;
  }


  const confirmed =
    confirm(
      `Delete "${product.name}"?`
    );


  if (!confirmed) {
    return;
  }


  sellerProducts =
    sellerProducts.filter(
      item =>
        !(
          String(item.id) === String(id) &&
          item.sellerId === currentSeller.id
        )
    );


  localStorage.setItem(
    "zentromaxProducts",
    JSON.stringify(sellerProducts)
  );


  refreshSellerDashboard();
}


/* =========================
   ORDERS
========================= */

function renderSellerOrders() {

  const container =
    document.getElementById(
      "sellerOrdersTable"
    );


  const orders =
    JSON.parse(
      localStorage.getItem(
        "zentromaxOrders"
      )
    ) || [];


  /*
    Future orders will contain sellerId.
    Only matching orders are shown.
  */

  const myOrders =
    orders.filter(
      order =>
        order.sellerId === currentSeller.id
    );


  document.getElementById(
    "sellerOrderCount"
  ).textContent = myOrders.length;


  if (myOrders.length === 0) {

    container.innerHTML = `
      <div class="empty-state">

        <h3>
          No orders yet
        </h3>

        <p>
          Orders containing your products will appear here.
        </p>

      </div>
    `;

    return;
  }


  container.innerHTML = `

    <div class="table-wrapper">

      <table class="seller-table">

        <thead>

          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          ${myOrders.map(order => `

            <tr>

              <td>
                ${escapeHTML(String(order.id))}
              </td>

              <td>
                ${escapeHTML(
                  String(order.productName || "Product")
                )}
              </td>

              <td>
                ₹${Number(
                  order.amount || 0
                ).toLocaleString("en-IN")}
              </td>

              <td>
                <span class="seller-status">
                  ${escapeHTML(
                    String(order.status || "Processing")
                  )}
                </span>
              </td>

            </tr>

          `).join("")}

        </tbody>

      </table>

    </div>
  `;
}


/* =========================
   TOTAL SALES
========================= */

function calculateSellerSales() {

  const orders =
    JSON.parse(
      localStorage.getItem(
        "zentromaxOrders"
      )
    ) || [];


  const myOrders =
    orders.filter(
      order =>
        order.sellerId === currentSeller.id
    );


  const total =
    myOrders.reduce(
      (sum, order) =>
        sum + Number(order.amount || 0),
      0
    );


  document.getElementById(
    "sellerSales"
  ).textContent =
    "₹" +
    total.toLocaleString("en-IN");
}


/* =========================
   REFRESH DASHBOARD
========================= */

function refreshSellerDashboard() {

  sellerProducts =
    JSON.parse(
      localStorage.getItem(
        "zentromaxProducts"
      )
    ) || [];


  renderDashboardProducts();

  renderSellerProducts();

  renderSellerOrders();

  calculateSellerSales();
}


/* =========================
   LOGOUT
========================= */

function sellerLogout() {

  localStorage.removeItem(
    "zentromaxSeller"
  );

  window.location.href =
    "seller-login.html";
}


/* =========================
   SECURITY HELPER
========================= */

function escapeHTML(value) {

  return String(value)

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");
}


/* =========================
   INITIALIZE
========================= */

loadSellerInformation();

refreshSellerDashboard();
