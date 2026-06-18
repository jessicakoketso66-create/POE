(function() {

            //--1.  TOAST NOTIFICATION --//
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
                    toast.classList.add('hidden');
                    setTimeout(() => {
                        if (toast.parentNode) toast.remove();
                    }, 500);
                }, durationSec * 1000);
            }

            //--2.  "MENU" BUTTON--//
            const menuBtn = document.getElementById('menu-button');
            if (menuBtn) {
                menuBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showToast('Explore our menu and discover the delicious delicacies we have in store for you!');
                });
            }

            //--3.  HERO IMAGE --//
            let clickCount = 0;
            const heroImg = document.getElementById('hero-image');
            if (heroImg) {
                heroImg.addEventListener('click', function() {
                    clickCount++;
                    const word = clickCount === 1 ? 'time' : 'times';
                    showToast(`You've shown love and support ${clickCount} ${word}!`);
                });
            }

            //--4. NAVIGATION LINKS --//
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href')
                    e.preventDefault();
                    if (href === 'index.html' || href === '#') {
                        showToast('Welcome to Butter&Bliss! Enjoy your stay!', 2);
                        setTimeout(() => {
                            window.location.href = href || 'index.html';
                        }, 800);
                        return;
                    }
                    const pageName = this.textContent.trim() || 'page';
                    showToast(`Navigating to ${pageName}…`, 1.8);
                    setTimeout(() => {
                        window.location.href = href;
                    }, 800);
                });
            });

            //--5. "SUBMIT" BUTTON  (inquiry)--//
            const submitBtn = document.getElementById('submit-button');
            if (submitBtn) {
                submitBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showToast('Your inquiry has been submitted. We will get back to you soon!', 3);
                });
            }

            //--6. INTERACTIVE MAP  (contact)--//
            const mapEl = document.getElementById('map');
            if (mapEl) {
                mapEl.addEventListener('click', function() {
                    showToast(' Visit our location and indulge in our delightful offerings!', 2.5);
                });
            }

            //--7.  ON PAGE LOAD  —  (welcome message)--//
            window.addEventListener('load', function() {
                showToast(' Welcome to Butter&Bliss! Indulge in our delicious treats and experience pure bliss!', 3.2);
            });

        })();

