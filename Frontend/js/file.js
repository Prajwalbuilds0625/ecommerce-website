// ================= ADD TO CART =================
function addToCart(name, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({ name, price: Number(price) });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart!");
}


// ================= CART COUNT =================
function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = document.getElementById("cartCount");

    if (count) {
        count.innerText = cart.length;
    }
}


// ================= LOAD PRODUCTS =================
async function loadProducts() {

    try {
        const response = await fetch("http://localhost:3000/products");
        const products = await response.json();

        let container = document.getElementById("productContainer");

        if (!container) return;

        container.innerHTML = "";

        products.forEach(product => {

            container.innerHTML += `
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="prod-card">
                        <img src="${product.product_image}" alt="">
                        <h6>${product.product_name}</h6>
                        <p>$${product.product_price}</p>

                        <button class="add-btn"
                            onclick="addToCart('${product.product_name}', '${product.product_price}')">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.log("Product Load Error:", error);
    }
}


// ================= SUBSCRIBE =================
function subscribe() {

    let email = document.getElementById("subscribeEmail").value;

    if (!email) {
        alert("Please enter email");
        return;
    }

    let toast = document.getElementById("toastMsg");

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

    document.getElementById("subscribeEmail").value = "";
}


// ================= TOAST =================
function showToast(message = "Subscribed Successfully!") {

    let toast = document.getElementById("toastMsg");

    if (!toast) return;

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


// ================= LOGOUT =================
function logout() {

    localStorage.clear();

    alert("Logged out successfully!");

    window.location.href = "login.html";
}


// ================= PAGE LOAD =================
document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();
    loadProducts();
});