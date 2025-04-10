// Scroll Parallax Effect
document.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;
    let foreground = document.querySelector(".foreground-images");
    if (foreground) {
        foreground.style.transform = `translateY(${scrollPosition * -0.2}px)`;
    }
});

// Cart Button Redirect Logic
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.cart-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const item = this.closest('.arrival-item');
            const productId = item.getAttribute('data-id');
            if (productId) {
                window.location.href = `product.html?id=${productId}`;
            }
        });
    });
});
