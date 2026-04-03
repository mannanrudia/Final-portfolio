// Initialize Lenis Smooth Scrolling
const lenis = new Lenis({
    duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), direction: 'vertical', smooth: true,
});

function raf(time) {
    lenis.raf(time); requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

// 1. Initial Page Load Animation for Studio Canvas
gsap.from(".font-canvas", { y: 50, opacity: 0, duration: 1.5, ease: "power3.out", delay: 0.2 });
gsap.from(".absolute-top-left", { x: -30, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.4 });
gsap.from(".elegant-subtext p", { x: 50, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power4.out", delay: 0.6 });

// 2. The Cloud Parallax Scroll Effect
gsap.to(".cloud-1", {
    yPercent: -100, xPercent: -20, ease: "none", scrollTrigger: { trigger: ".pre-hero", start: "top top", end: "bottom top", scrub: true }
});
gsap.to(".cloud-2", {
    yPercent: -150, xPercent: 30, scale: 1.5, ease: "none", scrollTrigger: { trigger: ".pre-hero", start: "top top", end: "bottom top", scrub: true }
});
gsap.to(".cloud-3", {
    yPercent: -80, scale: 1.2, ease: "none", scrollTrigger: { trigger: ".pre-hero", start: "top top", end: "bottom top", scrub: true }
});
gsap.to(".pre-hero-content", {
    yPercent: 80, opacity: 0, scrollTrigger: { trigger: ".pre-hero", start: "top top", end: "60% top", scrub: true }
});

// 3. Main Hero Animations
const tl = gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top 60%" } });
tl.from('.hero-title', { y: 50, opacity: 0, duration: 1.2, ease: 'power3.out' })
  .from('.cta-buttons', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, "-=0.7");

// Work Section Cards Reveal
gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, { scrollTrigger: { trigger: card, start: "top 85%" }, y: 80, opacity: 0, duration: 1, delay: index * 0.1, ease: 'power3.out' });
});

// Infinite Logo Marquee Duplication 
const track = document.querySelector('.logo-track');
if(track) { track.innerHTML += track.innerHTML; }

// Strategy Accordion Logic
const strategyTrigger = document.getElementById('strategy-trigger');
const strategyContent = document.getElementById('strategy-content');
const strategyIcon = document.getElementById('strategy-icon');

if (strategyTrigger && strategyContent && strategyIcon) {
    strategyTrigger.addEventListener('click', () => {
        strategyContent.classList.toggle('open');
        strategyIcon.classList.toggle('open');
    });
}

// Testimonial Split-Layout Logic (Shailesh-style)
const testiSlides = document.querySelectorAll('.testi-slide');
const testiPhotos = document.querySelectorAll('.testi-photo-cell');
const prevBtn = document.getElementById('prev-testi');
const nextBtn = document.getElementById('next-testi');
let currentSlide = 0;

function updateTesti() {
    testiSlides.forEach((s, i) => {
        s.classList.toggle('active', i === currentSlide);
    });
    testiPhotos.forEach((p, i) => {
        p.classList.toggle('active', i === currentSlide);
    });
}

if (nextBtn && prevBtn && testiSlides.length) {
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testiSlides.length;
        updateTesti();
    });
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testiSlides.length) % testiSlides.length;
        updateTesti();
    });
}

// Hobbies Scatter Animation
gsap.from('.hobby-polaroid', {
    scrollTrigger: { trigger: ".hobbies-section", start: "top 70%" },
    y: 100, opacity: 0, rotation: () => gsap.utils.random(-20, 20),
    duration: 1, stagger: 0.15, ease: "back.out(1.7)"
});

// Audio logic
const audioToggle = document.getElementById('audio-toggle');
const audioEl = document.getElementById('bg-audio');
let isPlaying = false;

if (audioToggle && audioEl) {
    audioToggle.addEventListener('click', () => {
        if (!audioEl.src || audioEl.src.includes(window.location.host + '/#')) {
            audioToggle.innerHTML = isPlaying ? '<span class="icon">🎵</span> audio' : '<span class="icon">⏸️</span> pause';
            isPlaying = !isPlaying;
            return;
        }
        
        if (isPlaying) { audioEl.pause(); audioToggle.innerHTML = '<span class="icon">🎵</span> audio'; } 
        else { audioEl.play(); audioToggle.innerHTML = '<span class="icon">⏸️</span> pause'; }
        isPlaying = !isPlaying;
    });
}

// Swiggy-style content reveals for short-film page dynamically
const reveals = gsap.utils.toArray('.reveal-on-scroll');
if (reveals.length > 0) {
    reveals.forEach(reveal => {
        gsap.to(reveal, {
            scrollTrigger: {
                trigger: reveal,
                start: "top 95%",
                toggleClass: "is-revealed",
                once: false
            }
        });
    });
}
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});

// Profile Pic Interaction (Removed as requested)


// ── JUMPING STICKY NOTE GAME ──
(function() {
    const note = document.getElementById('escape-note');
    const playground = document.getElementById('playground');
    const noteText = document.getElementById('note-text');
    
    if (!note || !playground || !noteText) return;

    const phrases = [
        "HAHAHAHAHA",
        "You cant",
        "Dont try you cant",
        "Okay i give up",
        "Haha, you fell for it",
        "Enough Already",
        "Still Going?",
        "Alright you got me",
        "Okay you win.",
        "Rematch?"
    ];
    let phraseIndex = 0;

    note.addEventListener('mouseenter', () => {
        // 1. Change Text
        note.style.opacity = '0';
        setTimeout(() => {
            noteText.innerText = phrases[phraseIndex];
            phraseIndex = (phraseIndex + 1) % phrases.length;
            note.style.opacity = '1';
        }, 100);

        // 2. Move to Random Position within playground
        const pWidth = playground.offsetWidth;
        const pHeight = playground.offsetHeight;
        const nWidth = note.offsetWidth;
        const nHeight = note.offsetHeight;

        // Safe zones to keep note inside the box
        const maxX = pWidth - nWidth - 20;
        const maxY = pHeight - nHeight - 20;

        const randomX = Math.random() * maxX + 10;
        const randomY = Math.random() * maxY + 10;
        const randomRot = (Math.random() - 0.5) * 20; // -10 to 10 deg

        note.style.left = `${randomX}px`;
        note.style.top = `${randomY}px`;
        note.style.transform = `rotate(${randomRot}deg) scale(1.05)`;
        
        // Reset scale after animation
        setTimeout(() => {
            note.style.transform = `rotate(${randomRot}deg) scale(1)`;
        }, 400);
    });

    // Initial random placement
    note.style.left = '10%';
    note.style.top = '20%';
})();

