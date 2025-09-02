 // Discord Webhook Configuration
        //const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN';

        // Initialize AOS
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });

        // Loading Screen
        window.addEventListener('load', function() {
            const loadingScreen = document.getElementById('loadingScreen');
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 2000);
        });

        // Typing Effect
        if (typeof Typed !== 'undefined') {
            new Typed('#typed-text', {
                strings: [
                    'Ethical Hacker',
                    'Penetration Tester',
                    'Security Researcher',
                    'Threat Hunter',
                    'CTF Player',
                    'Cybersecurity Enthusiast'
                ],
                typeSpeed: 80,
                backSpeed: 50,
                backDelay: 2000,
                startDelay: 1000,
                loop: true,
                showCursor: true
            });
        }

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active nav link highlighting
        const navLinks = document.querySelectorAll('.nav-link');
        
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 200;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNavLink);

        // Smooth scroll for navigation links
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

        // Stats counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number[data-count]');
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.ceil(current);
                }, 30);
            });
        }

        // Trigger counter animation when in view
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const statsSection = document.querySelector('.hero-stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        let isDarkTheme = false;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            isDarkTheme = savedTheme === 'dark';
            updateTheme();
        } else {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                isDarkTheme = true;
                updateTheme();
            }
        }

        function updateTheme() {
            if (isDarkTheme) {
                document.body.setAttribute('data-theme', 'dark');
                themeIcon.className = 'fas fa-sun';
            } else {
                document.body.removeAttribute('data-theme');
                themeIcon.className = 'fas fa-moon';
            }
            localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        }

        themeToggle.addEventListener('click', function() {
            isDarkTheme = !isDarkTheme;
            updateTheme();
        });

// Discord Webhook Configuration ============= newly added
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1412288962751369216/tQNIbewvM6Akmt2kkmtaX9SoUkvZPY_R2m8MX3N0h5UJOkn-09oCXqFSaNPSPHjwsC9k'; // Paste your webhook URL here

// Enhanced Discord message sender
async function sendToDiscord(formData) {
    const webhookPayload = {
        username: "Portfolio Contact Bot",
        avatar_url: "https://cdn-icons-png.flaticon.com/512/1828/1828506.png", // Professional contact icon
        embeds: [{
            title: "🔒 New Portfolio Contact Message",
            description: "Someone reached out through your cybersecurity portfolio!",
            color: 0x2563eb, // Blue color
            fields: [
                {
                    name: "👤 Name",
                    value: `\`${formData.name}\``,
                    inline: true
                },
                {
                    name: "📧 Email",
                    value: `\`${formData.email}\``,
                    inline: true
                },
                {
                    name: "🔍 Subject",
                    value: `\`${formData.subject}\``,
                    inline: false
                },
                {
                    name: "💬 Message",
                    value: `\`\`\`${formData.message}\`\`\``,
                    inline: false
                }
            ],
            thumbnail: {
                url: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png" // Shield icon
            },
            footer: {
                text: "Sathish M - Cybersecurity Portfolio",
                icon_url: "https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
            },
            timestamp: new Date().toISOString()
        }]
    };

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookPayload)
        });

        if (response.ok) {
            console.log('Message sent to Discord successfully');
            return true;
        } else {
            console.error('Discord webhook response:', response.status, response.statusText);
            throw new Error(`Discord webhook failed: ${response.status}`);
        }
    } catch (error) {
        console.error('Error sending to Discord:', error);
        return false;
    }
}

