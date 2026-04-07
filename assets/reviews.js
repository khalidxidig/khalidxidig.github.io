/**
 * Reviews Slider Logic - Design V3
 * Vanilla JavaScript for smooth testimonial transitions
 */

document.addEventListener('DOMContentLoaded', () => {
    initReviewsSlider();
});

function initReviewsSlider() {
    const sliderInner = document.querySelector('.reviews-slider-inner');
    if (!sliderInner) return;

    const slides = sliderInner.querySelectorAll('.slide-item');
    const prevBtn = document.querySelector('.arrow-prev');
    const nextBtn = document.querySelector('.arrow-next');
    const dotsContainer = document.querySelector('.slider-dots');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create Dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto-advance (Optional - set to 5 seconds)
    let autoSlide = setInterval(nextSlide, 5000);

    // Pause auto-slide on hover
    const sliderOuter = document.querySelector('.reviews-slider-outer');
    if (sliderOuter) {
        sliderOuter.addEventListener('mouseenter', () => clearInterval(autoSlide));
        sliderOuter.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 5000);
        });
    }
}
