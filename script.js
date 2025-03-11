// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle with animation
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Smooth scroll for navigation links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';

        const target = document.querySelector(this.getAttribute('href'));
        const offset = 80; // Height of fixed navbar
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Add stagger effect to child elements
            if (entry.target.classList.contains('menu-grid') || entry.target.classList.contains('features-grid')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.2}s`;
                });
            }
        }
    });
}, observerOptions);

// Observe sections and their contents
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('.menu-item, .feature-item').forEach(item => {
    observer.observe(item);
});

// Enhanced image loading animation
document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    }
});

// Parallax effect for hero section with smooth animation
let lastScrollY = window.pageYOffset;
let ticking = false;

window.addEventListener('scroll', () => {
    lastScrollY = window.pageYOffset;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const hero = document.querySelector('.hero');
            const scrolled = lastScrollY;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
            ticking = false;
        });
        ticking = true;
    }
});

// Menu item hover effect
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Feature item hover effect with rotation
document.querySelectorAll('.feature-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.feature-icon');
        icon.style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.feature-icon');
        icon.style.transform = 'scale(1) rotate(0)';
    });
});