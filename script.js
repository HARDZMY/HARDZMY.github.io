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
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`nav ul li a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        observer.observe(section);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            navLinks.forEach(link => link.classList.remove('clicked'));
            link.classList.add('clicked');
            link.classList.add('active');

            const sectionId = link.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Section Pop-Up Transition Animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const imageItems = document.querySelectorAll('.image-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                entry.target.classList.remove('section-hidden');
            } else {
                entry.target.classList.add('section-hidden');
                entry.target.classList.remove('section-visible');
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });

    imageItems.forEach(item => {
        item.classList.add('section-hidden');
        observer.observe(item);
    });
});

// Footer
var currentYear = new Date().getFullYear();
var yearText = currentYear + " | All rights reserved | HARDZMY";
document.getElementById("currentYear").textContent = yearText;