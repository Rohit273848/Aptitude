/* ==========================================================================
   Main Application Logic
   KaTeX rendering, Theme Toggle, ScrollSpy, Search, Collapsibles & Progress
   ========================================================================== */

(function () {
    'use strict';

    // --- KaTeX Auto-Render Initializer ---
    function initMath() {
        if (window.renderMathInElement) {
            window.renderMathInElement(document.body, {
                delimiters: [
                    { left: "$$", right: "$$", display: true },
                    { left: "$", right: "$", display: false },
                    { left: "\\[", right: "\\]", display: true },
                    { left: "\\(", right: "\\)", display: false }
                ],
                ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
                throwOnError: false
            });
        }
    }

    // --- Theme Management ---
    function initTheme() {
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('study_theme');

        const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeButton(currentTheme);

        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                const activeTheme = document.documentElement.getAttribute('data-theme');
                const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', nextTheme);
                localStorage.setItem('study_theme', nextTheme);
                updateThemeButton(nextTheme);
            });
        }

        function updateThemeButton(theme) {
            if (!themeToggleBtn) return;
            if (theme === 'dark') {
                themeToggleBtn.innerHTML = '<span>☀️</span><span class="btn-text">Light</span>';
                themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
            } else {
                themeToggleBtn.innerHTML = '<span>🌙</span><span class="btn-text">Dark</span>';
                themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
            }
        }
    }

    // --- Study Progress Management ---
    function initProgressTracker() {
        const STORAGE_KEY = 'tsd_completed_sections';
        const totalSections = 12; // 12 primary numbered sections

        function getCompleted() {
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            } catch (e) {
                return [];
            }
        }

        function saveCompleted(list) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
            updateProgressUI(list);
        }

        function updateProgressUI(completedList) {
            const count = completedList.length;
            const pct = Math.min(100, Math.round((count / totalSections) * 100));

            // Global progress bar & sidebar meters
            const globalFill = document.getElementById('global-progress-fill');
            const sidebarFill = document.getElementById('sidebar-progress-fill');
            const progressText = document.getElementById('progress-count-text');
            const progressPercent = document.getElementById('progress-percent-text');

            if (globalFill) globalFill.style.width = `${pct}%`;
            if (sidebarFill) sidebarFill.style.width = `${pct}%`;
            if (progressText) progressText.textContent = `${count} of ${totalSections} Completed`;
            if (progressPercent) progressPercent.textContent = `${pct}%`;

            // Update checkboxes in main content and TOC
            document.querySelectorAll('.section-complete-checkbox').forEach(chk => {
                const secId = chk.getAttribute('data-section-id');
                const isDone = completedList.includes(secId);
                chk.checked = isDone;

                // Visual indicator on section wrapper
                const sectionElem = document.getElementById(secId);
                if (sectionElem) {
                    if (isDone) sectionElem.classList.add('is-completed');
                    else sectionElem.classList.remove('is-completed');
                }
            });

            document.querySelectorAll('.toc-checkbox').forEach(chk => {
                const secId = chk.getAttribute('data-section-id');
                chk.checked = completedList.includes(secId);
            });
        }

        // Bind change listeners to both section checkboxes and TOC checkboxes
        document.querySelectorAll('.section-complete-checkbox, .toc-checkbox').forEach(chk => {
            chk.addEventListener('change', function () {
                const secId = this.getAttribute('data-section-id');
                let completed = getCompleted();
                if (this.checked) {
                    if (!completed.includes(secId)) completed.push(secId);
                } else {
                    completed = completed.filter(id => id !== secId);
                }
                saveCompleted(completed);
            });
        });

        // Reset progress button
        const resetBtn = document.getElementById('reset-progress-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to reset your study completion progress?')) {
                    saveCompleted([]);
                }
            });
        }

        // Initial render
        updateProgressUI(getCompleted());
    }

    // --- Collapsible Solutions & Panels ---
    function initCollapsibles() {
        // Individual Worked Example Solution Toggles
        document.querySelectorAll('.solution-toggle-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const targetId = this.getAttribute('aria-controls');
                const drawer = document.getElementById(targetId);
                if (!drawer) return;

                const isCurrentlyExpanded = this.getAttribute('aria-expanded') === 'true';
                const nextState = !isCurrentlyExpanded;

                this.setAttribute('aria-expanded', String(nextState));
                if (nextState) {
                    drawer.classList.add('is-open');
                    this.innerHTML = 'Hide Solution <span class="toggle-icon">▲</span>';
                } else {
                    drawer.classList.remove('is-open');
                    this.innerHTML = 'Show Solution <span class="toggle-icon">▼</span>';
                }
            });
        });

        // Global Expand All / Collapse All Controls
        const expandAllBtn = document.getElementById('expand-all-solutions-btn');
        const collapseAllBtn = document.getElementById('collapse-all-solutions-btn');

        if (expandAllBtn) {
            expandAllBtn.addEventListener('click', () => {
                document.querySelectorAll('.solution-toggle-btn').forEach(btn => {
                    const targetId = btn.getAttribute('aria-controls');
                    const drawer = document.getElementById(targetId);
                    if (drawer) {
                        btn.setAttribute('aria-expanded', 'true');
                        drawer.classList.add('is-open');
                        btn.innerHTML = 'Hide Solution <span class="toggle-icon">▲</span>';
                    }
                });
            });
        }

        if (collapseAllBtn) {
            collapseAllBtn.addEventListener('click', () => {
                document.querySelectorAll('.solution-toggle-btn').forEach(btn => {
                    const targetId = btn.getAttribute('aria-controls');
                    const drawer = document.getElementById(targetId);
                    if (drawer) {
                        btn.setAttribute('aria-expanded', 'false');
                        drawer.classList.remove('is-open');
                        btn.innerHTML = 'Show Solution <span class="toggle-icon">▼</span>';
                    }
                });
            });
        }

        // Interactive Practice Questions: Hints & Solutions
        document.querySelectorAll('.btn-hint').forEach(btn => {
            btn.addEventListener('click', function () {
                const hintBox = this.parentElement.parentElement.querySelector('.practice-hint-box');
                if (hintBox) {
                    hintBox.classList.toggle('is-visible');
                    const isShown = hintBox.classList.contains('is-visible');
                    this.textContent = isShown ? 'Hide Hint 💡' : 'Show Hint 💡';
                }
            });
        });

        document.querySelectorAll('.btn-reveal').forEach(btn => {
            btn.addEventListener('click', function () {
                const expBox = this.parentElement.parentElement.querySelector('.practice-explanation-box');
                if (expBox) {
                    expBox.classList.toggle('is-visible');
                    const isShown = expBox.classList.contains('is-visible');
                    this.textContent = isShown ? 'Hide Solution 👁️' : 'Reveal Solution 👁️';
                    if (isShown && window.renderMathInElement) {
                        window.renderMathInElement(expBox, {
                            delimiters: [
                                { left: "$$", right: "$$", display: true },
                                { left: "$", right: "$", display: false }
                            ]
                        });
                    }
                }
            });
        });
    }

    // --- ScrollSpy for Table of Contents ---
    function initScrollSpy() {
        const sections = document.querySelectorAll('.study-section, #formula-sheet, #quiz-section');
        const tocItems = document.querySelectorAll('.toc-item');

        function updateActive() {
            let currentSectionId = '';
            const scrollPos = window.scrollY + 140;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            if (!currentSectionId && sections.length > 0 && window.scrollY < sections[0].offsetTop) {
                currentSectionId = sections[0].getAttribute('id');
            }

            tocItems.forEach(item => {
                const link = item.querySelector('.toc-link');
                if (link && link.getAttribute('href') === `#${currentSectionId}`) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        window.addEventListener('scroll', updateActive, { passive: true });
        updateActive();
    }

    // --- Live Search across Notes ---
    function initSearch() {
        const searchInput = document.getElementById('notes-search-input');
        const clearBtn = document.getElementById('search-clear-btn');
        if (!searchInput) return;

        // Keyboard shortcut '/' or 'Ctrl+K'
        document.addEventListener('keydown', e => {
            if ((e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) &&
                document.activeElement !== searchInput &&
                !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                e.preventDefault();
                searchInput.focus();
                searchInput.select();
            } else if (e.key === 'Escape' && document.activeElement === searchInput) {
                searchInput.value = '';
                searchInput.blur();
                performSearch('');
            }
        });

        searchInput.addEventListener('input', function () {
            const q = this.value.trim();
            performSearch(q);
            if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';
        });

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                clearBtn.style.display = 'none';
                performSearch('');
                searchInput.focus();
            });
        }

        function performSearch(query) {
            const queryLower = query.toLowerCase();
            const sections = document.querySelectorAll('.study-section');

            if (!queryLower) {
                sections.forEach(sec => (sec.style.display = ''));
                return;
            }

            sections.forEach(sec => {
                const text = sec.textContent.toLowerCase();
                if (text.includes(queryLower)) {
                    sec.style.display = '';
                } else {
                    sec.style.display = 'none';
                }
            });
        }
    }

    // --- Copy Formula Utility ---
    function initCopyFormula() {
        document.querySelectorAll('.formula-copy-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const code = this.getAttribute('data-formula') || '';
                if (!code) return;

                navigator.clipboard.writeText(code).then(() => {
                    const original = this.innerHTML;
                    this.innerHTML = '✓ Copied';
                    this.style.color = 'var(--success)';
                    setTimeout(() => {
                        this.innerHTML = original;
                        this.style.color = '';
                    }, 2000);
                }).catch(() => {
                    alert('Copied formula: ' + code);
                });
            });
        });
    }

    // --- Floating Controls & Mobile Menu ---
    function initFloatingAndMobile() {
        const backToTopBtn = document.getElementById('back-to-top-btn');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const sidebar = document.getElementById('site-sidebar');

        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('is-visible');
                } else {
                    backToTopBtn.classList.remove('is-visible');
                }
            }, { passive: true });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        if (mobileMenuToggle && sidebar) {
            mobileMenuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('is-open');
                const isOpen = sidebar.classList.contains('is-open');
                mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
            });

            // Close sidebar when clicking a TOC link on mobile
            sidebar.querySelectorAll('.toc-link').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 1024) {
                        sidebar.classList.remove('is-open');
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        }
    }

    // --- Category Filter in Formula Sheet ---
    function initFormulaFilter() {
        const filterBtns = document.querySelectorAll('.formula-filter-btn');
        const formulaCards = document.querySelectorAll('.formula-card-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const cat = this.getAttribute('data-category');
                formulaCards.forEach(card => {
                    if (cat === 'all' || card.getAttribute('data-category') === cat) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Bootstrapping
    function initAll() {
        initMath();
        initTheme();
        initProgressTracker();
        initCollapsibles();
        initScrollSpy();
        initSearch();
        initCopyFormula();
        initFloatingAndMobile();
        initFormulaFilter();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }

    // Re-run math render when fonts/window loads
    window.addEventListener('load', initMath);
})();
