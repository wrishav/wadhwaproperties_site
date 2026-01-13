// Wadhwa Properties - Enhanced Interactive Features with Updated Color Scheme
document.addEventListener('DOMContentLoaded', function () {

    // Initialize EmailJS
    try {
        if (typeof emailjs !== 'undefined') {
            emailjs.init('sFj3v2V-DlQzMZeao');
            console.log('EmailJS initialized');
        } else {
            console.error('EmailJS library not loaded. Check your internet connection or ad blocker.');
            showEnhancedNotification('Email service unavailable. Please call us directly.', 'error');
        }
    } catch (e) {
        console.error('EmailJS initialization failed:', e);
    }

    // Initialize all enhancements
    initScrollProgress();
    initNewNavigation();
    initEnhancedAnimations();
    initFormValidation();
    initServiceCardAnimations();
    initFaridabadTiles();
    initSatishSection();
    initMicroInteractions();
    initScrollAnimations();
    initBackToTop();

    // NEW NAVIGATION FUNCTIONALITY
    function initNewNavigation() {
        const navbar = document.getElementById('navbar');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        let lastScrollY = window.scrollY;

        // Scroll trigger for navbar background
        function handleNavbarScroll() {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll (optional)
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        }

        // Mobile menu toggle
        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', function () {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');

                // Prevent body scroll when menu is open
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function (e) {
                if (!navbar.contains(e.target)) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Smooth scroll for navigation links with active state
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');

                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        mobileMenuToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
        });

        // Update active nav link on scroll
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const navbarHeight = navbar.offsetHeight;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - navbarHeight - 50;
                const sectionBottom = sectionTop + section.offsetHeight;
                const scrollPos = window.scrollY;

                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    const targetLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                    if (targetLink) {
                        navLinks.forEach(link => link.classList.remove('active'));
                        targetLink.classList.add('active');
                    }
                }
            });
        }

        // Add scroll listeners
        let scrollTimeout;
        window.addEventListener('scroll', function () {
            handleNavbarScroll();

            // Throttle the active link update
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(updateActiveNavLink, 100);
        });

        // Initialize navbar state
        handleNavbarScroll();
        updateActiveNavLink();

        console.log('New navigation initialized');
    }

    // Scroll Progress Indicator - Updated with new colors
    function initScrollProgress() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'scroll-progress';
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        function updateScrollProgress() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = Math.min(scrolled, 100) + '%';
        }

        function updateScrollProgressColor() {
            // Neo-Modern theme: Electric Blue to Purple
            progressBar.style.background = 'linear-gradient(90deg, #3b82f6, #8b5cf6)';
            progressBar.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.8)';
        }

        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress();
        updateScrollProgressColor();

        // Export for external use
        window.updateScrollProgressColor = updateScrollProgressColor;
    }

    // Enhanced Animations
    function initEnhancedAnimations() {
        // Typing effect for hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.innerHTML;
            heroTitle.innerHTML = '';
            let i = 0;

            function typeText() {
                if (i < text.length) {
                    heroTitle.innerHTML = text.slice(0, i + 1);
                    i++;
                    setTimeout(typeText, 30);
                }
            }

            // Start typing effect after page load
            setTimeout(typeText, 1000);
        }

        console.log('Enhanced animations initialized');
    }

    // Enhanced Form Validation
    // Replace the entire initFormValidation() function with this:

    function initFormValidation() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        const inputs = contactForm.querySelectorAll('.form-control');

        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                clearValidationError(this);
            });

            input.addEventListener('focus', function () {
                this.style.color = 'var(--text-primary)';
            });
        });

        // Form submission with EmailJS integration
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Validate all fields first
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                validateField(field);
                const validation = field.parentElement.querySelector('.form-validation');
                if ((validation && validation.classList.contains('error')) || !field.value.trim()) {
                    isValid = false;
                }
            });

            if (!isValid) {
                showEnhancedNotification('Please fix the errors in the form.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            try {
                // Prepare template parameters for EmailJS
                const templateParams = {
                    from_name: contactForm.querySelector('#name').value,
                    from_phone: contactForm.querySelector('#phone').value,
                    from_email: contactForm.querySelector('#email').value || 'Not provided',
                    service_type: contactForm.querySelector('#service').value || 'Not specified',
                    message: contactForm.querySelector('#message').value || 'No message provided'
                };

                // Send email using EmailJS
                const response = await emailjs.send(
                    'service_xqn2pos',      // Your EmailJS service ID
                    'template_r3v1xjw',     // Your EmailJS template ID
                    templateParams
                );

                console.log('EmailJS Response:', response);

                if (response.status === 200) {
                    showEnhancedNotification('Thank you! We will contact you within 24 hours.', 'success');
                    contactForm.reset();

                    // Clear all validations
                    const validations = contactForm.querySelectorAll('.form-validation');
                    validations.forEach(validation => {
                        validation.className = 'form-validation';
                        validation.textContent = '';
                    });

                    const fields = contactForm.querySelectorAll('.form-control');
                    fields.forEach(field => {
                        field.style.borderColor = '';
                        field.style.boxShadow = '';
                    });

                    // Optional: Open phone dialer after successful submission
                    setTimeout(() => {
                        if (confirm('Would you like to call us directly?')) {
                            window.open('tel:+919810623803', '_self');
                        }
                    }, 3000);

                } else {
                    showEnhancedNotification('Error sending message. Please try again.', 'error');
                }

            } catch (error) {
                showEnhancedNotification('Failed to send message. Please try calling us directly.', 'error');
                console.error('EmailJS Error:', error);
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });

        function validateField(field) {
            const validation = field.parentElement.querySelector('.form-validation');
            const value = field.value.trim();

            if (!validation) return;

            // Clear previous validation
            validation.className = 'form-validation';
            validation.textContent = '';
            field.style.borderColor = '';

            // Validation rules
            switch (field.type) {
                case 'text':
                    if (field.required && !value) {
                        showFieldError(field, validation, 'This field is required');
                    } else if (value && value.length < 2) {
                        showFieldError(field, validation, 'Name must be at least 2 characters');
                    } else if (value) {
                        showFieldSuccess(field, validation, 'Looks good!');
                    }
                    break;

                case 'tel':
                    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,15}$/;
                    if (field.required && !value) {
                        showFieldError(field, validation, 'Phone number is required');
                    } else if (value && !phoneRegex.test(value)) {
                        showFieldError(field, validation, 'Please enter a valid phone number');
                    } else if (value) {
                        showFieldSuccess(field, validation, 'Phone number is valid');
                    }
                    break;

                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (value && !emailRegex.test(value)) {
                        showFieldError(field, validation, 'Please enter a valid email address');
                    } else if (value) {
                        showFieldSuccess(field, validation, 'Email is valid');
                    }
                    break;
            }
        }

        function showFieldError(field, validation, message) {
            validation.className = 'form-validation error';
            validation.textContent = message;
            field.style.borderColor = '#c53030';
            field.style.boxShadow = '0 0 0 3px rgba(197, 48, 48, 0.1)';
        }

        function showFieldSuccess(field, validation, message) {
            validation.className = 'form-validation success';
            validation.textContent = message;
            field.style.borderColor = '#2A9D8F'; // Updated to use new accent color
            field.style.boxShadow = '0 0 0 3px rgba(42, 157, 143, 0.1)';
        }

        function clearValidationError(field) {
            const validation = field.parentElement.querySelector('.form-validation');
            if (validation && validation.classList.contains('error')) {
                validation.className = 'form-validation';
                validation.textContent = '';
                field.style.borderColor = '';
                field.style.boxShadow = '';
            }
        }

        // Enhanced form submission


        console.log('Form validation initialized');
    }

    // Enhanced Service Card Animations (2x2 Grid) with strong hover effects
    function initServiceCardAnimations() {
        const serviceCards = document.querySelectorAll('.service-card-enhanced');

        serviceCards.forEach((card, index) => {
            // Staggered entrance animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';

            // Trigger entrance animation when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 150);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(card);

            // Click interaction for services
            card.addEventListener('click', function () {
                const serviceName = this.querySelector('h3').textContent;
                showEnhancedNotification(`Interested in ${serviceName}? Let's discuss your requirements!`, 'info');

                setTimeout(() => {
                    window.open('tel:+919810623803', '_self');
                }, 1500);
            });
        });

        console.log('Service card animations initialized');
    }

    // FARIDABAD BENEFITS TILES INTERACTION
    function initFaridabadTiles() {
        const benefitTiles = document.querySelectorAll('.benefit-tile');

        benefitTiles.forEach((tile, index) => {
            // Staggered entrance animation
            tile.style.opacity = '0';
            tile.style.transform = 'translateY(30px)';
            tile.style.transition = 'all 0.6s ease';

            // Trigger entrance animation when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(tile);

            // Click interaction
            tile.addEventListener('click', function () {
                const benefitName = this.querySelector('h3').textContent;
                showEnhancedNotification(`Interested in ${benefitName}? Let's discuss Faridabad opportunities!`, 'info');

                setTimeout(() => {
                    window.open('tel:+919810623803', '_self');
                }, 1500);
            });
        });

        console.log('Faridabad tiles initialized');
    }

    // SATISH SECTION INTERACTIONS
    function initSatishSection() {
        const satishSection = document.querySelector('.satish-section');
        const timelineItems = document.querySelectorAll('.timeline-item');
        const satishPortrait = document.querySelector('.satish-portrait');

        // Animate timeline items
        if (timelineItems.length > 0) {
            const timelineObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        timelineItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateX(0)';
                            }, index * 200);
                        });
                    }
                });
            }, { threshold: 0.3 });

            timelineItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                item.style.transition = 'all 0.5s ease';
            });

            if (satishSection) {
                timelineObserver.observe(satishSection);
            }
        }

        // Portrait hover effect
        if (satishPortrait) {
            satishPortrait.addEventListener('mouseenter', function () {
                this.style.transform = 'scale(1.05) rotate(2deg)';
                this.style.boxShadow = '0 20px 40px rgba(15, 76, 129, 0.3)'; // Updated shadow color
            });

            satishPortrait.addEventListener('mouseleave', function () {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.boxShadow = 'var(--shadow-heavy)';
            });
        }

        console.log('Satish section initialized');
    }

    // Micro-interactions
    function initMicroInteractions() {
        // Area tags interactions with strong hover effects
        const areaTags = document.querySelectorAll('.area-tag');
        areaTags.forEach(tag => {
            tag.addEventListener('click', function () {
                const area = this.textContent;

                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-3px) scale(1.08)';
                }, 100);

                showEnhancedNotification(`Searching for properties in ${area}...`, 'info');
                setTimeout(() => {
                    window.open('tel:+919810623803', '_self');
                }, 1500);
            });

            tag.style.cursor = 'pointer';
        });

        // Enhanced button interactions
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mousedown', function () {
                if (!this.disabled) {
                    this.style.transform = 'scale(0.98)';
                }
            });

            button.addEventListener('mouseup', function () {
                if (!this.disabled) {
                    this.style.transform = '';
                }
            });
        });

        // WhatsApp enhanced interaction
        const whatsappBtns = document.querySelectorAll('.whatsapp-btn, .whatsapp-nav-btn');
        whatsappBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const message = encodeURIComponent('Hello! I am interested in your real estate services in Faridabad. Please provide more information about available properties.');
                const whatsappUrl = `https://wa.me/919810623803?text=${message}`;

                showEnhancedNotification('Opening WhatsApp...', 'info');
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                }, 500);
            });
        });

        console.log('Micro-interactions initialized');
    }

    // Enhanced Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe sections for scroll animations
        const sections = document.querySelectorAll('.services, .service-areas, .contact, .faridabad-benefits');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });

        console.log('Scroll animations initialized');
    }

    // Enhanced Notification System - Updated with new colors
    function showEnhancedNotification(message, type = 'info', duration = 5000) {
        // Remove existing notification
        const existing = document.querySelector('.enhanced-notification');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = `enhanced-notification enhanced-notification--${type}`;

        // Create notification content
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${getEnhancedNotificationIcon(type)}</div>
                <div class="notification-text">
                    <div class="notification-message">${message}</div>
                    <div class="notification-progress"></div>
                </div>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Enhanced styles with new colors
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            transform: translateX(400px) scale(0.8);
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            max-width: 400px;
            font-family: var(--font-family-base);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;

        const colors = {
            success: { bg: 'rgba(99, 102, 241, 0.95)', text: '#ffffff', accent: '#6366f1' },
            error: { bg: 'rgba(239, 68, 68, 0.95)', text: '#ffffff', accent: '#ef4444' },
            warning: { bg: 'rgba(245, 158, 11, 0.95)', text: '#ffffff', accent: '#fbbf24' },
            info: { bg: 'rgba(99, 102, 241, 0.95)', text: '#ffffff', accent: '#6366f1' }
        };

        const color = colors[type] || colors.info;
        notification.style.background = color.bg;
        notification.style.color = color.text;

        document.body.appendChild(notification);

        // Enhanced entrance animation
        setTimeout(() => {
            notification.style.transform = 'translateX(0) scale(1)';
        }, 10);

        // Progress bar animation
        const progressBar = notification.querySelector('.notification-progress');
        if (progressBar) {
            progressBar.style.cssText = `
                width: 100%;
                height: 2px;
                background: rgba(255, 255, 255, 0.3);
                margin-top: 8px;
                border-radius: 2px;
                overflow: hidden;
                position: relative;
            `;

            const progress = document.createElement('div');
            progress.style.cssText = `
                width: 0%;
                height: 100%;
                background: ${color.accent};
                transition: width ${duration}ms linear;
                border-radius: 2px;
            `;
            progressBar.appendChild(progress);

            setTimeout(() => {
                progress.style.width = '100%';
            }, 100);
        }

        // Auto remove with enhanced exit animation
        setTimeout(() => {
            notification.style.transform = 'translateX(400px) scale(0.8)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 400);
        }, duration);
    }

    function getEnhancedNotificationIcon(type) {
        const icons = {
            success: '🎉',
            error: '⚠️',
            warning: '💡',
            info: '📞'
        };
        return icons[type] || icons.info;
    }

    // Add enhanced notification styles
    const notificationStyles = `
        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 16px;
        }
        
        .notification-icon {
            font-size: 24px;
            flex-shrink: 0;
        }
        
        .notification-text {
            flex: 1;
        }
        
        .notification-message {
            font-size: 14px;
            font-weight: 500;
            line-height: 1.4;
            margin-bottom: 4px;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            margin-left: 8px;
            opacity: 0.8;
            transition: all 0.2s ease;
            color: inherit;
            flex-shrink: 0;
        }
        
        .notification-close:hover {
            opacity: 1;
            transform: scale(1.1);
        }
    `;

    // Inject enhanced notification styles
    if (!document.getElementById('notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }

    // Phone number click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function () {
            showEnhancedNotification('Connecting you to Wadhwa Properties...', 'info');
        });
    });

    // Enhanced utility functions
    window.WadhwaProperties = {
        showNotification: showEnhancedNotification,
        formatPhoneNumber: function (phone) {
            const cleaned = phone.replace(/\D/g, '');
            if (cleaned.length === 10) {
                return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
            } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
                return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
            }
            return phone;
        },
        callNow: function () {
            showEnhancedNotification('Initiating call...', 'info');
            setTimeout(() => {
                window.open('tel:+919810623803', '_self');
            }, 500);
        },
        openWhatsApp: function () {
            const message = encodeURIComponent('Hello! I am interested in your real estate services in Faridabad.');
            showEnhancedNotification('Opening WhatsApp...', 'info');
            setTimeout(() => {
                window.open(`https://wa.me/919810623803?text=${message}`, '_blank');
            }, 500);
        }
    };

    // Console welcome message
    console.log('%c🏠 Welcome to Wadhwa Properties!', 'color: #3b82f6; font-size: 20px; font-weight: bold; text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);');
    console.log('%c🚀 Neo-Modern Theme - Electric Blue & Glass', 'color: #8b5cf6; font-size: 14px; font-weight: bold;');
    console.log('%c📞 Serving Faridabad since 1999 | Call: +91 98106 23803', 'color: #b8b9c0; font-size: 12px;');

    // Performance monitoring
    window.addEventListener('load', function () {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color: #6366f1; font-size: 12px;');
    });
    // Back to Top Button Functionality
    function initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');

        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        console.log('Back to Top initialized');
    }
});