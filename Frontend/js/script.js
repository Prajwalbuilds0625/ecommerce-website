// Get elements
const subscribeBtn = document.querySelector(".sub-btn");
const emailInput = document.querySelector(".email-box");
const toast = document.getElementById("toastMsg");

subscribeBtn.addEventListener("click", function () {
    const email = emailInput.value.trim();

    // Simple validation
    if (email === "" || !email.includes("@")) {
        showToast("Please enter a valid email!");
        return;
    }

    // Show success message
    showToast("Subscribed Successfully!");

    // Clear input
    emailInput.value = "";
});

function showToast(message) {
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}