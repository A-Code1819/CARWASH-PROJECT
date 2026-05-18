// Handle contact form submission
const form = document.querySelector('.contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('¡Tu solicitud de reserva ha sido enviada!');
  form.reset();
});

// Initialize Vanilla Tilt for floating and service cards
    VanillaTilt.init(document.querySelectorAll(".floating-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
    });

    VanillaTilt.init(document.querySelectorAll(".service-card"), {
        max: 10,
        speed: 300,
        glare: true,
        "max-glare": 0.2,
    });

// Smooth scrolling for navigation links and hero button
   const navLinks = document.querySelectorAll('.nav-links a');
    const heroBtn = document.querySelector('.hero .btn');

    [...navLinks, heroBtn].forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });