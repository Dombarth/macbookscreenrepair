/**
 * MacBook Screen Repair - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Fix paths for local file viewing
    if (window.location.protocol === 'file:') {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/');
        const projectFolder = 'macbookscreenrepair-1';
        const projectIndex = pathParts.findIndex(p => p === projectFolder);
        let basePath = '';
        
        if (projectIndex !== -1) {
            // Calculate depth from project root
            const depth = pathParts.length - projectIndex - 2; // -2 for project folder and filename
            for (let i = 0; i < depth; i++) {
                basePath += '../';
            }
            if (basePath === '') basePath = './';
        }
        
        // Fix all links starting with /
        document.querySelectorAll('a[href^="/"]').forEach(link => {
            let href = link.getAttribute('href');
            if (href === '/') {
                href = basePath + 'index.html';
            } else {
                href = basePath + href.substring(1) + 'index.html';
            }
            link.setAttribute('href', href);
        });
        
        // Fix CSS paths
        document.querySelectorAll('link[href^="/css"]').forEach(link => {
            let href = link.getAttribute('href');
            link.setAttribute('href', basePath + href.substring(1));
        });
        
        // Fix JS paths
        document.querySelectorAll('script[src^="/js"]').forEach(script => {
            let src = script.getAttribute('src');
            script.setAttribute('src', basePath + src.substring(1));
        });
    }
    
    
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Dropdown Menu for Mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    menu.classList.toggle('show');
                }
            });
        }
    });
    
    // FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const wasActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });
            
            // Open clicked if it wasn't already open
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Check confirmation checkbox
            const confirmCheckbox = form.querySelector('#confirm-eligibility');
            if (confirmCheckbox && !confirmCheckbox.checked) {
                isValid = false;
                confirmCheckbox.parentElement.classList.add('error');
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
    
});

// Add scroll styles
const scrollStyles = document.createElement('style');
scrollStyles.textContent = `
    .header.scrolled {
        box-shadow: 0 2px 20px rgba(0,0,0,0.08);
    }
    .form-control.error {
        border-color: #dc3545;
    }
    .form-check.error {
        color: #dc3545;
    }
    .dropdown-menu.show {
        display: block;
        position: static;
        opacity: 1;
        visibility: visible;
        transform: none;
        box-shadow: none;
        padding-left: 1rem;
    }
`;
document.head.appendChild(scrollStyles);
