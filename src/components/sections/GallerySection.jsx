'use client'

import { useState, useRef, useEffect } from 'react'
import { galleryImages } from '@/data/galleryImages'

function ImageIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  )
}

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const dialogRef = useRef(null)
  const gridRef = useRef(null)

  const openLightbox = (index) => {
    setLightboxIndex(index)
    dialogRef.current?.showModal()
  }

  const closeLightbox = () => {
    dialogRef.current?.close()
    setLightboxIndex(null)
  }

  // Sync lightboxIndex=null when dialog closes via Escape
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onClose = () => setLightboxIndex(null)
    dialog.addEventListener('close', onClose)
    return () => dialog.removeEventListener('close', onClose)
  }, [])

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') {
        setLightboxIndex(i => (i + 1) % galleryImages.length)
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex(i => (i - 1 + galleryImages.length) % galleryImages.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex])

  // Scroll-reveal for grid items
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const items = gridRef.current?.querySelectorAll('[data-gallery-item]')
    if (!items) return

    items.forEach(el => el.classList.add('is-hidden'))

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.galleryItem)
            setTimeout(() => entry.target.classList.remove('is-hidden'), idx * 55)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )

    items.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const onDialogClick = (e) => {
    if (e.target === dialogRef.current) closeLightbox()
  }

  const current = lightboxIndex !== null ? galleryImages[lightboxIndex] : null

  return (
    <section className="py-32 max-lg:py-24 max-[480px]:py-16" aria-label="Galeria serwera">
      <div className="mx-auto max-w-page px-8 min-[1921px]:max-w-wide max-[480px]:px-5">
        <div className="mb-12 max-w-[60ch]">
          <h2 className="font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.02em] text-ink [font-stretch:112%]">
            Zobacz serwer od środka
          </h2>
          <p className="mt-3 text-lg leading-[1.6] text-ink-muted">Zdjęcia z codziennej gry: akcje, spotkania i zwykłe dni w Los Santos.</p>
        </div>

        <div className="gallery-grid" ref={gridRef}>
          {galleryImages.map((img, i) => (
            <button
              key={i}
              className="gallery-item"
              data-variant={img.variant}
              data-gallery-item={i}
              onClick={() => openLightbox(i)}
              aria-label={`Otwórz: ${img.alt}`}
            >
              {img.src ? (
                <img src={img.src} alt={img.alt} loading="lazy" />
              ) : (
                <div className="gallery-placeholder" aria-hidden="true">
                  <ImageIcon />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        onClick={onDialogClick}
        aria-label={current ? `Zdjęcie: ${current.alt}` : 'Podgląd zdjęcia'}
      >
        {current && (
          <>
            <div className="lightbox-content">
              <img key={lightboxIndex} src={current.src} alt={current.alt} className="lightbox-img" />
            </div>

            <button className="lightbox-close" onClick={closeLightbox} aria-label="Zamknij podgląd">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <button
              className="lightbox-nav lightbox-prev"
              onClick={() => setLightboxIndex(i => (i - 1 + galleryImages.length) % galleryImages.length)}
              aria-label="Poprzednie zdjęcie"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              className="lightbox-nav lightbox-next"
              onClick={() => setLightboxIndex(i => (i + 1) % galleryImages.length)}
              aria-label="Następne zdjęcie"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M7 3l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="lightbox-meta">
              <p className="lightbox-caption">{current.alt}</p>
              <p className="lightbox-counter" aria-live="polite">
                {lightboxIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </>
        )}
      </dialog>
    </section>
  )
}
