/**
 * CULT BEAUTY SPACE — Interactive Controls
 * Accessible, lightweight, zero-dependency script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const bookingTriggers = document.querySelectorAll('.js-open-booking');
  const bookingModal = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalServiceBadge = document.getElementById('modalServiceBadge');
  const modalServiceName = document.getElementById('modalServiceName');
  const modalWhatsappLink = document.getElementById('modalWhatsappLink');

  const mobileToggle = document.querySelector('.js-mobile-toggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.js-mobile-link');
  const contactsTrigger = document.querySelector('a[href="#contacts"]');

  const serviceToggles = document.querySelectorAll('.js-service-toggle');

  let lastFocusedElement = null;

  // Open Booking Modal (with optional pre-selected service)
  const openModal = (serviceName = null) => {
    if (!bookingModal) return;
    lastFocusedElement = document.activeElement;

    if (serviceName && modalServiceBadge && modalServiceName) {
      modalServiceName.textContent = serviceName;
      modalServiceBadge.style.display = 'inline-flex';
      if (modalWhatsappLink) {
        modalWhatsappLink.href = `https://wa.me/79173657575?text=${encodeURIComponent('Здравствуйте! Хочу записаться в cult. на услугу: ' + serviceName)}`;
      }
    } else {
      if (modalServiceBadge) modalServiceBadge.style.display = 'none';
      if (modalWhatsappLink) modalWhatsappLink.href = 'https://wa.me/79173657575';
    }

    bookingModal.classList.add('is-active');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn?.focus();
  };

  // Close Booking Modal
  const closeModal = () => {
    if (!bookingModal || !bookingModal.classList.contains('is-active')) return;
    bookingModal.classList.remove('is-active');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    if (!mobileDrawer || !mobileToggle) return;
    const isOpen = mobileDrawer.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileDrawer.classList.add('is-open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMobileMenu = () => {
    if (!mobileDrawer || !mobileToggle) return;
    mobileDrawer.classList.remove('is-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  // Event Listeners for Booking Modal triggers
  bookingTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      const service = btn.getAttribute('data-service') || null;
      openModal(service);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);

  // Close on backdrop click
  bookingModal?.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeModal();
    }
  });

  // Mobile Drawer Events
  mobileToggle?.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Header Navigation: Natural flow at page top; fixes to top only AFTER scrolling down with smooth enter/exit
  const siteHeader = document.querySelector('.site-header');
  const heroSection = document.getElementById('hero');

  if (siteHeader) {
    let isFixed = false;
    let leaveTimeout = null;

    const handleHeaderScroll = () => {
      // Threshold: calculate dynamically based on hero height or 320px
      const threshold = heroSection ? Math.min(360, heroSection.offsetHeight * 0.48) : 320;
      const shouldFix = window.scrollY > threshold;

      if (shouldFix && !isFixed) {
        isFixed = true;
        clearTimeout(leaveTimeout);
        siteHeader.classList.remove('is-leaving');
        siteHeader.classList.add('is-fixed-nav');
      } else if (!shouldFix && isFixed) {
        isFixed = false;
        clearTimeout(leaveTimeout);
        siteHeader.classList.add('is-leaving');
        leaveTimeout = setTimeout(() => {
          if (!isFixed) {
            siteHeader.classList.remove('is-fixed-nav', 'is-leaving');
          }
        }, 340);
      }
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  }

  // Smooth scroll for all internal anchor links
  document.querySelectorAll('a[href^="#"]:not([href="#"]):not([href="#!"])').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        closeMobileMenu();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // Legal Documents Modal & 152-ФЗ Compliance
  // =========================================================================
  const legalModal = document.getElementById('legalModal');
  const legalModalCloseBtn = document.getElementById('legalModalCloseBtn');
  const legalModalCloseAction = document.getElementById('legalModalCloseAction');
  const legalTriggers = document.querySelectorAll('.js-open-legal');
  const legalTabBtns = document.querySelectorAll('.legal-tab-btn');
  const legalPanes = document.querySelectorAll('.legal-doc-pane');

  const switchLegalTab = (tabName) => {
    legalTabBtns.forEach((btn) => {
      const isActive = btn.getAttribute('data-tab') === tabName;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    legalPanes.forEach((pane) => {
      const expectedId = `doc${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`;
      const isTarget = pane.id === expectedId;
      pane.style.display = isTarget ? 'block' : 'none';
      pane.classList.toggle('is-active', isTarget);
    });
  };

  const openLegalModal = (docId = 'privacy') => {
    if (!legalModal) return;
    lastFocusedElement = document.activeElement;
    switchLegalTab(docId);
    legalModal.classList.add('is-active');
    legalModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    legalModalCloseBtn?.focus();
  };

  const closeLegalModal = () => {
    if (!legalModal || !legalModal.classList.contains('is-active')) return;
    legalModal.classList.remove('is-active');
    legalModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  legalTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const doc = btn.getAttribute('data-doc') || 'privacy';
      openLegalModal(doc);
    });
  });

  legalTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (tab) switchLegalTab(tab);
    });
  });

  legalModalCloseBtn?.addEventListener('click', closeLegalModal);
  legalModalCloseAction?.addEventListener('click', closeLegalModal);

  legalModal?.addEventListener('click', (e) => {
    if (e.target === legalModal) {
      closeLegalModal();
    }
  });

  // =========================================================================
  // Floating Cookie Consent Banner (Bottom-Right • 152-ФЗ)
  // =========================================================================
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
  const cookieCloseBtn = document.getElementById('cookieCloseBtn');

  if (cookieBanner) {
    const hasConsented = localStorage.getItem('cult_cookie_consent');
    if (!hasConsented) {
      setTimeout(() => {
        cookieBanner.style.display = 'flex';
        requestAnimationFrame(() => {
          cookieBanner.classList.add('is-visible');
        });
      }, 750);
    }

    const dismissCookie = () => {
      localStorage.setItem('cult_cookie_consent', 'accepted');
      cookieBanner.classList.remove('is-visible');
      setTimeout(() => {
        cookieBanner.style.display = 'none';
      }, 400);
    };

    cookieAcceptBtn?.addEventListener('click', dismissCookie);
    cookieCloseBtn?.addEventListener('click', dismissCookie);
  }

  // =========================================================================
  // Continuous Circular Arc Portfolio Carousel (16 cards, single stream, unclipped)
  // =========================================================================
  const portfolioViewport = document.getElementById('portfolioViewport');
  const portfolioCards = Array.from(document.querySelectorAll('.portfolio-card'));
  const prevBtns = document.querySelectorAll('.js-arc-prev');
  const nextBtns = document.querySelectorAll('.js-arc-next');
  const portfolioDotsContainer = document.getElementById('portfolioDots');
  const portfolioCounterCurr = document.getElementById('portfolioCounterCurr');

  if (portfolioViewport && portfolioCards.length > 0) {
    const totalCards = portfolioCards.length;
    let currentProgress = 0;
    let targetProgress = 0;
    let isDragging = false;
    let startX = 0;
    let startProgress = 0;
    let lastDragTime = 0;
    let lastDragX = 0;
    let dragVelocity = 0;
    let totalDragDistance = 0;
    let animId = null;
    let isWheeling = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Build pagination dots
    if (portfolioDotsContainer) {
      portfolioDotsContainer.innerHTML = '';
      portfolioCards.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `portfolio-dot ${idx === 0 ? 'is-active' : ''}`;
        dot.setAttribute('aria-label', `Перейти к работе ${idx + 1}`);
        dot.addEventListener('click', () => {
          let diff = (idx - currentProgress) % totalCards;
          if (diff > totalCards / 2) diff -= totalCards;
          if (diff < -totalCards / 2) diff += totalCards;
          animateTo(currentProgress + diff);
        });
        portfolioDotsContainer.appendChild(dot);
      });
    }

    const updateIndicators = () => {
      const activeIdx = ((Math.round(currentProgress) % totalCards) + totalCards) % totalCards;
      
      // Update counter
      if (portfolioCounterCurr) {
        portfolioCounterCurr.textContent = String(activeIdx + 1).padStart(2, '0');
      }

      // Update dots
      const dots = portfolioDotsContainer?.querySelectorAll('.portfolio-dot');
      dots?.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === activeIdx);
      });
    };

    // Calculate step & arc geometry based on viewport width
    const getGeometry = () => {
      const vw = portfolioViewport.offsetWidth || window.innerWidth;
      const card = portfolioCards[0];
      const cardW = card.offsetWidth || 280;
      // Step: horizontal distance between adjacent card centers
      const step = Math.min(270, Math.max(175, cardW * 0.82));
      // Subtle arc dip - capped so card bottom never exceeds viewport boundary
      const arcDip = Math.min(24, Math.max(12, vw * 0.015));
      return { vw, step, arcDip };
    };

    // Render cards positions around circular arc
    const renderArc = () => {
      const { step, arcDip } = getGeometry();

      portfolioCards.forEach((card, i) => {
        // Shortest circular difference from currentProgress to card index i
        let diff = (i - currentProgress) % totalCards;
        if (diff > totalCards / 2) diff -= totalCards;
        if (diff < -totalCards / 2) diff += totalCards;

        const absDiff = Math.abs(diff);

        if (reducedMotion) {
          const x = diff * step;
          card.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0, 0)`;
          card.style.opacity = '1';
          card.classList.toggle('is-active', absDiff < 0.5);
          return;
        }

        // Only render the visible arc field (up to ~3.5 cards to left and right)
        if (absDiff > 3.4) {
          card.style.opacity = '0';
          card.style.visibility = 'hidden';
          card.style.pointerEvents = 'none';
          return;
        }

        // Gentle, elegant arc curve - no excessive vertical dip
        const x = diff * step;
        const yDip = Math.min(28, arcDip * Math.pow(absDiff, 1.25));
        const rotZ = Math.max(-9, Math.min(9, diff * 4.2));
        const scale = Math.max(0.72, 1 - 0.085 * absDiff);
        const zIndex = Math.max(1, Math.round(20 - absDiff * 3));

        card.style.visibility = 'visible';
        card.style.pointerEvents = 'auto';
        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${yDip}px, 0) rotateZ(${rotZ}deg) scale(${scale})`;
        card.style.opacity = '1';
        card.style.zIndex = zIndex;
        card.classList.toggle('is-active', absDiff < 0.45);
      });

      updateIndicators();
    };

    // Smooth animation loop to targetProgress
    const animateTo = (target, duration = 450) => {
      if (animId) cancelAnimationFrame(animId);
      targetProgress = target;
      const fromProgress = currentProgress;
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        // Refined ease-out cubic curve
        const ease = 1 - Math.pow(1 - t, 3);
        currentProgress = fromProgress + (targetProgress - fromProgress) * ease;
        renderArc();

        if (t < 1) {
          animId = requestAnimationFrame(tick);
        } else {
          currentProgress = targetProgress;
          renderArc();
          animId = null;
        }
      };
      animId = requestAnimationFrame(tick);
    };

    // Navigation Buttons (both header arrows and floating side chevrons)
    prevBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        animateTo(Math.round(currentProgress) - 1);
      });
    });

    nextBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        animateTo(Math.round(currentProgress) + 1);
      });
    });

    // Click on any card: smoothly center it (ignore if dragged)
    portfolioCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (isDragging || totalDragDistance > 8) return;
        const normalizedCurr = ((currentProgress % totalCards) + totalCards) % totalCards;
        let diff = (idx - normalizedCurr);
        if (diff > totalCards / 2) diff -= totalCards;
        if (diff < -totalCards / 2) diff += totalCards;
        if (Math.abs(diff) > 0.1) {
          animateTo(currentProgress + diff);
        }
      });
    });

    // Touch & Mouse Drag / Swipe
    const onPointerDown = (e) => {
      if (e.target.closest('.portfolio-side-btn')) return;
      if (animId) cancelAnimationFrame(animId);
      isDragging = true;
      totalDragDistance = 0;
      startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      startProgress = currentProgress;
      lastDragX = startX;
      lastDragTime = performance.now();
      dragVelocity = 0;
      portfolioViewport.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const { step } = getGeometry();
      const deltaX = x - startX;
      totalDragDistance = Math.abs(deltaX);
      currentProgress = startProgress - deltaX / step;

      const now = performance.now();
      const dt = now - lastDragTime;
      if (dt > 10) {
        dragVelocity = (lastDragX - x) / dt;
        lastDragX = x;
        lastDragTime = now;
      }

      renderArc();
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;

      // Inertia snap based on release velocity
      let snapTarget = Math.round(currentProgress);
      if (Math.abs(dragVelocity) > 0.35) {
        snapTarget = Math.round(currentProgress + Math.sign(dragVelocity) * 0.7);
      }
      animateTo(snapTarget);
      setTimeout(() => {
        totalDragDistance = 0;
      }, 80);
    };

    portfolioViewport.addEventListener('pointerdown', onPointerDown);
    portfolioViewport.addEventListener('pointermove', onPointerMove);
    portfolioViewport.addEventListener('pointerup', onPointerUp);
    portfolioViewport.addEventListener('pointercancel', onPointerUp);

    // Trackpad / Two-Finger Horizontal Wheel Scroll
    portfolioViewport.addEventListener(
      'wheel',
      (e) => {
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (Math.abs(delta) > 15) {
          e.preventDefault();
          if (!isWheeling) {
            isWheeling = true;
            const dir = delta > 0 ? 1 : -1;
            animateTo(Math.round(currentProgress) + dir);
            setTimeout(() => {
              isWheeling = false;
            }, 300);
          }
        }
      },
      { passive: false }
    );

    // Keyboard navigation when focused
    portfolioViewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        animateTo(Math.round(currentProgress) - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        animateTo(Math.round(currentProgress) + 1);
      }
    });

    // Resize handling
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        renderArc();
      }, 80);
    });

    // Initial positioning: run immediately, next frame, and on full window load
    renderArc();
    requestAnimationFrame(renderArc);
    setTimeout(renderArc, 50);
    window.addEventListener('load', renderArc);
  }

  // =========================================================================
  // Service Accordion Toggles
  // =========================================================================
  serviceToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const item = toggle.closest('.service-item');
      if (!item) return;
      const isOpen = item.classList.contains('is-open');

      if (isOpen) {
        item.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Global Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeLegalModal();
      closeMobileMenu();
    }
  });
});
