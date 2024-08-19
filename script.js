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
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`nav ul li a[href="#${id}"]`);

                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to the current section link
                activeLink.classList.add('active');
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Handle the click event to remove active class when clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });
});

// Footer
var currentYear = new Date().getFullYear();
var yearText = currentYear + " | All rights reserved | HARDZMY";
document.getElementById("currentYear").textContent = yearText;