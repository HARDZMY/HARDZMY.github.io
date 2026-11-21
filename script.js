const EXPERIENCE_START_YEAR = 2022;
const TYPEWRITER_ROLES = [
    'Programmer',
    'System Engineer',
    'Full-Stack Developer',
    'RPA Developer',
    'System Analyst',
];

const THEME_STORAGE_KEY = 'color-theme';
let themeTransitionTimer = null;

function configureTailwindTheme() {
    if (!window.tailwind) return;
    window.tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: { brand: '#3b82f6' },
                fontFamily: {
                    sans: ['Roboto', 'Segoe UI', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
                    handwriting: ['Caveat', 'cursive'],
                },
                animation: {
                    'infinite-scroll': 'infinite-scroll 20s linear infinite',
                },
                keyframes: {
                    'infinite-scroll': {
                        from: { transform: 'translateX(0)' },
                        to: { transform: 'translateX(-50%)' },
                    },
                },
            },
        },
    };
}

function getSystemPrefersDark() {
    return Boolean(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

function getSavedTheme() {
    try {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : null;
    } catch (_error) {
        return null;
    }
}

function applyPageTheme(isDark) {
    const rootEl = document.documentElement;
    rootEl.classList.toggle('dark', isDark);
    rootEl.style.colorScheme = isDark ? 'dark' : 'light';
}

function resolveInitialTheme() {
    const savedTheme = getSavedTheme();
    if (savedTheme === 'dark') return true;
    if (savedTheme === 'light') return false;
    return getSystemPrefersDark();
}

function toggleDarkMode() {
    const rootEl = document.documentElement;
    rootEl.classList.add('theme-transitioning');

    const nextIsDark = !rootEl.classList.contains('dark');
    applyPageTheme(nextIsDark);

    try {
        localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? 'dark' : 'light');
    } catch (_error) {}

    window.clearTimeout(themeTransitionTimer);
    themeTransitionTimer = window.setTimeout(() => {
        rootEl.classList.remove('theme-transitioning');
    }, 500);
}

function initSystemThemeWatcher() {
    if (!window.matchMedia) return;
    const darkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (event) => {
        if (getSavedTheme() === null) {
            applyPageTheme(event.matches);
        }
    };

    if (darkSchemeQuery.addEventListener) {
        darkSchemeQuery.addEventListener('change', handleSystemThemeChange);
    } else if (darkSchemeQuery.addListener) {
        darkSchemeQuery.addListener(handleSystemThemeChange);
    }
}

configureTailwindTheme();
applyPageTheme(resolveInitialTheme());
initSystemThemeWatcher();

document.addEventListener('DOMContentLoaded', () => {
    configureTailwindTheme();
    initContentProtection();
    initImageLoaders();
    initTypewriterEffect();
    initExperienceAndFooter();
    initGalleriaLoop();
    initAnchorScroll();
    initActiveNav();
    initSkillGridCentering();
    initScrollReveal();
    initModal();
    initSkillsDrawer();
    initGoToTop();
});

function initContentProtection() {
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

    document.addEventListener('selectstart', (event) => {
        event.preventDefault();
    });

    document.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });

    ['copy', 'cut'].forEach((eventName) => {
        document.addEventListener(eventName, (event) => {
            event.preventDefault();
        });
    });
}

function bindSingleImageLoader(img) {
    if (!img || img.tagName !== 'IMG') return;

    let wrapper = img.parentElement && img.parentElement.classList.contains('img-load-wrap')
        ? img.parentElement
        : null;

    if (!wrapper) {
        const parent = img.parentElement;
        if (!parent) return;

        wrapper = document.createElement('span');
        wrapper.className = 'img-load-wrap';

        const computedDisplay = window.getComputedStyle(img).display;
        const isInline = computedDisplay === 'inline' || computedDisplay === 'inline-block' || computedDisplay === 'inline-flex';
        wrapper.classList.add(isInline ? 'img-load-inline' : 'img-load-block');

        parent.insertBefore(wrapper, img);
        wrapper.appendChild(img);
    }

    const markLoaded = () => {
        wrapper.classList.remove('img-is-loading');
        img.style.opacity = '';
        img.style.color = '';
    };

    const markLoading = () => {
        wrapper.classList.add('img-is-loading');
        img.style.color = 'transparent';
    };

    if (img.complete && img.naturalWidth > 0) {
        markLoaded();
        return;
    }

    markLoading();

    const onLoad = () => {
        img.removeEventListener('load', onLoad);
        img.removeEventListener('error', onError);
        markLoaded();
    };

    const onError = () => {
        img.removeEventListener('load', onLoad);
        img.removeEventListener('error', onError);
        markLoaded();
    };

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
}

