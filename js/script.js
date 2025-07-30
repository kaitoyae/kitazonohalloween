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
        const tl = gsap.timeline({ delay: 0.1 });

        tl.from('.hero-background img', {
            scale: 1.1,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
        })
        .from('.hero-title', {
            y: 40,
            x: -20,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
        }, "-=0.8")
        .from('.hero-catchphrase', {
            y: 40,
            x: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
        }, "<")
        .from('.feature-badge', {
            scale: 0.5,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
            stagger: 0,
            onComplete: function() {
                gsap.set('.feature-badge', { opacity: 1, scale: 1 });
            }
        }, "-=0.2")
        .from('.hero-bottom-info', {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
        }, "-=0.6");
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
            duration: 0.6,
            ease: 'power3.out',
        })
        .from('.introduction-text p', {
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.1,
        }, "-=0.3");
    };

    /**
     * Enhanced Magic Particles Effect for Introduction Section
     */
    const createMagicParticles = () => {
        const particleContainer = document.getElementById('particles-intro');
        if (!particleContainer) return;

        // Create floating light orbs
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 8 + 3;
            const colors = [
                'rgba(255,190,11,0.7)',    /* 元の黄色 */
                'rgba(131,56,236,0.6)',    /* 元の紫色 */
                'rgba(255,182,193,0.5)',   /* 控えめなピンク */
                'rgba(161,95,251,0.5)',    /* 明るい紫 */
                'rgba(255,215,0,0.6)'      /* 控えめなゴールド */
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, ${color} 0%, transparent 70%);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                box-shadow: 0 0 ${size * 2}px ${color.replace('0.', '0.3')};
            `;
            
            particleContainer.appendChild(particle);
            
            // Complex floating animation
            gsap.to(particle, {
                y: `+=${Math.random() * 200 - 100}`,
                x: `+=${Math.random() * 300 - 150}`,
                scale: Math.random() * 0.5 + 0.8,
                opacity: 0,
                rotation: Math.random() * 360,
                duration: Math.random() * 15 + 8,
                repeat: -1,
                ease: 'sine.inOut',
                delay: Math.random() * 3,
                yoyo: true,
            });
        }

        // Create magical sparkles
        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            const sparkleTypes = ['✦', '◆', '★', '◇', '▲'];
            sparkle.innerHTML = sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)];
            sparkle.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 8}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                opacity: 0.4;
                color: ${Math.random() > 0.5 ? '#ffbe0b' : '#8338ec'};
                text-shadow: 0 0 10px currentColor;
            `;
            
            particleContainer.appendChild(sparkle);
            
            // Twinkling animation
            gsap.to(sparkle, {
                rotation: 360,
                scale: Math.random() * 0.8 + 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                duration: Math.random() * 6 + 3,
                repeat: -1,
                ease: 'power2.inOut',
                yoyo: true,
                delay: Math.random() * 2,
            });
        }

        // Create floating geometric shapes
        for (let i = 0; i < 6; i++) {
            const shape = document.createElement('div');
            const shapeSize = Math.random() * 15 + 8;
            const shapeTypes = ['circle', 'triangle', 'square'];
            const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            
            let shapeCSS = `
                position: absolute;
                width: ${shapeSize}px;
                height: ${shapeSize}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                opacity: 0.3;
            `;
            
            if (shapeType === 'circle') {
                shapeCSS += `
                    background: linear-gradient(45deg, rgba(255,190,11,0.5), rgba(131,56,236,0.4));
                    border-radius: 50%;
                `;
            } else if (shapeType === 'triangle') {
                shapeCSS += `
                    background: transparent;
                    border-left: ${shapeSize/2}px solid transparent;
                    border-right: ${shapeSize/2}px solid transparent;
                    border-bottom: ${shapeSize}px solid rgba(131,56,236,0.5);
                    width: 0;
                    height: 0;
                `;
            } else {
                shapeCSS += `
                    background: linear-gradient(135deg, rgba(161,95,251,0.4), rgba(255,182,193,0.3));
                    transform: rotate(45deg);
                `;
            }
            
            shape.style.cssText = shapeCSS;
            particleContainer.appendChild(shape);
            
            // Slow drift animation
            gsap.to(shape, {
                y: `+=${Math.random() * 150 - 75}`,
                x: `+=${Math.random() * 150 - 75}`,
                rotation: Math.random() * 720 - 360,
                duration: Math.random() * 20 + 15,
                repeat: -1,
                ease: 'none',
                yoyo: true,
                delay: Math.random() * 5,
            });
        }
    };

    /**
     * News Section Animation
     */
    const animateNews = () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#news',
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });

        tl.from('.news-placeholder', {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.8,
            ease: 'power3.out',
        })
        .from('.news-icon', {
            scale: 0,
            rotation: -180,
            duration: 0.6,
            ease: 'back.out(1.7)',
        }, "-=0.4")
        .from('.news-placeholder-title', {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.out',
        }, "-=0.3")
        .from('.news-placeholder-text', {
            opacity: 0,
            y: 15,
            duration: 0.4,
            ease: 'power2.out',
        }, "-=0.2");
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
    createMagicParticles();
    animateIntroduction();
    animateNews();
    animateOverview();
    animateContents();
    animateGallery();
    animateDecorations();

    // --- Gallery Lightbox ---
    const initGalleryLightbox = () => {
        // Create modal HTML
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="gallery-modal-content">
                <span class="gallery-modal-close">&times;</span>
                <img src="" alt="Gallery Image">
            </div>
        `;
        document.body.appendChild(modal);

        const modalImg = modal.querySelector('img');
        const closeBtn = modal.querySelector('.gallery-modal-close');

        // Add click handlers to gallery photos
        document.querySelectorAll('.gallery-photo').forEach(photo => {
            photo.addEventListener('click', () => {
                modalImg.src = photo.src;
                modalImg.alt = photo.alt;
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal handlers
        const closeModal = () => {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) {
                closeModal();
            }
        });
    };

    initGalleryLightbox();

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
    // This part is no longer needed as we switched to a static image.
    /*
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
    */
});
