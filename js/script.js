document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.getElementById('header');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

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
                entry.target.classList.remove('revealed');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.8s ease-out';
        revealObserver.observe(element);
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Carousel Logic (desktop)
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

    // --- MOBILE: Dots para servicios ---
    function initServicesDots() {
        if (window.innerWidth > 768) return;

        const grid = document.querySelector('.services-grid');
        const cards = document.querySelectorAll('.service-card');
        if (!grid || !cards.length) return;

        if (!document.querySelector('.services-dots')) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'services-dots';
            cards.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => {
                    // Scroll solo dentro del grid, sin mover la página
                    grid.scrollTo({ left: grid.offsetWidth * i, behavior: 'smooth' });
                });
                dotsContainer.appendChild(dot);
            });
            grid.parentElement.appendChild(dotsContainer);
        }

        const dots = document.querySelectorAll('.services-dots .dot');
        grid.addEventListener('scroll', () => {
            const index = Math.round(grid.scrollLeft / grid.offsetWidth);
            dots.forEach((d, i) => d.classList.toggle('active', i === index));
        });
    }

    // --- MOBILE: Auto-rotate galería ---
    function initGalleryAutoRotate() {
        if (window.innerWidth > 768) return;

        const galleryCarousel = document.querySelector('.gallery-carousel');
        if (!galleryCarousel) return;

        let autoRotateInterval;

        function startAutoRotate() {
            autoRotateInterval = setInterval(() => {
                const maxScroll = galleryCarousel.scrollWidth - galleryCarousel.offsetWidth;

                if (galleryCarousel.scrollLeft >= maxScroll - 5) {
                    // Si estamos al final, volvemos al principio suavemente
                    galleryCarousel.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    // Avanzamos un item (estimando por offsetWidth)
                    galleryCarousel.scrollBy({
                        left: galleryCarousel.offsetWidth,
                        behavior: 'smooth'
                    });
                }
            }, 3000);
        }

        function stopAutoRotate() {
            clearInterval(autoRotateInterval);
        }

        startAutoRotate();

        // Pausar si el usuario interactúa
        galleryCarousel.addEventListener('touchstart', stopAutoRotate);
        galleryCarousel.addEventListener('touchend', startAutoRotate);
    }

    initServicesDots();
    initGalleryAutoRotate();

    console.log('Electricidad Vásquez scripts loaded');
});