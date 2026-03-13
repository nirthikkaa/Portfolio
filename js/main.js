/* ============================================
   MAIN.JS — Scroll animations & nav behavior
   ============================================ */

/* ── Fade-in on scroll ──
   Adds 'visible' class to elements as they
   enter the viewport while scrolling down */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); /* stop watching once visible */
        }
    });
}, { threshold: 0.1 }); /* trigger when 10% of element is visible */

/* Watch all elements with fade-in class */
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


/* ── Active nav link highlight ──
   Highlights the nav link matching the
   current section visible on screen */

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            /* Remove active from all links */
            navLinks.forEach(link => link.classList.remove('active'));

            /* Add active to matching link */
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { threshold: 0.4 }); /* trigger when 40% of section is visible */

sections.forEach(section => sectionObserver.observe(section));


/* ── Nav shadow on scroll ──
   Adds a subtle shadow to nav when
   user scrolls away from the top */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});