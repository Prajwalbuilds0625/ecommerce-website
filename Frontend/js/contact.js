const form = document.getElementById("contactForm");
const toast = document.getElementById("toastMsg");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show success message
    toast.classList.add("show");

    // Hide after 3 sec
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

    // Reset form
    form.reset();
});