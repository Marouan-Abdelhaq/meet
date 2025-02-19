window.addEventListener('scroll', function () {
    let navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.remove('navbar-transparent');
        navbar.classList.add('navbar-solid');
    } else {
        navbar.classList.remove('navbar-solid');
        navbar.classList.add('navbar-transparent');
    }
});

const menuToggle = document.getElementById('navbar-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-mobile-menu');
const mobileMenuContent = mobileMenu.querySelector('div');


menuToggle.addEventListener('click', () => {
mobileMenu.classList.remove('hidden');
mobileMenuContent.classList.remove('-translate-x-full');
});


closeMenu.addEventListener('click', () => {
mobileMenuContent.classList.add('-translate-x-full');
setTimeout(() => {
mobileMenu.classList.add('hidden');
}, 300);
});


mobileMenu.addEventListener('click', (event) => {
if (event.target === mobileMenu) {
mobileMenuContent.classList.add('-translate-x-full');
setTimeout(() => {
    mobileMenu.classList.add('hidden');
}, 300);
}
});