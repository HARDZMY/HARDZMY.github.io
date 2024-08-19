// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navigation Bar Active Page
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const link = document.querySelector(nav ul li a[href="#${id}"]);

            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        observer.observe(section);
    });
});


// Footer
var currentYear = new Date().getFullYear();
var yearText = currentYear + " | All rights reserved | HARDZMY";
document.getElementById("currentYear").textContent = yearText;