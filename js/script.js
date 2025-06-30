document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);

    // Utility to split text for character animations
    const splitText = (selector) => {
        const elem = document.querySelector(selector);
        if (!elem) return;
        const text = elem.innerText;
        elem.innerHTML = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.className = 'char';
            span.innerText = char === ' ' ? '\u00A0' : char; // Non-breaking space
            elem.appendChild(span);
        });
    };

    /**
     * 5.1. Hero Section Animation
     * - Animates elements on page load.
     */
    const animateHero = () => {
        // No need to splitText for .hero-title anymore
        const tl = gsap.timeline();

        tl.from('.hero-title .word', {
            y: '100%',
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.18,
        })
        .from(['.hero-subtitle', '.hero-copy'], {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.2,
        }, "-=0.6")
        .from('.cta-button', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
        }, "-=0.4")
        .from('.hero-image-placeholder, .hero-video-wrapper', {
            scale: 1.1,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        }, "-=1.2");
    };

    /**
     * Introduction Section Animation
     */
    const animateIntroduction = () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#introduction',
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });

        tl.from('.introduction-title', {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
        })
        .from('.introduction-text p', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.2,
        }, "-=0.5");
    };

    /**
     * 5.2. Event Overview Section Animation
     * - Animates when scrolling into view.
     */
    const animateOverview = () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#overview',
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });

        tl.from('.overview-card', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
        })
        .from('.overview-item', {
            opacity: 0,
            scale: 0.5,
            y: 30,
            duration: 0.5,
            ease: 'back.out(1.7)',
            stagger: 0.15
        }, "-=0.5");
    };

    /**
     * 5.3. Main Contents Section Animation
     * - Cards slide in from the sides.
     */
    const animateContents = () => {
        gsap.from('.content-card.stamp-rally', {
            scrollTrigger: {
                trigger: '.content-card.stamp-rally',
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            x: -100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        });

        gsap.from('.content-card.night-marche', {
            scrollTrigger: {
                trigger: '.content-card.night-marche',
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            x: 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        });
    };

    /**
     * 5.4. Photo Gallery Section Animation
     * - Images scale in with a staggered, random delay.
     */
    const animateGallery = () => {
        gsap.from('.gallery-item', {
            scrollTrigger: {
                trigger: '#gallery',
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
            scale: 0.5,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: {
                each: 0.1,
                from: 'random'
            }
        });
    };

    // --- Animate Decorative Items ---
    const animateDecorations = () => {
        gsap.utils.toArray('.deco-item').forEach(item => {
            gsap.fromTo(item, 
                { opacity: 0, y: 50, scale: 0.8 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item.parentElement,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    };

    // --- Header Navigation ---
    const header = document.getElementById('header');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Fire all animations ---
    animateHero();
    animateIntroduction();
    animateOverview();
    animateContents();
    animateGallery();
    animateDecorations();

    // --- Modal (Lightbox) for flyers ---
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    };
    const closeModal = (modal) => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    };
    document.querySelectorAll('.detail-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = btn.getAttribute('data-modal');
            openModal(modalId);
        });
    });
    document.querySelectorAll('.modal').forEach(modal => {
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
        // Close on close button
        modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
    });
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.open').forEach(modal => closeModal(modal));
        }
    });

    // --- Dynamic Hero Video Source ---
    const videoElement = document.getElementById('hero-video-element');
    if (videoElement) {
        const landscapeVideoSrc = 'images/video-landscape.mp4';
        const portraitVideoSrc = 'images/video-portrait.mp4';
        let resizeTimer;

        const updateVideoSource = () => {
            const isPortrait = window.matchMedia("(max-aspect-ratio: 1/1)").matches;
            const targetSrc = isPortrait ? portraitVideoSrc : landscapeVideoSrc;
            
            // Extract filename from the full currentSrc path
            const currentSrcFile = videoElement.currentSrc.split('/').pop();
            const targetSrcFile = targetSrc.split('/').pop();

            if (currentSrcFile !== targetSrcFile) {
                videoElement.src = targetSrc;
                videoElement.load();
                videoElement.play().catch(error => {
                    console.log("Autoplay was prevented:", error);
                });
            }
        };

        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateVideoSource, 200); // Debounce
        };

        // Initial setup on load
        updateVideoSource();

        // Update on resize
        window.addEventListener('resize', handleResize);
    }

});
