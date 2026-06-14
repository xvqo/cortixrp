import { useState, useRef, useEffect } from 'react'
import styles from './GallerySection.module.css'
import { galleryImages } from '../../data/galleryImages'

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

    items.forEach(el => el.classList.add(styles.itemHidden))

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.galleryItem)
            setTimeout(() => entry.target.classList.remove(styles.itemHidden), idx * 55)
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
    <section className={styles.section} aria-label="Galeria serwera">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Zajrzyj na serwer</h2>
          <p className={styles.sub}>Screenshoty z codziennej rozgrywki.</p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {galleryImages.map((img, i) => (
            <button
              key={i}
              className={styles.item}
              data-variant={img.variant}
              data-gallery-item={i}
              onClick={() => openLightbox(i)}
              aria-label={`Otwórz: ${img.alt}`}
            >
              {img.src ? (
                <img src={img.src} alt={img.alt} loading="lazy" />
              ) : (
                <div className={styles.placeholder} aria-hidden="true">
                  <ImageIcon />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        onClick={onDialogClick}
        aria-label={current ? `Zdjęcie: ${current.alt}` : 'Podgląd zdjęcia'}
      >
        {current && (
          <>
            <div className={styles.lightboxContent}>
              {current.src ? (
                <img
                  src={current.src}
                  alt={current.alt}
                  className={styles.lightboxImg}
                />
              ) : (
                <div className={styles.lightboxPlaceholder} aria-hidden="true">
                  <ImageIcon />
                </div>
              )}
            </div>

            <button
              className={styles.lightboxClose}
              onClick={closeLightbox}
              aria-label="Zamknij podgląd"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <button
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={() => setLightboxIndex(i => (i - 1 + galleryImages.length) % galleryImages.length)}
              aria-label="Poprzednie zdjęcie"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={() => setLightboxIndex(i => (i + 1) % galleryImages.length)}
              aria-label="Następne zdjęcie"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M7 3l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className={styles.lightboxMeta}>
              <p className={styles.lightboxCaption}>{current.alt}</p>
              <p className={styles.lightboxCounter} aria-live="polite">
                {lightboxIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </>
        )}
      </dialog>
    </section>
  )
}
