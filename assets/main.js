/* --- THEME TOGGLE LOGIC --- */
function initTheme() {
    const themeToggle = document.querySelectorAll('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateToggleIcons('dark');
    }

    themeToggle.forEach(btn => {
        btn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                updateToggleIcons('light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateToggleIcons('dark');
            }
        });
    });
}

function updateToggleIcons(theme) {
    const icons = document.querySelectorAll('.theme-toggle i');
    icons.forEach(icon => {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

/* --- IMAGE PROTECTION & DETERRENTS --- */
function initImageProtection() {
    // Disable right-click site-wide
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    }, false);

    // Detekt PrintScreen (Best effort)
    document.addEventListener('keyup', (e) => {
        if (e.key === 'PrintScreen') {
            navigator.clipboard.writeText('');
            showToast('Screenshots are disabled for gallery protection.');
        }
    });

    // Disable dragging gallery images
    document.querySelectorAll('.gitem img, .project-image img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
}

function showToast(message) {
    let toast = document.createElement('div');
    toast.className = 'toast-warning';
    toast.innerText = message;
    document.body.appendChild(toast);

    // Add CSS for toast if not exists
    if (!document.getElementById('toastStyle')) {
        let style = document.createElement('style');
        style.id = 'toastStyle';
        style.innerHTML = `
            .toast-warning {
                position: fixed;
                bottom: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: #6366F1; /* Modern Indigo */
                color: #fff;
                padding: 12px 24px;
                border-radius: 8px;
                z-index: 9999;
                font-weight: 600;
                box-shadow: 0 10px 15px rgba(0,0,0,0.2);
                animation: fadeInOut 3s forwards;
            }
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, 20px); }
                15% { opacity: 1; transform: translate(-50%, 0); }
                85% { opacity: 1; transform: translate(-50%, 0); }
                100% { opacity: 0; transform: translate(-50%, -20px); }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/* --- PROFILE MODAL --- */
function initProfileModal() {
    // Inject Modal HTML if not exists
    if (!document.getElementById('profileModal')) {
        const assetBase = document.body.getAttribute('data-asset-base') || '';
        const profileSrc = assetBase + 'assets/images/khalid.jpeg';
        const modalHTML = `
            <div id="profileModal" class="profile-modal">
              <div class="profile-modal-content">
                <button class="profile-modal-close" aria-label="Close Modal">&times;</button>
                <div style="display: flex; justify-content: center; width: 100%;">
                    <img src="${profileSrc}" class="profile-modal-img" alt="Khalid Mohamed Ali Profile">
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                    <h2 class="profile-modal-name">Khalid Mohamed Ali</h2>
                    <p class="profile-modal-title">Civil Engineer & Architectural Designer</p>
                </div>
                <p class="profile-modal-desc">
                    <strong>Welcome to my portfolio!</strong><br><br>
                    I'm Khalid, a dedicated architectural designer and civil engineer with a passion for bringing ideas to life through modern and functional spaces. 
                    From precise 2D planning to stunning 3D visualization and robust structural analysis, I'm here to craft your vision into reality.<br><br>
                    <em>Let's build something truly exceptional together.</em>
                </p>
              </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const modal = document.getElementById('profileModal');
    const closeBtn = modal ? modal.querySelector('.profile-modal-close') : null;

    // The user wants to click ONLY on the profile circle (.brand-profile)
    const profileCircles = document.querySelectorAll('.brand-profile');

    if (modal) {
        profileCircles.forEach(circle => {
            circle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // prevent parent <a> link navigation
                modal.classList.add('show');
            });
        });

        const closeModal = () => {
            modal.classList.remove('show');
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }
}

/* --- BRAND LINK SCROLL --- */
function initBrandScroll() {
    const brandLinks = document.querySelectorAll('.navbar-brand .brand-text');
    const path = window.location.pathname;
    const isHomePage = path === '/' || path.endsWith('/') || path.endsWith('index.html') || /\/index\/?$/.test(path);

    brandLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (isHomePage) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* --- PROJECT GALLERY CYCLING --- */
function initGalleryCycling() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const imgContainer = card.querySelector('.project-image');
        if (!imgContainer) return;

        const images = imgContainer.querySelectorAll('img');
        if (images.length <= 1) return;

        let interval;
        let currentIndex = 0;

        card.addEventListener('mouseenter', () => {
            interval = setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 1000);
        });

        card.addEventListener('mouseleave', () => {
            clearInterval(interval);
            images.forEach((img, idx) => {
                img.classList.toggle('active', idx === 0);
            });
            currentIndex = 0;
        });
    });
}

/* --- PROJECTS FILTERING --- */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const filterBadgeContainer = document.querySelector('.filter-badge-container');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                // Update badge
                if (filterBadgeContainer) {
                    if (filterValue === 'all') {
                        filterBadgeContainer.innerHTML = '';
                    } else {
                        const label = this.innerText;
                        filterBadgeContainer.innerHTML = `<span class="filter-badge">${label}</span>`;
                    }
                }

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === category) {
                        card.classList.remove('hidden');
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }
}