// Enhanced message display function
function showMessage(message, type) {
    const messageContainer = document.getElementById('messageContainer');
    const messageDiv = document.createElement('div');
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle'
    };
    
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${icons[type] || 'info-circle'}"></i> 
        <span>${message}</span>
        <button class="message-close" onclick="this.parentElement.style.display='none'">
            <i class="fas fa-times"></i>
        </button>
    `;
    messageDiv.style.display = 'flex';
    messageDiv.style.alignItems = 'center';
    messageDiv.style.justifyContent = 'space-between';
    
    messageContainer.innerHTML = '';
    messageContainer.appendChild(messageDiv);
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                if (messageDiv.parentElement) {
                    messageDiv.style.display = 'none';
                }
            }, 300);
        }
    }, 8000);
}

// Contact Form Handler with better error handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Validation
        const formData = new FormData(this);
        const data = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            subject: formData.get('subject').trim(),
            message: formData.get('message').trim()
        };
        
        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending to Discord...';
        submitBtn.disabled = true;
        
        try {
            // Send to Discord
            const success = await sendToDiscord(data);
            
            if (success) {
                // Success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent to Discord!';
                submitBtn.style.background = 'var(--success)';
                showMessage(
                    '✅ Message sent successfully! Your message has been delivered to my Discord server. I\'ll respond within 24 hours.',
                    'success'
                );
                
                // Reset form
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 4000);
            } else {
                throw new Error('Failed to send to Discord');
            }
        } catch (error) {
            // Error state
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
            submitBtn.style.background = 'var(--danger)';
            showMessage(
                '❌ Failed to send message to Discord. Please try again or contact me directly at sathish1012cybok@gmail.com',
                'error'
            );
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 4000);
        }
    });
}
        /*
        // Discord Integration for Contact Form
        function showMessage(message, type) {
            const messageContainer = document.getElementById('messageContainer');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}`;
            messageDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
            messageDiv.style.display = 'block';
            
            messageContainer.innerHTML = '';
            messageContainer.appendChild(messageDiv);
            
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }

        async function sendToDiscord(formData) {
            const webhookPayload = {
                embeds: [{
                    title: "🔐 New Contact Form Submission",
                    color: 0x2563eb,
                    fields: [
                        {
                            name: "📧 Name",
                            value: formData.name,
                            inline: true
                        },
                        {
                            name: "✉️ Email",
                            value: formData.email,
                            inline: true
                        },
                        {
                            name: "📋 Subject",
                            value: formData.subject,
                            inline: false
                        },
                        {
                            name: "💬 Message",
                            value: formData.message,
                            inline: false
                        }
                    ],
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: "Sathish M Portfolio Contact Form",
                        icon_url: "https://cdn.discordapp.com/emojis/123456789.png"
                    }
                }]
            };

            try {
                const response = await fetch(DISCORD_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(webhookPayload)
                });

                if (response.ok) {
                    return true;
                } else {
                    throw new Error('Discord webhook failed');
                }
            } catch (error) {
                console.error('Error sending to Discord:', error);
                return false;
            }
        }

        // Contact Form Handler
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Get form data
                const formData = new FormData(this);
                const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    subject: formData.get('subject'),
                    message: formData.get('message')
                };
                
                // Send to Discord
                const success = await sendToDiscord(data);
                
                if (success) {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.style.background = 'var(--success)';
                    showMessage('Message sent successfully! I\'ll get back to you soon via Discord.', 'success');
                    
                    // Reset form after delay
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        contactForm.reset();
                    }, 3000);
                } else {
                    submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
                    submitBtn.style.background = 'var(--danger)';
                    showMessage('Failed to send message. Please try again or contact me directly via email.', 'error');
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);
                }
            });
        }

        CV Download functionality
        const downloadCV = document.getElementById('downloadCV');
        if (downloadCV) {
            downloadCV.addEventListener('click', function(e) {
                e.preventDefault();
                
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                }, 1500);
            });
        }*/

        // added resume downloader ============= newly added
        // CV Download functionality - Replace the existing downloadCV event listener