function initImageLoaders(root = document) {
    const images = Array.from(root.querySelectorAll('img'));
    if (!images.length) return;
    images.forEach((img) => bindSingleImageLoader(img));
}

function initTypewriterEffect() {
    const targetEl = document.getElementById('typewriter');
    if (!targetEl || !TYPEWRITER_ROLES.length) return;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function stepTypewriter() {
        const activeRole = TYPEWRITER_ROLES[roleIndex];

        if (isDeleting) {
            charIndex = Math.max(0, charIndex - 1);
            targetEl.textContent = activeRole.substring(0, charIndex);

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % TYPEWRITER_ROLES.length;
            }
        } else {
            charIndex = Math.min(activeRole.length, charIndex + 1);
            targetEl.textContent = activeRole.substring(0, charIndex);

            if (charIndex === activeRole.length) {
                isDeleting = true;
                window.setTimeout(stepTypewriter, 2000);
                return;
            }
        }

        window.setTimeout(stepTypewriter, isDeleting ? 50 : 100);
    }

    stepTypewriter();
}

function initExperienceAndFooter() {
    const currentYear = new Date().getFullYear();

    const yearsEl = document.getElementById('years');
    if (yearsEl) {
        yearsEl.textContent = String(Math.max(0, currentYear - EXPERIENCE_START_YEAR));
    }

    const copyrightEl = document.getElementById('currentYear');
    if (copyrightEl) {
        const yearText = `${currentYear} | All Rights Reserved | HARDZMY `;
        const rocketBadge = '<img src="resources/rocket.gif" alt="Rocket" draggable="false" style="vertical-align: middle; width: 22px; height: 22px; display: inline-block;">';
        copyrightEl.innerHTML = yearText + rocketBadge;
        initImageLoaders(copyrightEl);
    }
}

function initGalleriaLoop() {
    const galleriaTrack = document.querySelector('.galleria-track');
    const primaryGroup = galleriaTrack ? galleriaTrack.querySelector('.galleria-group') : null;
    if (!galleriaTrack || !primaryGroup) return;

    const existingClones = galleriaTrack.querySelectorAll('.galleria-group[data-loop-clone="true"]');
    existingClones.forEach((clone) => clone.remove());

    const clonedGroup = primaryGroup.cloneNode(true);
    clonedGroup.setAttribute('aria-hidden', 'true');
    clonedGroup.setAttribute('data-loop-clone', 'true');
    galleriaTrack.appendChild(clonedGroup);

    initImageLoaders(clonedGroup);
}

function initAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                event.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initActiveNav() {
    const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
    const sections = Array.from(document.querySelectorAll('section[id], footer[id]'));
    if (!sections.length || !navLinks.length) return;

    function setActiveLink(sectionId) {
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
    }

    function updateActiveSection() {
        const scrollPos = window.scrollY + 140;
        const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;

        if (nearBottom) {
            setActiveLink(sections[sections.length - 1].id);
            return;
        }

        let activeSectionId = sections[0].id;
        for (const section of sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                activeSectionId = section.id;
                break;
            }
        }
        setActiveLink(activeSectionId);
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });
    updateActiveSection();
}

