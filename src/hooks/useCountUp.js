import { useState, useEffect, useRef } from 'react'

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4)
}

export function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0)
  const [done, setDone] = useState(false)
  const containerRef = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node || target == null) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setValue(target)
      setDone(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const startTime = performance.now()

          function tick(now) {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const current = Math.round(easeOutQuart(progress) * target)
            setValue(current)

            if (progress < 1) {
              requestAnimationFrame(tick)
            } else {
              setValue(target)
              setDone(true)
            }
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [target, duration])

  return { value, done, ref: containerRef }
}