const downloadCV = document.getElementById('downloadCV');
if (downloadCV) {
    downloadCV.addEventListener('click', function(e) {
        e.preventDefault();
        
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Download...';
        this.disabled = true;
        
        // Path to your resume file (adjust the filename as needed)
        const resumePath = './sathish-Resume.pdf'; // or './Sathish_M_Resume.pdf'
        
        // Alternative paths you might use:
        // const resumePath = './assets/resume.pdf';
        // const resumePath = './files/Sathish_M_Resume.pdf';
        // const resumePath = './documents/resume.pdf';
        
        // Create a temporary anchor element for download
        const downloadLink = document.createElement('a');
        downloadLink.href = resumePath;
        downloadLink.download = 'Sathish_M_Cybersecurity_Resume.pdf'; // Name for downloaded file
        downloadLink.style.display = 'none';
        
        // Add to DOM, click, then remove
        document.body.appendChild(downloadLink);
        
        // Simulate download delay and handle success/error
        setTimeout(() => {
            try {
                downloadLink.click();
                
                // Success state
                this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                this.style.background = 'var(--success)';
                
                // Show success message
                showMessage('Resume downloaded successfully!', 'success');
                
                // Reset button after delay
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    this.style.background = '';
                }, 3000);
                
            } catch (error) {
                console.error('Download failed:', error);
                
                // Error state
                this.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Download Failed';
                this.style.background = 'var(--danger)';
                
                // Show error message
                showMessage('Failed to download resume. Please contact me directly.', 'error');
                
                // Reset button after delay
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    this.style.background = '';
                }, 3000);
            }
            
            // Clean up
            document.body.removeChild(downloadLink);
            
        }, 1500);
    });
}

        // Achievement items click handler
        const achievementItems = document.querySelectorAll('.achievement-item');
        achievementItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = function(e) {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const imageDiv = item.querySelector('.achievement-image');
                            imageDiv.innerHTML = `<img src="${e.target.result}" alt="Achievement ${index + 1}">`;
                            
                            // Store in localStorage for persistence
                            localStorage.setItem(`achievement-${index}`, e.target.result);
                        };
                        reader.readAsDataURL(file);
                    }
                };
                input.click();
            });

            // Load saved images
            const savedImage = localStorage.getItem(`achievement-${index}`);
            if (savedImage) {
                const imageDiv = item.querySelector('.achievement-image');
                imageDiv.innerHTML = `<img src="${savedImage}" alt="Achievement ${index + 1}">`;
            }
        });

        // Skill tags hover effect
        function addSkillTagEffects() {
            const skillTags = document.querySelectorAll('.skill-tag');
            
            skillTags.forEach(tag => {
                tag.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05) translateY(-2px)';
                    this.style.boxShadow = '0 4px 20px rgba(37, 99, 235, 0.3)';
                });
                
                tag.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1) translateY(0)';
                    this.style.boxShadow = 'none';
                });
            });
        }

        // Enhanced scroll animations
        function addScrollAnimations() {
            const cards = document.querySelectorAll('.glass-card, .cert-card, .achievement-item');
            
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }
                });
            }, { threshold: 0.1 });

            cards.forEach(card => {
                card.style.transform = 'translateY(20px)';
                card.style.opacity = '0';
                card.style.transition = 'all 0.6s ease';
                cardObserver.observe(card);
            });
        }

        // Parallax effect for floating icons
        function addParallaxEffect() {
            const floatingIcons = document.querySelectorAll('.floating-icon');
            
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                
                floatingIcons.forEach((icon, index) => {
                    const speed = (index + 1) * parallaxSpeed;
                    icon.style.transform = `translateY(${scrolled * speed * 0.1}px) rotate(${scrolled * 0.1}deg)`;
                });
            });
        }

        // Initialize enhanced features
        document.addEventListener('DOMContentLoaded', function() {
            addScrollAnimations();
            addParallaxEffect();
            addSkillTagEffects();
        });

        // Console welcome message
        console.log(`
╔══════════════════════════════════════════╗
║          WELCOME TO MY PORTFOLIO         ║
║                                          ║
║      Sathish M - Cybersecurity Expert    ║
║                                          ║
║      > Securing the digital frontier     ║
║      > Professional. Secure. Reliable.   ║
║                                          ║
║      Contact: sathish1012cybok@gmail.com ║
╚══════════════════════════════════════════╝
        `);

        // Performance monitoring
        window.addEventListener('load', function() {
            const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
            console.log(`Portfolio loaded in ${loadTime}ms`);
            
            // Add performance metrics to console
            if ('connection' in navigator) {
                console.log(`Connection: ${navigator.connection.effectiveType}`);
            }
        });

        // Error handling for external resources
        window.addEventListener('error', function(e) {
            console.warn('Resource failed to load:', e.target.src || e.target.href);
        });

        // Keyboard accessibility
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
            
            // ESC key to close any modals or overlays
            if (e.key === 'Escape') {
                // Close any open modals or overlays
                const activeElements = document.querySelectorAll('.active, .show');
                activeElements.forEach(el => {
                    el.classList.remove('active', 'show');
                });
            }
        });
        
        document.addEventListener('click', function() {
            document.body.classList.remove('keyboard-navigation');
        });

        // Initialize floating icons animation
        function initFloatingIcons() {
            const floatingIcons = document.querySelectorAll('.floating-icon');
            floatingIcons.forEach((icon, index) => {
                // Add random delay to make animations more organic
                const delay = Math.random() * 2;
                icon.style.animationDelay = `${delay}s`;
                
                // Add slight random positioning variation
                const randomX = (Math.random() - 0.5) * 10;
                const randomY = (Math.random() - 0.5) * 10;
                icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
            });
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            initFloatingIcons();
        });