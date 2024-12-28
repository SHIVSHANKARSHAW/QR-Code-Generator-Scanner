import { gsap } from 'gsap';

export const fadeIn = (element, delay = 0) => {
  gsap.from(element, {
    y: 20,
    duration: 0.6,
    delay,
    ease: 'power2.out'
  });
};

export const scaleIn = (element, delay = 0) => {
  gsap.from(element, {
    scale: 0.8,
    duration: 0.5,
    delay,
    ease: 'back.out(1.7)'
  });
};

export const slideIn = (element, direction = 'right', delay = 0) => {
  const x = direction === 'right' ? 50 : -50;
  gsap.from(element, {
    x,
    duration: 0.6,
    delay,
    ease: 'power2.out'
  });
};

export const pulseAnimation = (element) => {
  gsap.to(element, {
    scale: 1.05,
    duration: 0.3,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut'
  });
};

export const floatingAnimation = (element) => {
  gsap.to(element, {
    y: -10,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
};