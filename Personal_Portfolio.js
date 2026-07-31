document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Dark/Light Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Default to dark per new design, check if user changed it previously
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'light') { // Switch to dark
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else { // Switch to light
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Generic Filtering Logic ---
    function setupFilter(filterContainerId, itemClass) {
        const filterContainer = document.getElementById(filterContainerId);
        if (!filterContainer) return;

        const buttons = filterContainer.querySelectorAll('.filter-btn');
        const items = document.querySelectorAll(itemClass);

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons in this group
                buttons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                items.forEach(item => {
                    const categories = item.getAttribute('data-category');
                    if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
                        item.style.display = ''; // Show
                    } else {
                        item.style.display = 'none'; // Hide
                    }
                });
            });
        });
    }

    // Initialize all filters
    // Initialize all filters
    setupFilter('exp-filters', '.timeline-item');
    setupFilter('proj-filters', '.project-card');
    setupFilter('skill-filters', '.skill-category');
    setupFilter('ach-filters', '.achievement-card');

    // --- Copy Email to Clipboard ---
    const copyBtn = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('email-text');

    if(copyBtn && emailText) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(emailText.innerText);
                // Visual feedback
                const icon = copyBtn.querySelector('i');
                icon.classList.replace('fa-copy', 'fa-check');
                icon.style.color = 'var(--accent-success)';
                
                setTimeout(() => {
                    icon.classList.replace('fa-check', 'fa-copy');
                    icon.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy email: ', err);
            }
        });
    }

    // --- Form Submission Logic (FormSubmit) ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if(contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.innerHTML = "<p style='color: var(--accent-success); margin-top: 1rem; font-size: 0.9rem;'><i class='fas fa-check-circle'></i> Success! Your message has been sent.</p>";
                    contactForm.reset();
                } else {
                    formStatus.innerHTML = "<p style='color: #ef4444; margin-top: 1rem; font-size: 0.9rem;'><i class='fas fa-exclamation-circle'></i> Oops! Something went wrong. Please try again.</p>";
                }
            } catch (error) {
                formStatus.innerHTML = "<p style='color: #ef4444; margin-top: 1rem; font-size: 0.9rem;'><i class='fas fa-exclamation-circle'></i> Error connecting to the server.</p>";
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }
        });
    }
});

// --- Scroll to Top Floating Button Logic ---
    const scrollBtn = document.getElementById('scroll-btn');
    const heroSection = document.getElementById('hero');

    if (scrollBtn && heroSection) {
        window.addEventListener('scroll', () => {
            // Get the height of the hero section
            const heroBottom = heroSection.offsetHeight;
            
            // If the user scrolls past 50% of the hero section, show the button
            if (window.scrollY > (heroBottom / 2)) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
    }