function initSkillGridCentering() {
    const grids = Array.from(document.querySelectorAll('.skill-grid'));
    if (!grids.length) return;

    const gridMeta = grids.map((grid) => ({
        grid,
        cards: Array.from(grid.querySelectorAll('.skill-card')),
    }));

    function balanceGrids() {
        const isMobile = window.innerWidth < 640;
        const maxCols = isMobile ? 2 : 4;

        gridMeta.forEach(({ grid, cards }) => {
            if (!cards.length) return;

            const existingOrphanRow = grid.querySelector('.skill-orphan-row');
            if (existingOrphanRow) {
                Array.from(existingOrphanRow.children).forEach((card) => {
                    card.style.width = '';
                    card.style.maxWidth = '';
                    card.style.flex = '';
                    grid.appendChild(card);
                });
                existingOrphanRow.remove();
            }

            cards.forEach((card) => {
                card.style.width = '';
                card.style.maxWidth = '';
                card.style.flex = '';
            });

            const activeCols = Math.max(1, Math.min(maxCols, cards.length));
            grid.style.gridTemplateColumns = `repeat(${activeCols}, minmax(0, 1fr))`;

            if (activeCols <= 1) return;

            const remainder = cards.length % activeCols;
            if (remainder === 0) return;

            const firstRowCards = cards.slice(0, activeCols);
            const sampleWidth = firstRowCards[0].getBoundingClientRect().width;
            const clampedWidth = Math.min(sampleWidth, grid.clientWidth);
            const orphanCards = cards.slice(cards.length - remainder);

            const orphanRow = document.createElement('div');
            orphanRow.className = 'skill-orphan-row col-span-full flex flex-wrap justify-center gap-4';

            orphanCards.forEach((card) => {
                card.style.width = `${clampedWidth}px`;
                card.style.maxWidth = '100%';
                orphanRow.appendChild(card);
            });

            grid.appendChild(orphanRow);
        });
    }

    window.addEventListener('resize', balanceGrids, { passive: true });
    balanceGrids();
}

function initScrollReveal() {
    const revealTargets = [
        ...document.querySelectorAll('section'),
        ...document.querySelectorAll('.image-item'),
        ...document.querySelectorAll('.standardv2'),
    ];
    if (!revealTargets.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('section-visible');
                entry.target.classList.remove('section-hidden');
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.1 }
    );

    revealTargets.forEach((el) => {
        el.classList.add('section-hidden');
        observer.observe(el);
    });
}

function initModal() {
    const modalElement = document.querySelector('.modal');
    const openBtn = document.querySelector('.open-modal-button');
    const closeBtn = document.querySelector('.close-modal-button');
    if (!modalElement || !openBtn || !closeBtn) return;

    let hideTimer = null;

    function showModal() {
        window.clearTimeout(hideTimer);
        modalElement.style.display = 'flex';
        window.requestAnimationFrame(() => modalElement.classList.add('modal-visible'));
    }

    function hideModal() {
        modalElement.classList.remove('modal-visible');
        hideTimer = window.setTimeout(() => {
            modalElement.style.display = 'none';
        }, 200);
    }

    openBtn.addEventListener('click', showModal);
    closeBtn.addEventListener('click', hideModal);
    modalElement.addEventListener('click', (event) => {
        if (event.target === modalElement) hideModal();
    });
}

function initSkillsDrawer() {
    const skillsElement = document.querySelector('.skills');
    const showBtn = document.querySelector('.show-skills-button');
    const hideBtn = document.querySelector('.hide-skills-button');
    if (!skillsElement || !showBtn || !hideBtn) return;

    let hideTimer = null;

    showBtn.addEventListener('click', () => {
        window.clearTimeout(hideTimer);
        skillsElement.style.display = 'flex';
        window.requestAnimationFrame(() => {
            skillsElement.classList.remove('skills-hidden');
            skillsElement.classList.add('skills-visible');
        });
    });

    hideBtn.addEventListener('click', () => {
        skillsElement.classList.remove('skills-visible');
        skillsElement.classList.add('skills-hidden');
        hideTimer = window.setTimeout(() => {
            skillsElement.style.display = 'none';
        }, 200);
    });
}

function initGoToTop() {
    const goToTopBtn = document.getElementById('goToTopBtn');
    if (!goToTopBtn) return;

    window.addEventListener(
        'scroll',
        () => {
            const scrolled = document.body.scrollTop > 100 || document.documentElement.scrollTop > 100;
            goToTopBtn.style.display = scrolled ? 'block' : 'none';
        },
        { passive: true }
    );

    goToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}