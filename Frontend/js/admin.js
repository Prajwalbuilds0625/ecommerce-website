async function addProduct() {
    let name = document.getElementById("pname").value;
    let price = document.getElementById("pprice").value;
    let image = document.getElementById("pimage").value;

    await fetch("http://localhost:3000/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            product_name: name,
            product_price: price,
            product_image: image
        })
    });

    alert("Product Added");

    loadProducts();
}
async function deleteProduct(id) {
    await fetch(`http://localhost:3000/delete-product/${id}`, {
        method: "DELETE"
    });

    alert("Product Deleted");

    loadProducts();
}
async function loadProducts() {
    const res = await fetch("http://localhost:3000/products");
    const products = await res.json();

    let table = document.getElementById("productTable");
    table.innerHTML = "";

    products.forEach(product => {

    table.innerHTML += `
    <tr>
        <td>${product.id}</td>

        <td>
            <img src="${product.product_image}" width="80" height="80">
        </td>

        <td>${product.product_name}</td>

        <td>$${product.product_price}</td>

        <td>
            <button class="btn btn-danger btn-sm"
            onclick="deleteProduct(${product.id})">
            Delete
            </button>
        </td>
    </tr>
    `;
});

    document.getElementById("productCount").innerText = products.length;
}
async function loadCounts() {

    let users = await fetch("http://localhost:3000/total-users");
    let usersData = await users.json();
    document.getElementById("totalUsers").innerText = usersData.total;

    let orders = await fetch("http://localhost:3000/total-orders");
    let ordersData = await orders.json();
    document.getElementById("totalOrders").innerText = ordersData.total;

    let products = await fetch("http://localhost:3000/products");
    let productsData = await products.json();
    document.getElementById("totalProducts").innerText = productsData.length;
}
if (!localStorage.getItem("admin")) {
    alert("Please login first");
    window.location.href = "admin-login.html";
}
window.onload = function () {
    loadProducts();
    loadCounts();
};