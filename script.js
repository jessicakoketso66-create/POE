// Combined, cleaned script.js
(function() {
    // 1. TOAST NOTIFICATION
    function showToast(message, durationSec = 2.5) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        if (window._toastTimer) {
            clearTimeout(window._toastTimer);
            window._toastTimer = null;
        }

        window._toastTimer = setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(24px)';
            toast.style.pointerEvents = 'none';
            setTimeout(() => { if (toast.parentNode) toast.remove(); }, 500);
        }, durationSec * 1000);
    }

    // Menu link behavior
    const menuLink = document.getElementById('menu-link');
    if (menuLink) {
        menuLink.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('Explore our menu and discover the delicious delicacies we have in store for you!',2.2);
            setTimeout(() => {
                window.location.href = menuLink.getAttribute('href');
            }, 800);
        });
    }

    // Hero image click counter
    let clickCount = 0;
    const heroImg = document.getElementById('hero-image');
    if (heroImg) {
        heroImg.addEventListener('click', function() {
            clickCount++;
            const word = clickCount === 1 ? 'time' : 'times';
            showToast(`You've shown love and support ${clickCount} ${word}!`);
        });
    }

    // Navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href')
            if (!href || href === '#') return;
            e.preventDefault();
            const pageName = this.textContent.trim() || 'page';
            showToast(`Navigating to ${pageName}…`, 1.8);
            setTimeout(() => { window.location.href = href; }, 800);
        });
    });

    // Submit button
    const submitBtn = document.getElementById('submit-button');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('Your inquiry has been submitted. We will get back to you soon!', 3);
        });
    }
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Your inquiry has been submitted. We will get back to you soon!', 3);
            this.reset();
        });
    }

    // Contact (map) load
    const contact = document.getElementById('contact');
    if (contact) {
        contact.addEventListener('load', function() {
            showToast(' Visit our location and indulge in our delightful offerings!', 2.5);
        });
    }

    // Lightbox logic
    (function() {
        const overlay = document.getElementById('lightbox');
        if (!overlay) return;
        const lightboxImg = document.getElementById('lightbox-image');
        const caption = document.getElementById('lightbox-caption');
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');

        const productImages = document.querySelectorAll('.product-card img');
        let currentIndex = 0;
        const gallery = [];
        productImages.forEach(img => {
            gallery.push({
                src: img.getAttribute('src'),
                alt: img.getAttribute('alt') || 'Delicious treat',
                name: img.getAttribute('data-name') || 'Our treat'
            });
        });

        function openLightbox(index) {
            if (gallery.length === 0) return;
            if (index < 0) index = gallery.length - 1;
            if (index >= gallery.length) index = 0;
            currentIndex = index;
            const item = gallery[currentIndex];
            if (lightboxImg) { lightboxImg.src = item.src; lightboxImg.alt = item.alt; }
            if (caption) caption.textContent = `${item.name} (${currentIndex+1} / ${gallery.length})`;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() { overlay.classList.remove('active'); document.body.style.overflow = ''; }

        productImages.forEach((img, idx) => {
            img.addEventListener('click', function(e) { e.stopPropagation(); openLightbox(idx); });
        });

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', function(e) { if (e.target === overlay) closeLightbox(); });

        document.addEventListener('keydown', function(e) {
            if (!overlay.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') { e.preventDefault(); openLightbox(currentIndex - 1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); openLightbox(currentIndex + 1); }
        });

        if (prevBtn) prevBtn.addEventListener('click', function(e){ e.stopPropagation(); openLightbox(currentIndex - 1); });
        if (nextBtn) nextBtn.addEventListener('click', function(e){ e.stopPropagation(); openLightbox(currentIndex + 1); });
    })();

    // Welcome toast on load
    window.addEventListener('load', function() {
        showToast('Welcome to Butter&Bliss Bakery!', 2.5);
    });

})();