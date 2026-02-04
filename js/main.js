/**
 * DESIGNER_X Portfolio - Main JavaScript
 * Flat Cyberpunk Style with GSAP Animations
 */

// ============================================
// LOADING SCREEN
// ============================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    const loadingPercent = document.getElementById('loadingPercent');
    const loadingText = document.getElementById('loadingText');
    
    const loadingMessages = [
        'SYSTEM INITIALIZING',
        'LOADING ASSETS',
        'COMPILING MODULES',
        'ESTABLISHING CONNECTION',
        'READY'
    ];
    
    let progress = 0;
    let messageIndex = 0;
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Update final message
            loadingText.textContent = loadingMessages[loadingMessages.length - 1];
            
            // Hide loading screen with animation
            setTimeout(() => {
                gsap.to(loadingScreen, {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        loadingScreen.style.display = 'none';
                        initHeroAnimations();
                    }
                });
            }, 500);
        } else {
            // Update message based on progress
            const newMessageIndex = Math.floor((progress / 100) * (loadingMessages.length - 1));
            if (newMessageIndex !== messageIndex && newMessageIndex < loadingMessages.length - 1) {
                messageIndex = newMessageIndex;
                loadingText.textContent = loadingMessages[messageIndex];
            }
        }
        
        // Update progress bar
        loadingProgress.style.width = progress + '%';
        loadingPercent.textContent = Math.floor(progress) + '%';
        
    }, 150);
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');
    
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
        cursor.style.display = 'none';
        cursorRing.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Immediate cursor response (no inertia)
    function animateCursor() {
        // Cursor dot (immediate response)
        cursorX = mouseX;
        cursorY = mouseY;
        
        // Cursor ring (immediate response)
        ringX = mouseX;
        ringY = mouseY;
        
        cursor.style.left = cursorX - 12 + 'px';
        cursor.style.top = cursorY - 12 + 'px';
        
        cursorRing.style.left = ringX - 20 + 'px';
        cursorRing.style.top = ringY - 20 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, [data-cursor="hover"]');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.classList.add('hover');
            gsap.to(cursor, { scale: 1.5, duration: 0.2 });
        });
        
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('hover');
            gsap.to(cursor, { scale: 1, duration: 0.2 });
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorRing.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorRing.style.opacity = '1';
    });
}

