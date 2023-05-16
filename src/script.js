document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('open');
    });
});