// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Update copyright year
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    // Smooth scrolling for anchor links
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

    // Sticky navigation
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255,255,255,0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'var(--white)';
                navbar.style.backdropFilter = 'none';
            }
        }
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Button click handlers
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function() {
            // Redirect to contact page or open quote form
            window.location.href = 'pages/contact.html';
        });
    });

    document.querySelectorAll('.btn-secondary').forEach(button => {
        button.addEventListener('click', function() {
            // Redirect to products page
            window.location.href = 'pages/products.html';
        });
    });

    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.href && !this.getAttribute('onclick')) {
                // Add loading state for buttons without links
                const originalText = this.innerHTML;
                this.innerHTML = '<span>Loading...</span>';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 1500);
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .product-card, .step, .industry-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Utility functions
const utils = {
    formatPrice: (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    },

    debounce: (func, wait) => {
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
};

(function() {
  // Always show on homepage
  const path = window.location.pathname.toLowerCase();
  const isHome = path.endsWith('/') || path.endsWith('index.html');
  if (!isHome) return;

  // Only show once per session
  if (sessionStorage.getItem('policyModalShown') === '1') return;
  sessionStorage.setItem('policyModalShown', '1');

  // Create backdrop
  const bd = document.createElement('div');
  bd.className = 'modal-backdrop';

  // Modal HTML
  const modalHTML = document.createElement('div');
  modalHTML.className = 'modal';
  modalHTML.innerHTML = `
    <h3>Policy Notice</h3>
    <p>Do you accept our policy to explore AquaCraft Bottles?</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:15px;">
      <button class="btn" id="policy-yes">Yes, Accept</button>
      <button class="btn ghost" id="policy-no">Close</button>
    </div>
  `;

  bd.appendChild(modalHTML);
  document.body.appendChild(bd);

  // Show the modal/backdrop
  bd.style.display = 'flex';

  // Close function
  function closeModal() {
    bd.remove();
  }

  // Button events
  bd.querySelector('#policy-yes').addEventListener('click', function() {
    window.location.href = 'index.html'; // update to desired page
  });

  bd.querySelector('#policy-no').addEventListener('click', closeModal);

  // ESC key closes modal
  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") closeModal();
  });

  // Click outside modal closes
  bd.addEventListener('click', function(e) {
    if (e.target === bd) closeModal();
  });

})();

