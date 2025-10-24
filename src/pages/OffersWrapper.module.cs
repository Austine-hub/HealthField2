/* ============================================================================
   OffersWrapper.module.css — 2025 Modern Responsive Layout
   Fluid Grid • Mobile-First • Minimal & Accessible
   ============================================================================ */

:root {
  --color-primary: #0077b6;
  --color-accent: #00a8e1;
  --color-bg-light: #f8fafc;
  --color-bg-white: #ffffff;
  --color-bg-gradient: linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%);
  --color-text-dark: #1e293b;
  --color-text-muted: #64748b;
}

/* ===============================
   Section Wrapper
=============================== */
.wrapper {
  width: 100%;
  padding: clamp(2rem, 4vw, 4rem) 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  transition: background 0.3s ease;
}

.wrapper.light {
  background: var(--color-bg-light);
}

.wrapper.white {
  background: var(--color-bg-white);
}

.wrapper.gradient {
  background: var(--color-bg-gradient);
}

/* ===============================
   Header Section
=============================== */
.header {
  text-align: center;
  max-width: 800px;
}

.title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--color-text-dark);
  margin-bottom: 0.25rem;
}

.subtitle {
  font-size: clamp(0.9rem, 2vw, 1rem);
  color: var(--color-text-muted);
  margin: 0 auto;
  max-width: 500px;
}

/* ===============================
   Content Area (Children Wrapper)
=============================== */
.content {
  display: grid;
  width: 100%;
  max-width: 1400px;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: clamp(1rem, 2vw, 2rem);
  align-items: stretch;
  justify-items: center;
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .content {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.25rem;
  }
}

@media (max-width: 480px) {
  .wrapper {
    padding: 1.5rem 1rem;
  }

  .title {
    font-size: 1.25rem;
  }
}
