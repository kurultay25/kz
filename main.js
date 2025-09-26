// Language translations
const translations = {
    ru: {
        'nav-home': 'Главная',
        'nav-program': 'Программа',
        'nav-objectives': 'Цели',
        'nav-countries': 'Страны'
    },
    kz: {
        'nav-home': 'Басты',
        'nav-program': 'Бағдарлама',
        'nav-objectives': 'Мақсаттар',
        'nav-countries': 'Елдер'
    },
    en: {
        'nav-home': 'Home',
        'nav-program': 'Program',
        'nav-objectives': 'Objectives',
        'nav-countries': 'Countries'
    }
};

// Current language
let currentLang = 'ru';

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguageSwitcher();
    initializeScrollAnimations();
    initializeNavigation();
    initializeCounters();
    initializeAnimations();
});

// Language Switcher
function initializeLanguageSwitcher() {
    const langSwitcher = document.querySelector('.lang-switcher button');
    const langDropdown = document.querySelector('.lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    // Toggle dropdown
    langSwitcher.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        langDropdown.classList.remove('active');
    });
    
    // Language selection
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const newLang = this.dataset.lang;
            switchLanguage(newLang);
            langDropdown.classList.remove('active');
        });
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update language display
    const langCurrent = document.querySelector('.lang-current');
    const flags = {
        'ru': '🇷🇺 RU',
        'kz': '🇰🇿 KZ',
        'en': '🇬🇧 EN'
    };
    langCurrent.textContent = flags[lang];
    
    // Update active language option
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.toggle('active', option.dataset.lang === lang);
    });
    
    // Switch content
    document.querySelectorAll('.lang-content').forEach(content => {
        content.classList.toggle('active', content.dataset.lang === lang);
    });
    
    // Update navigation text
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.dataset.langKey;
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.card-number, .objective-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 40);
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Initialize additional animations
function initializeAnimations() {
    // Add hover effects for cards
    document.querySelectorAll('.card, .program-day, .objective-card, .country-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Add button hover effects
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Open Google Forms
function openForm(type) {
    const forms = {
        'award': {
            'ru': 'https://forms.gle/example-award-ru',
            'kz': 'https://forms.gle/example-award-kz',
            'en': 'https://forms.gle/example-award-en'
        },
        'alley': {
            'ru': 'https://forms.gle/example-alley-ru',
            'kz': 'https://forms.gle/example-alley-kz',
            'en': 'https://forms.gle/example-alley-en'
        }
    };
    
    // For demo purposes, show alert. In production, replace with actual Google Forms URLs
    const formUrl = forms[type][currentLang] || forms[type]['ru'];
    
    if (confirm(currentLang === 'ru' ? 'Открыть Google Форму?' : 
                currentLang === 'kz' ? 'Google Формасын ашу?' : 'Open Google Form?')) {
        // In production, uncomment this line:
        // window.open(formUrl, '_blank');
        
        // Demo alert:
        alert(currentLang === 'ru' ? 'В реальной версии здесь будет открываться Google Форма' :
              currentLang === 'kz' ? 'Нақты нұсқасында мұнда Google Форма ашылады' :
              'In the real version, Google Form will open here');
    }
}

// Parallax effect for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    anime({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 500
    });
    
    anime({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 700
    });
    
    anime({
        targets: '.hero-description',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 900
    });
    
    anime({
        targets: '.btn-primary, .btn-secondary',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: anime.stagger(200, {start: 1100})
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);