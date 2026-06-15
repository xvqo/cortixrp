'use client'

import { useEffect, useRef } from 'react'

/**
 * Scroll reveal that ENHANCES already-visible content:
 * it only hides elements after confirming motion is allowed and JS is running,
 * then reveals them as they enter the viewport (optionally staggered).
 * Default (no JS / reduced motion) leaves content fully visible.
 *
 * Usage: const ref = useReveal('.reveal'); <section ref={ref}> ... </section>
 */
export function useReveal(selector = '.reveal', { stagger = 70, threshold = 0.12 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = Array.from(root.querySelectorAll(selector))
    if (!items.length) return

    items.forEach((el) => el.classList.add('is-hidden'))

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          const i = items.indexOf(el)
          window.setTimeout(() => el.classList.remove('is-hidden'), Math.max(0, i) * stagger)
          io.unobserve(el)
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [selector, stagger, threshold])

  return ref
}
