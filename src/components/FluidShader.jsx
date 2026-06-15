'use client'

import { useEffect, useRef } from 'react'

/**
 * WebGL fluid color-wave backdrop (domain-warped fbm). Autonomous flow.
 * Robust across SPA route changes:
 *  - re-initialises cleanly on every mount (no loseContext poisoning a reused canvas)
 *  - handles webglcontextlost / webglcontextrestored
 *  - self-heals size each frame (fixes blank canvas mounted at 0×0 during transitions)
 *  - no WebGL  → transparent canvas, CSS .shader-fallback mesh shows through
 *  - reduced-motion → one static frame, no RAF loop
 *  - off-screen / hidden tab → paused
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;
uniform float u_dim;
float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
  vec2 u = f*f*(3.-2.*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.-u.x) + (d-b)*u.x*u.y;
}
float fbm(vec2 p){ float v=0.0,a=0.55; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv; p.x *= u_res.x / u_res.y;
  float t = u_time * 0.04;
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
  vec2 r = vec2(fbm(p + 1.8*q + vec2(1.7, 9.2) + t*0.6), fbm(p + 1.8*q + vec2(8.3, 2.8) - t*0.45));
  float f = fbm(p + 2.0*r);
  vec3 c1 = vec3(0.035, 0.075, 0.150);
  vec3 c2 = vec3(0.075, 0.190, 0.420);
  vec3 c3 = vec3(0.190, 0.540, 0.920);
  vec3 c4 = vec3(0.360, 0.820, 1.000);
  vec3 col = mix(c1, c2, smoothstep(0.0, 0.7, f));
  col = mix(col, c3, smoothstep(0.42, 1.02, f + 0.35*r.x));
  col = mix(col, c4, smoothstep(0.78, 1.24, length(r) + 0.25*f));
  float vig = smoothstep(1.35, 0.35, distance(uv, vec2(0.5)));
  col *= 0.88 + 0.2*vig;
  col *= u_dim;
  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null }
  return s
}

export default function FluidShader({ dim = 0.72, className = 'shader-canvas' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const quality = 0.6

    const gl =
      canvas.getContext('webgl', { antialias: false, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: false }) ||
      canvas.getContext('experimental-webgl')
    if (!gl) return // CSS fallback mesh stays visible

    let uRes = null, uTime = null, uDim = null
    let cw = 0, ch = 0
    let raf = 0
    let start = 0
    let onScreen = true

    function setup() {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT)
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
      if (!vs || !fs) return false
      const prog = gl.createProgram()
      gl.attachShader(prog, vs)
      gl.attachShader(prog, fs)
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false
      gl.useProgram(prog)
      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(prog, 'a_pos')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
      uRes = gl.getUniformLocation(prog, 'u_res')
      uTime = gl.getUniformLocation(prog, 'u_time')
      uDim = gl.getUniformLocation(prog, 'u_dim')
      gl.uniform1f(uDim, dim)
      cw = 0; ch = 0 // force a resize on next draw
      return true
    }

    function syncSize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const rect = canvas.getBoundingClientRect()
      const w = Math.max(1, Math.floor(rect.width * dpr * quality))
      const h = Math.max(1, Math.floor(rect.height * dpr * quality))
      if (w === cw && h === ch) return
      cw = w; ch = h
      canvas.width = w; canvas.height = h
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uRes, w, h)
    }

    function render(timeSec) {
      if (gl.isContextLost()) return
      syncSize()
      gl.uniform1f(uTime, timeSec)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    function loop(now) {
      raf = requestAnimationFrame(loop)
      if (!onScreen || document.hidden || gl.isContextLost()) return
      render((now - start) / 1000)
    }

    function startRendering() {
      cancelAnimationFrame(raf)
      if (reduced) {
        render(40)
      } else {
        start = performance.now()
        raf = requestAnimationFrame(loop)
      }
    }

    const onLost = (e) => { e.preventDefault(); cancelAnimationFrame(raf) }
    const onRestored = () => { if (setup()) startRendering() }
    canvas.addEventListener('webglcontextlost', onLost, false)
    canvas.addEventListener('webglcontextrestored', onRestored, false)

    if (!setup()) {
      canvas.removeEventListener('webglcontextlost', onLost)
      canvas.removeEventListener('webglcontextrestored', onRestored)
      return
    }

    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting }, { threshold: 0 })
    io.observe(canvas)

    // A static-frame fallback also needs to re-render on resize.
    let ro = null
    if (reduced) {
      ro = new ResizeObserver(() => render(40))
      ro.observe(canvas)
    }

    startRendering()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      if (ro) ro.disconnect()
      canvas.removeEventListener('webglcontextlost', onLost)
      canvas.removeEventListener('webglcontextrestored', onRestored)
      // Intentionally NOT calling loseContext(): on a reused canvas (React strict
      // mode / fast refresh) that would return a permanently-lost context on the
      // next getContext, leaving the hero blank until a hard refresh.
    }
  }, [dim])

  return (
    <>
      <div className="shader-fallback" aria-hidden="true" />
      <canvas ref={canvasRef} className={className} aria-hidden="true" />
    </>
  )
}
