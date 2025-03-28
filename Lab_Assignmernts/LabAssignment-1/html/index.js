document.addEventListener("scroll", function() {
    let scrollPosition = window.scrollY;
    let foreground = document.querySelector(".foreground-images");

    // Move foreground images up as you scroll down
    foreground.style.transform = `translateY(${scrollPosition * -0.2}px)`;
});
