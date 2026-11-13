
console.log("GSAP version:", gsap.version);

// REGISTER SCROLLTRIGGER
gsap.registerPlugin(ScrollTrigger);


// ===================================
// 1. TIMELINE ANIMATION
// ===================================

const tl = gsap.timeline({
    paused: true,
    defaults: {
        ease: "bounce.out"
    }
});

// Heading
tl.from("h1", {
    y: -60,
    opacity: 0,
    duration: 1
});

// Navigation
tl.from("nav a", {
    y: -20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2
});

// Hero
tl.from("#hero", {
    y: 50,
    opacity: 0,
    duration: 0.8
});

// Four Information Cards
tl.from("#about, #services, #skills, #education", {
    y: 50,
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.7)"
});

// Start timeline automatically
tl.play();


// ===================================
// 2. REPLAY TIMELINE BUTTON
// ===================================

const replayButton = document.querySelector("#replayTimeline");

if (replayButton) {
    replayButton.addEventListener("click", () => {
        tl.restart();
    });
}


// ===================================
// 3. SCROLLTRIGGER + SCRUB
// ===================================

const scrollSections = gsap.utils.toArray(
    "#projects, #experience, #contact"
);

scrollSections.forEach((section) => {

    gsap.fromTo(
        section,
        {
            y: 120,
            opacity: 0.2,
            scale: 0.95
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "none",

            scrollTrigger: {
                trigger: section,
                start: "top 90%",
                end: "center 50%",
                scrub: 1,

                // Show markers while testing
                markers: true
            }
        }
    );

});


// ===================================
// 4. PARALLAX EFFECT FOR HERO
// ===================================

const heroVisual = document.querySelector(
    "#hero > div:last-child"
);

if (heroVisual) {

    gsap.to(heroVisual, {
        y: -80,
        ease: "none",

        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });

}


// ===================================
// 5. HOVER BOUNCE FOR SECTIONS
// ===================================

const allSections = gsap.utils.toArray(
    "#about, #services, #skills, #education, #projects, #experience, #contact"
);

allSections.forEach((section) => {

    section.addEventListener("mouseenter", () => {

        gsap.to(section, {
            scale: 1.02,
            duration: 0.3,
            ease: "back.out(1.7)"
        });

    });

    section.addEventListener("mouseleave", () => {

        gsap.to(section, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });

    });

});


// ===================================
// 6. DARK MODE TOGGLE
// ===================================

const toggleButton = document.querySelector("#toggledark");
const html = document.documentElement;

if (toggleButton) {

    toggleButton.addEventListener("click", () => {

        html.classList.toggle("dark");

        gsap.to(toggleButton, {
            rotation: "+=360",
            duration: 0.6,
            ease: "power2.out",

            onComplete: () => {

                gsap.set(toggleButton, {
                    rotation: 0
                });

            }
        });

    });

}