/* --- LIGHTBOX GALLERY --- */
function initLightbox() {
    const galleryImages = document.querySelectorAll('.gitem img');
    if (galleryImages.length === 0) return;

    // Inject Lightbox HTML
    if (!document.getElementById('lightbox')) {
        const lightboxHTML = `
            <div id="lightbox" class="lightbox">
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <button class="lightbox-btn lightbox-prev"><i class="fas fa-chevron-left"></i></button>
                    <img src="" alt="Lightbox Image" class="lightbox-img">
                    <button class="lightbox-btn lightbox-next"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    const images = Array.from(galleryImages).map(img => img.src);

    const openLightbox = (index) => {
        currentIndex = index;
        lightboxImg.src = images[currentIndex];
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden'; // Disable scroll
    };

    const closeLightbox = () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = ''; // Enable scroll
    };

    const nextImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = images[currentIndex];
            lightboxImg.style.opacity = '1';
        }, 200);
    };

    const prevImage = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = images[currentIndex];
            lightboxImg.style.opacity = '1';
        }, 200);
    };

    galleryImages.forEach((img, index) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
}

/* --- BLOG SEARCH FILTERING --- */
function initBlogSearch() {
    const searchInput = document.getElementById('blog-search');
    const blogCards = document.querySelectorAll('.blog-section .blog-card');

    if (searchInput && blogCards.length > 0) {
        searchInput.addEventListener('keyup', function(e) {
            const term = e.target.value.toLowerCase();
            
            blogCards.forEach(card => {
                const title = card.querySelector('.blog-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
                
                if (title.includes(term) || excerpt.includes(term)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

/* --- BLOG SOCIAL SHARING --- */
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.social-share-btn');
    if (shareButtons.length === 0) return;

    let currentUrl = window.location.href;
    
    // If running locally, replace file path with production domain for sharing compatibility
    if (window.location.protocol === 'file:') {
        const pathParts = window.location.pathname.split('/');
        const fileName = pathParts[pathParts.length - 1];
        // Handle root index or specific files
        const finalPath = fileName === '' ? '' : fileName;
        currentUrl = `https://khalidmohamed.me/${finalPath}`;
    }

    const url = encodeURIComponent(currentUrl);
    const title = encodeURIComponent(document.title);

    shareButtons.forEach(btn => {
        if (btn.classList.contains('share-whatsapp')) {
            btn.href = `https://api.whatsapp.com/send?text=${title}%20${url}`;
            btn.target = '_blank';
        } else if (btn.classList.contains('share-facebook')) {
            btn.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            btn.target = '_blank';
        } else if (btn.classList.contains('share-telegram')) {
            btn.href = `https://t.me/share/url?url=${url}&text=${title}`;
            btn.target = '_blank';
        }
    });
}

/* --- LOCAL DEVELOPMENT LINK FIX --- */
function initLocalFix() {
    if (window.location.protocol === 'file:') {
        document.querySelectorAll('a').forEach(a => {
            const href = a.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.includes('.html') && !href.includes('mailto:') && !href.includes('tel:')) {
                // Append index.html for root or folder paths, otherwise append .html
                if (href.endsWith('/') || href === '..') {
                   // If href is '../', it navigates to parent directory, index.html is needed
                   a.setAttribute('href', href.endsWith('/') ? href + 'index.html' : href + '/index.html');
                } else {
                   a.setAttribute('href', href + '.html');
                }
            }
        });
    }
}

/* --- MAIN INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('js-loaded');
    initLocalFix();
    initTheme();
    initProfileModal();
    initLightbox();
    initBrandScroll();
    initProjectFilters();
    initGalleryCycling();
    initImageProtection();
    initBlogSearch();
    initSocialSharing();

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Scroll Reveal Animation (Standard)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const delay = entry.target.getAttribute('data-delay');
                if (delay) entry.target.style.transitionDelay = delay + 'ms';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Staggered Project Card Entrance & Auto-Float
    const projectObserver = new IntersectionObserver((entries) => {
        let visibleCount = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('reveal-visible')) {
                const card = entry.target;
                const staggerDelay = visibleCount * 120; // 120ms stagger
                visibleCount++;

                setTimeout(() => {
                    card.classList.add('reveal-visible');

                    // Start floating animation after entrance transition ends
                    setTimeout(() => {
                        card.classList.add('float-active');
                        // Random delay for floating so they don't move together
                        card.style.animationDelay = `${Math.random() * -5}s`;
                    }, 600);
                }, staggerDelay);

                projectObserver.unobserve(card);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.project-card').forEach(card => {
        projectObserver.observe(card);
    });
});
