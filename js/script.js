document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.getElementById('header');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change icon? Maybe later. For now just toggle.
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(11, 29, 58, 0.95)';
            header.style.padding = '10px 0';
        } else {
            header.style.backgroundColor = '#0b1d3a';
            header.style.padding = '0';
        }
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.service-card, .trust-item, .step, .gallery-item, .section-title, .hero-content');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            } else {
                // Remove class to re-trigger animation when scrolling back
                entry.target.classList.remove('revealed');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)'; // Increased distance
        element.style.transition = 'all 0.8s ease-out'; // Slower, smoother ease
        revealObserver.observe(element);
    });

    // Add CSS class for revealed elements dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Carousel Logic
    const carousel = document.querySelector('.gallery-carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (carousel && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: 300, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    console.log('Eléctricas Vásquez scripts loaded');
});