// ============================================
// PARTICLE SYSTEM
// ============================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.5 ? '#39ff14' : '#00f3ff'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.1};
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
        
        // Animate each particle
        gsap.to(particle, {
            y: `random(-100, 100)`,
            x: `random(-100, 100)`,
            opacity: `random(0.1, 0.6)`,
            duration: `random(3, 8)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

// ============================================
// BINARY BACKGROUND
// ============================================
function initBinaryBackground() {
    const binaryBg = document.getElementById('binaryBg');
    const binaryString = '01';
    let binaryText = '';
    
    // Generate random binary text
    for (let i = 0; i < 500; i++) {
        binaryText += binaryString[Math.floor(Math.random() * 2)];
        if (i % 50 === 0) binaryText += '\n';
    }
    
    binaryBg.textContent = binaryText;
    
    // Position randomly
    binaryBg.style.top = Math.random() * 50 + '%';
    binaryBg.style.left = Math.random() * 50 + '%';
    
    // Subtle animation
    gsap.to(binaryBg, {
        opacity: 0.03,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

// ============================================
// HERO ANIMATIONS
// ============================================
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // Animate hero title
    tl.from('#heroTitle', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    })
    .from('#heroSubtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('#heroDecor', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.4')
    .from('#scrollIndicator', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.2');
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero parallax effect
    gsap.to('#heroTitle', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -100,
        opacity: 0.3
    });
    
    // HUD Panel animation
    gsap.from('#hudPanel', {
        scrollTrigger: {
            trigger: '#personal',
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Work cards stagger animation
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: (index % 3) * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Section headers animation
    const sectionGroups = document.querySelectorAll('.section-group');
    sectionGroups.forEach(group => {
        const header = group.querySelector('.flex');
        gsap.from(header, {
            scrollTrigger: {
                trigger: group,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}

// ============================================
// NAVIGATION
// ============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 100; // Account for sticky nav
        const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
}

// ============================================
// NAVIGATION ACTIVE STATE
// ============================================
function initNavigationActiveState() {
    const sections = ['graphic', 'ecommerce', 'material', 'other'];
    const navButtons = document.querySelectorAll('.nav-btn');
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveNav(sectionId),
            onEnterBack: () => setActiveNav(sectionId)
        });
    });
    
    function setActiveNav(activeId) {
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === activeId) {
                btn.classList.add('active');
            }
        });
    }
}

// ============================================
// GLITCH TEXT EFFECT (Enhanced)
// ============================================
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(el => {
        // Random glitch trigger
        setInterval(() => {
            if (Math.random() > 0.7) {
                el.style.animation = 'none';
                el.offsetHeight; // Trigger reflow
                el.style.animation = '';
            }
        }, 3000);
    });
}

// ============================================
// WORK CARD INTERACTIONS
// ============================================
function initWorkCardInteractions() {
    const workCards = document.querySelectorAll('.work-card');
    
    workCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add glow effect to other cards in the same row
            const siblings = Array.from(card.parentElement.children);
            siblings.forEach(sibling => {
                if (sibling !== card) {
                    gsap.to(sibling, { opacity: 0.6, duration: 0.3 });
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const siblings = Array.from(card.parentElement.children);
            siblings.forEach(sibling => {
                gsap.to(sibling, { opacity: 1, duration: 0.3 });
            });
        });
    });
}

// ============================================
// TERMINAL TEXT EFFECT
// ============================================
function initTerminalEffect() {
    const terminalElements = document.querySelectorAll('.terminal-text');
    
    terminalElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                el.textContent += text[i];
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    });
}

// ============================================
// SCANLINE ANIMATION
// ============================================
function initScanlineEffect() {
    const scanlines = document.querySelector('.scanlines');
    
    gsap.to(scanlines, {
        backgroundPosition: '0 100%',
        duration: 10,
        repeat: -1,
        ease: 'none'
    });
}

// ============================================
// HUD PANEL CORNER ANIMATION
// ============================================
function initHUDPanelEffects() {
    const hudPanel = document.getElementById('hudPanel');
    
    if (hudPanel) {
        // Subtle pulse animation
        gsap.to(hudPanel, {
            borderColor: 'rgba(57, 255, 20, 0.6)',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
function initPerformanceOptimizations() {
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            gsap.globalTimeline.pause();
        } else {
            gsap.globalTimeline.resume();
        }
    });
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.globalTimeline.timeScale(0);
    }
}

// ============================================
// PREVIEW POPUP - HOVER LARGE IMAGE
// ============================================
function initPreviewPopup() {
    const workCards = document.querySelectorAll('.work-card');
    const imageCache = new Map();
    let showTimeout;
    let hideTimeout;
    
    // Preload all preview images
    workCards.forEach(card => {
        const previewPopup = card.querySelector('.preview-popup');
        if (!previewPopup) return;
        
        const thumbImg = card.querySelector('img');
        if (!thumbImg) return;
        
        const imgSrc = thumbImg.src;
        
        // Update preview image src to match thumbnail
        const previewImg = previewPopup.querySelector('img');
        if (previewImg) {
            previewImg.src = imgSrc;
        }
        
        // Cache image
        if (!imageCache.has(imgSrc)) {
            const img = new Image();
            img.src = imgSrc;
            imageCache.set(imgSrc, img);
        }
    });
    
    workCards.forEach(card => {
        const previewPopup = card.querySelector('.preview-popup');
        if (!previewPopup) return;
        
        const thumbImg = card.querySelector('img');
        if (!thumbImg) return;
        
        const imgSrc = thumbImg.src;
        
        card.addEventListener('mouseenter', (e) => {
            clearTimeout(hideTimeout);
            
            // Delay showing preview to avoid flickering
            showTimeout = setTimeout(() => {
                const rect = card.getBoundingClientRect();
                
                // Set initial position
                previewPopup.style.left = (rect.right + 20) + 'px';
                previewPopup.style.top = rect.top + 'px';
                
                // Show preview
                previewPopup.style.display = 'block';
                
                // Small delay for CSS transition
                requestAnimationFrame(() => {
                    previewPopup.style.opacity = '1';
                    previewPopup.style.transform = 'scale(1)';
                });
            }, 200);
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const imgRect = previewImg.getBoundingClientRect();
            
            // Calculate position (right side of card)
            let left = rect.right + 20;
            let top = e.clientY - (imgRect.height / 2);
            
            // Prevent going off screen
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // If preview would go off right edge, show on left side
            if (left + imgRect.width > windowWidth - 20) {
                left = rect.left - imgRect.width - 20;
            }
            
            // Prevent going off top or bottom
            if (top < 20) {
                top = 20;
            } else if (top + imgRect.height > windowHeight - 20) {
                top = windowHeight - imgRect.height - 20;
            }
            
            previewPopup.style.left = left + 'px';
            previewPopup.style.top = top + 'px';
        });
        
        card.addEventListener('mouseleave', () => {
            clearTimeout(showTimeout);
            
            // Delay hiding to allow moving to adjacent cards
            hideTimeout = setTimeout(() => {
                previewPopup.style.opacity = '0';
                previewPopup.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    previewPopup.style.display = 'none';
                }, 300);
            }, 100);
        });
    });
}

// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================
function initCarousel() {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;
    
    const slides = document.querySelector('.carousel-slides');
    const slideItems = document.querySelectorAll('.carousel-slide');
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressFills = document.querySelectorAll('.progress-fill');
    const arrows = document.querySelectorAll('.carousel-arrow');
    
    let currentIndex = 0;
    let slideInterval;
    let progressInterval;
    const slideDuration = 10000; // 10 seconds per slide
    
    // Initialize
    updateSlide();
    startSlideShow();
    
    // Start slide show
    function startSlideShow() {
        // Clear existing intervals
        if (slideInterval) clearInterval(slideInterval);
        if (progressInterval) clearInterval(progressInterval);
        
        slideInterval = setInterval(nextSlide, slideDuration);
        startProgressAnimation();
    }
    
    // Start progress animation
    function startProgressAnimation() {
        // Clear existing interval
        if (progressInterval) clearInterval(progressInterval);
        
        // Reset all progress bars
        progressFills.forEach((fill, index) => {
            if (index === currentIndex) {
                fill.style.width = '0%';
            } else {
                fill.style.width = '0%';
            }
        });
        
        // Animate current progress bar
        let progress = 0;
        const progressSpeed = (slideDuration / 100);
        
        progressInterval = setInterval(() => {
            progress += 1;
            if (progress <= 100) {
                progressFills[currentIndex].style.width = progress + '%';
            } else {
                clearInterval(progressInterval);
            }
        }, progressSpeed);
    }
    
    // Update slide position
    function updateSlide() {
        const slideWidth = slideItems[0].offsetWidth;
        slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // Update progress bar widths
        progressBars.forEach((bar, index) => {
            if (index === currentIndex) {
                bar.style.width = '96px'; // Normal width
            } else {
                bar.style.width = '48px'; // Half width
            }
        });
        
        // Clear intervals and restart
        startSlideShow();
    }
    
    // Go to next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideItems.length;
        updateSlide();
    }
    
    // Go to previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideItems.length) % slideItems.length;
        updateSlide();
    }
    
    // Add arrow click events
    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            if (arrow.classList.contains('left')) {
                prevSlide();
            } else {
                nextSlide();
            }
        });
    });
    
    // Add progress bar click events
    progressBars.forEach((bar, index) => {
        bar.addEventListener('click', () => {
            currentIndex = index;
            updateSlide();
        });
    });
}

// ============================================
// CRT MODE TOGGLE
// ============================================
function initCRTToggle() {
    const crtToggle = document.getElementById('crt-toggle');
    const crtGlitch = document.getElementById('crt-glitch');
    if (!crtToggle || !crtGlitch) return;
    
    // Check localStorage for saved state
    const savedState = localStorage.getItem('crtMode');
    if (savedState === 'true') {
        document.body.classList.add('crt-active');
        crtToggle.textContent = 'CRT: ON';
    }
    
    // Add click event listener
    crtToggle.addEventListener('click', () => {
        // Trigger glitch effect
        crtGlitch.classList.add('active');
        
        // Remove active class after animation
        setTimeout(() => {
            crtGlitch.classList.remove('active');
        }, 500);
        
        // Toggle CRT mode
        document.body.classList.toggle('crt-active');
        
        // Update button text
        const isActive = document.body.classList.contains('crt-active');
        crtToggle.textContent = isActive ? 'CRT: ON' : 'CRT: OFF';
        
        // Save state to localStorage
        localStorage.setItem('crtMode', isActive);
    });
}

// ============================================
// INITIALIZE ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen first
    initLoadingScreen();
    
    // Initialize other features
    initCustomCursor();
    initParticles();
    initBinaryBackground();
    initGlitchEffect();
    initWorkCardInteractions();
    initSmoothScroll();
    initPerformanceOptimizations();
    initPreviewPopup();
    initCarousel();
    initCRTToggle();
    initFullscreenPreview();
    
    // Initialize scroll animations after a short delay
    setTimeout(() => {
        initScrollAnimations();
        initNavigationActiveState();
        initHUDPanelEffects();
    }, 100);
});

// ============================================
// RESIZE HANDLER
// ============================================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// ============================================
// FULLSCREEN IMAGE PREVIEW
// ============================================
function initFullscreenPreview() {
    const fullscreenPreview = document.getElementById('fullscreen-preview');
    const previewImage = document.getElementById('preview-image');
    const closePreview = document.getElementById('close-preview');
    const workCards = document.querySelectorAll('.work-card');
    
    if (!fullscreenPreview || !previewImage || !closePreview) return;
    
    // Open preview
    function openPreview(imageSrc) {
        previewImage.src = imageSrc;
        fullscreenPreview.style.opacity = '1';
        fullscreenPreview.style.pointerEvents = 'auto';
        document.body.style.overflow = 'hidden';
    }
    
    // Close preview
    function closePreviewFunc() {
        fullscreenPreview.style.opacity = '0';
        fullscreenPreview.style.pointerEvents = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Add click event to work cards
    workCards.forEach(card => {
        const img = card.querySelector('img');
        if (img) {
            card.addEventListener('click', () => {
                // Always use the thumbnail image src for preview
                openPreview(img.src);
            });
        }
    });
    
    // Close button click event
    closePreview.addEventListener('click', closePreviewFunc);
    
    // Click outside to close
    fullscreenPreview.addEventListener('click', (e) => {
        if (e.target === fullscreenPreview) {
            closePreviewFunc();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullscreenPreview.style.opacity === '1') {
            closePreviewFunc();
        }
    });
}
