/**
 * PORTFÓLIO AUTORAL — PIETRO
 * Comportamentos e Interações em JavaScript Puro
 * Inspirações aplicadas:
 * - Mocean: Tela de carregamento e experiência suave de entrada.
 * - Illoca: Reações fluídas de elementos ao movimento do mouse e navegação.
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     1. Experiência de Entrada / Tela de Carregamento (Inspiração Mocean)
     -------------------------------------------------------------------------- */
  const loaderScreen = document.getElementById('loaderScreen');
  const loaderBar = document.getElementById('loaderBar');

  if (loaderScreen && loaderBar && !prefersReducedMotion) {
    // Anima a barra de progresso suavemente
    requestAnimationFrame(() => {
      loaderBar.style.width = '100%';
    });

    // Remove a tela de carregamento após a transição
    const dismissLoader = () => {
      loaderScreen.classList.add('is-loaded');
      setTimeout(() => {
        loaderScreen.style.display = 'none';
      }, 700);
    };

    window.addEventListener('load', () => {
      setTimeout(dismissLoader, 450);
    });

    // Timeout de segurança caso o evento 'load' demore
    setTimeout(dismissLoader, 1200);
  } else if (loaderScreen) {
    loaderScreen.style.display = 'none';
  }

  /* --------------------------------------------------------------------------
     2. Reações dos Elementos ao Movimento do Cursor (Inspiração Illoca)
     -------------------------------------------------------------------------- */
  const heroSection = document.getElementById('hero');
  const heroName = document.querySelector('.hero-name');
  const ambientOrb1 = document.querySelector('.orb-1');
  const ambientOrb2 = document.querySelector('.orb-2');

  if (heroSection && !prefersReducedMotion && window.innerWidth > 768) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      // Normaliza valores entre -1 e 1
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
    });

    const animateReactivity = () => {
      // Interpolação suave (lerp) para sensação orgânica e fluida
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      if (heroName) {
        heroName.style.transform = `translate3d(${currentX * 12}px, ${currentY * 8}px, 0)`;
      }

      if (ambientOrb1) {
        ambientOrb1.style.transform = `translate3d(${currentX * -25}px, ${currentY * -25}px, 0)`;
      }

      if (ambientOrb2) {
        ambientOrb2.style.transform = `translate3d(${currentX * 30}px, ${currentY * 30}px, 0)`;
      }

      requestAnimationFrame(animateReactivity);
    };

    requestAnimationFrame(animateReactivity);
  }

  /* --------------------------------------------------------------------------
     3. Menu Mobile Dropdown
     -------------------------------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuToggle && mobileMenu) {
    const toggleMenu = () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      menuToggle.classList.toggle('is-active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Fecha ao clicar em um link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('is-open')) {
          toggleMenu();
        }
      });
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('is-open') &&
        !mobileMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        toggleMenu();
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Efeito de Scroll no Header
     -------------------------------------------------------------------------- */
  const siteHeader = document.getElementById('siteHeader');

  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        siteHeader.style.boxShadow = '0 6px 20px rgba(18, 24, 26, 0.08)';
      } else {
        siteHeader.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     5. Navegação Suave e Feedback Elegante para Próximas Etapas
     -------------------------------------------------------------------------- */
  const allNavLinks = document.querySelectorAll('a[href^="#"]');

  allNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      if (targetId === '#hero') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (!targetElement) {
        e.preventDefault();
        showFeedbackNotification(
          `A seção "${link.textContent.trim()}" será desenvolvida na próxima etapa.`
        );
      }
    });
  });

  /* --------------------------------------------------------------------------
     6. Notificação Minimalista (Feedback não invasivo)
     -------------------------------------------------------------------------- */
  function showFeedbackNotification(message) {
    const existingNotice = document.querySelector('.feedback-notice');
    if (existingNotice) {
      existingNotice.remove();
    }

    const notice = document.createElement('div');
    notice.className = 'feedback-notice';
    notice.textContent = message;

    // Estilos inline sólidos para o aviso temporário
    Object.assign(notice.style, {
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      backgroundColor: '#CFD2D4', // Cor sólida principal
      color: '#12181a',
      fontFamily: "'Figtree', sans-serif",
      fontSize: '0.88rem',
      fontWeight: '600',
      padding: '0.75rem 1.4rem',
      borderRadius: '999px',
      border: '1px solid rgba(18, 24, 26, 0.15)',
      boxShadow: '0 8px 24px rgba(18, 24, 26, 0.12)',
      zIndex: '10000',
      opacity: '0',
      transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      pointerEvents: 'none',
      whiteSpace: 'nowrap'
    });

    document.body.appendChild(notice);

    requestAnimationFrame(() => {
      notice.style.opacity = '1';
      notice.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      notice.style.opacity = '0';
      notice.style.transform = 'translateX(-50%) translateY(10px)';
      setTimeout(() => notice.remove(), 350);
    }, 2800);
  }
});

