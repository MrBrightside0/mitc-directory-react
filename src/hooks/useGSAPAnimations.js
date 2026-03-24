import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-triggered reveal with stagger.
 * Uses fromTo to guarantee elements end visible even if trigger misfires.
 */
export function useScrollReveal(containerRef, selector = '.reveal-item', options = {}) {
  const {
    y = 50,
    x = 0,
    duration = 0.8,
    stagger = 0.12,
    ease = 'power3.out',
    start = 'top 90%',
    scale = 1,
  } = options;

  useGSAP(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(selector);
    if (items.length === 0) return;

    gsap.fromTo(items,
      { y, x, opacity: 0, scale },
      {
        y: 0, x: 0, opacity: 1, scale: 1,
        duration, stagger, ease,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef });
}

/**
 * Counter that counts up from 0 → target on scroll
 */
export function useCountUp(ref, target, options = {}) {
  const { duration = 2.5, ease = 'power1.out', start = 'top 90%', suffix = '' } = options;

  useGSAP(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration,
      ease,
      snap: { val: 1 },
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = obj.val + suffix;
      },
    });
  }, { scope: ref });
}

/**
 * Text lines slide up from behind overflow mask
 */
export function useTextReveal(containerRef, selector = '.text-reveal-line', options = {}) {
  const { duration = 1, stagger = 0.2, ease = 'power4.out', delay = 0 } = options;

  useGSAP(() => {
    if (!containerRef.current) return;
    const lines = containerRef.current.querySelectorAll(selector);
    if (lines.length === 0) return;

    gsap.fromTo(lines,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration, stagger, ease, delay }
    );
  }, { scope: containerRef });
}

/**
 * Parallax on scroll (scrub-based)
 */
export function useParallax(ref, options = {}) {
  const { yPercent = 20, start = 'top bottom', end = 'bottom top' } = options;

  useGSAP(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      yPercent,
      ease: 'none',
      scrollTrigger: { trigger: ref.current, start, end, scrub: true },
    });
  }, { scope: ref });
}

/**
 * Magnetic hover effect for buttons
 */
export function useMagnetic(ref, strength = 0.3) {
  useGSAP(() => {
    if (!ref.current) return;
    const el = ref.current;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.3, ease: 'power2.out' });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, { scope: ref });
}

/**
 * Horizontal scroll-triggered progress line
 */
export function useScrollProgress(ref, options = {}) {
  const { start = 'top 80%', end = 'bottom 20%' } = options;

  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: ref.current.parentElement, start, end, scrub: true },
      }
    );
  }, { scope: ref });
}
