const products = [

    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 1499,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 2499,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },

    {
        id: 3,
        name: "Men's Casual Shirt",
        category: "fashion",
        price: 899,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab"
    },

    {
        id: 4,
        name: "Women's Fashion Bag",
        category: "fashion",
        price: 1299,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3"
    },

    {
        id: 5,
        name: "Modern Table Lamp",
        category: "home",
        price: 799,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c"
    },

    {
        id: 6,
        name: "The Psychology of Money",
        category: "books",
        price: 399,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    },

    {
        id: 7,
        name: "Skincare Beauty Set",
        category: "beauty",
        price: 999,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8"
    },

    {
        id: 8,
        name: "Portable Bluetooth Speaker",
        category: "electronics",
        price: 1199,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
    }

];


let cart = [];

let wishlist = [];


/* PRODUCTS */

function displayProducts(list = products) {

    const container =
        document.getElementById("products");

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:50px;
            ">
                <h2>No products found</h2>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }


    list.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product";


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <h3>
                ${product.name}
            </h3>

            <div class="rating">
                ⭐ ${product.rating}
            </div>

            <div class="price">
                ₹${product.price.toLocaleString("en-IN")}
            </div>

            <button
                class="add-cart"
                onclick="addToCart(${product.id})"
            >
                🛒 Add to Cart
            </button>

        `;


        container.appendChild(card);

    });

}


/* CART */

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

    alert(product.name + " added to cart!");
}


function updateCart() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    document.getElementById(
        "cartCount"
    ).textContent = count;


    const container =
        document.getElementById(
            "cartItems"
        );


    container.innerHTML = "";


    let total = 0;


    if (cart.length === 0) {

        container.innerHTML = `
            <div style="
                text-align:center;
                padding:80px 20px;
            ">
                <div style="font-size:50px;">
                    🛒
                </div>

                <h2>Your cart is empty</h2>

                <p>
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

            <div>

                <strong>
                    ${item.name}
                </strong>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                </p>

                <p>
                    Quantity: ${item.quantity}
                </p>

                <button
                    onclick="decrease(${item.id})">
                    −
                </button>

                <button
                    onclick="increase(${item.id})">
                    +
                </button>

                <button
                    onclick="removeFromCart(${item.id})">
                    Remove
                </button>

            </div>

        `;


        container.appendChild(div);

    });


    document.getElementById(
        "cartTotal"
    ).textContent =
        total.toLocaleString("en-IN");
}


function increase(id) {

    const item =
        cart.find(item => item.id === id);

    if (item) {

        item.quantity++;

    }

    updateCart();
}


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


function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );

    updateCart();
}


/* CART OPEN */

function openCart() {

    document
        .getElementById("cartPanel")
        .classList.add("open");

    document
        .getElementById("overlay")
        .classList.add("show");
}


function closeCart() {

    document
        .getElementById("cartPanel")
        .classList.remove("open");

    document
        .getElementById("overlay")
        .classList.remove("show");
}


/* SEARCH */

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
        );


    displayProducts(results);
}


/* CATEGORY */

function filterCategory(category) {

    if (category === "all") {

        displayProducts(products);

        return;
    }


    const filtered =
        products.filter(
            product =>
                product.category === category
        );


    displayProducts(filtered);
}


/* LOGIN */

function openLogin() {

    document
        .getElementById("loginModal")
        .classList.add("show");
}


function closeLogin() {

    document
        .getElementById("loginModal")
        .classList.remove("show");
}


function login() {

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("loginPassword")
            .value
            .trim();


    if (!email || !password) {

        alert(
            "Please enter email/mobile and password."
        );

        return;
    }


    alert(
        "Login system ready. Backend will be connected next."
    );

    closeLogin();
}


function createAccount() {

    alert(
        "Registration page will be connected next."
    );
}


/* CHECKOUT */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;
    }


    alert(
        "Checkout page will be connected next."
    );
}


/* SCROLL */

function scrollToProducts() {

    document
        .getElementById("productsTitle")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* HOME */

function goHome() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* INITIAL */

displayProducts();

updateCart();
