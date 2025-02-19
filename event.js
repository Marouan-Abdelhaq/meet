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
document.querySelector('.group > a').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('ville-menu').classList.toggle('hidden');
});

function choisirVille(ville) {
    console.log("Ville choisie :", ville);
    document.getElementById('ville-menu').classList.add('hidden');
}

document.addEventListener('click', function(event) {
    let menu = document.getElementById('ville-menu');
    let menuButton = document.querySelector('.group > a');
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        menu.classList.add('hidden');
    }
});

const menuToggle = document.getElementById('navbar-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-mobile-menu');
const mobileMenuContent = mobileMenu.querySelector('div');
const mobileMenuCategorie = document.getElementById('mobile-menu-categorie');
const mobileVilleMenu = document.getElementById('mobile-ville-menu');

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


mobileMenuCategorie.addEventListener('click', (event) => {
event.preventDefault();
mobileVilleMenu.classList.toggle('hidden');
});


mobileMenu.addEventListener('click', (event) => {
if (event.target === mobileMenu) {
    mobileMenuContent.classList.add('-translate-x-full');
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
    }, 300);
}
});