const sellerAccounts = [
  {
    id: "seller001",
    name: "Zentromax Seller",
    email: "seller@zentromax.com",
    password: "123456"
  }
];

const form = document.getElementById("sellerLoginForm");
const message = document.getElementById("loginMessage");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document
    .getElementById("sellerEmail")
    .value
    .trim()
    .toLowerCase();

  const password = document
    .getElementById("sellerPassword")
    .value;

  const seller = sellerAccounts.find(
    account =>
      account.email === email &&
      account.password === password
  );

  if (!seller) {
    message.textContent = "Invalid email or password.";
    message.style.color = "#dc2626";
    return;
  }

  // Save currently logged-in seller
  localStorage.setItem(
    "zentromaxSeller",
    JSON.stringify({
      id: seller.id,
      name: seller.name,
      email: seller.email
    })
  );

  message.textContent = "Login successful!";
  message.style.color = "#16a34a";

  setTimeout(function () {
    window.location.href = "seller-dashboard.html";
  }, 700);
});
