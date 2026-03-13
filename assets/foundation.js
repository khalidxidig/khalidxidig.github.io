/* --- FOUNDATION POPUP --- */
function initFoundationPopup() {
    // Check if already shown in this session
    if (sessionStorage.getItem('foundationPopupShown')) return;

    // Wait 10 seconds before showing
    setTimeout(() => {
        if (!document.getElementById('foundationModal')) {
            let assetBase = document.body.getAttribute('data-asset-base') || '';
            // If assetBase is "./", normalize it to empty string for cleaner paths
            if (assetBase === './') assetBase = '';
            
            const foundationPath = assetBase + 'assets/images/foundation/';
            
            const slideImages = [
                foundationPath + 'slide1.jpg',
                foundationPath + 'slide2.jpg',
                foundationPath + 'slide3.jpg',
                foundationPath + 'slide4.jpg'
            ];

            const logoSrc = foundationPath + 'logo.png';
            
            const modalHTML = `
                <div id="foundationModal" class="foundation-modal">
                    <div class="foundation-modal-content">
                        <button class="foundation-modal-close" aria-label="Close">&times;</button>
                        <div class="foundation-banner">
                            <div class="foundation-slider">
                                ${slideImages.map((src, index) => `
                                    <div class="foundation-slide">
                                        ${index === 0 ? `<div class="foundation-logo-overlay"><img src="${logoSrc}" alt="Logo"></div>` : ''}
                                        <img src="${src}" alt="Mama Ugaaso Foundation Slide ${index + 1}">
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="foundation-text">
                            <h3>Mama Ugaaso Foundation</h3>
                            <p class="foundation-subtitle">Ka qeyb qaado mustaqbalka ilmaha agoonta</p>
                            <p class="foundation-description">
                                Xarunta agoonta <strong>Mama Ugaaso Foundation</strong> waxay taageertaa carruur aan waalid lahayn, si ay u helaan <strong>waxbarasho</strong>, iyo <strong>daryeel joogto ah</strong>. 
                                Hal taageere adiga oo kale ah wuxuu ka dhigi karaa <strong>hal agoon</strong> inuu helo buug, uniform, iyo fursad <strong>mustaqbal fiican</strong>.
                            </p>
                            <div class="foundation-actions">
                                <a href="#" class="btn btn-primary foundation-cta">Aan caawiyo ilmaha agoonta</a>
                                <a href="https://mamaugaasofoundation.org/" target="_blank" class="btn btn-outline">Sii akhri</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        const modal = document.getElementById('foundationModal');
        const slider = modal.querySelector('.foundation-slider');
        const slides = modal.querySelectorAll('.foundation-slide');
        const closeBtn = modal.querySelector('.foundation-modal-close');
        const ctaBtn = modal.querySelector('.foundation-cta');

        if (modal) {
            // Short delay to allow CSS transitions
            setTimeout(() => modal.classList.add('show'), 100);
            sessionStorage.setItem('foundationPopupShown', 'true');

            // Slider logic
            let currentSlide = 0;
            const slideCount = slides.length;
            
            const startSlider = () => {
                return setInterval(() => {
                    currentSlide = (currentSlide + 1) % slideCount;
                    if (slider) {
                        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
                    }
                }, 4000); // Change slide every 4 seconds
            };

            let sliderInterval = startSlider();

            // CTA Logic: Dialer for mobile, Alert for desktop
            if (ctaBtn) {
                ctaBtn.addEventListener('click', (e) => {
                    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                    if (isMobile) {
                        window.location.href = "tel:*712*611660011*";
                    } else {
                        e.preventDefault();
                        alert("Waxaad ka caawin kartaa (252) 611660011, Mahadsanid.");
                    }
                });
            }

            closeBtn.onclick = () => {
                modal.classList.remove('show');
                clearInterval(sliderInterval);
            };
            
            modal.onclick = (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    clearInterval(sliderInterval);
                }
            };
        }
    }, 10000);
}

// Initialize foundation popup
document.addEventListener('DOMContentLoaded', initFoundationPopup);
