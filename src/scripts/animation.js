
console.log("Animation script loaded!");

// ===================================
// 1. GSAP INITIALIZATION
// ===================================

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

if (!gsap || !ScrollTrigger) {
    console.error("GSAP or ScrollTrigger failed to load.");

} else {

    gsap.registerPlugin(ScrollTrigger);

    console.log("GSAP version:", gsap.version);


    // ===================================
    // 2. MAIN TIMELINE
    // ===================================

    const tl = gsap.timeline({
        paused: true,
        defaults: {
            ease: "power2.out"
        }
    });

    tl.from("h1", {
        y: -60,
        opacity: 0,
        duration: 1
    });

    tl.from(
        ".nav-link",
        {
            y: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1
        },
        "-=0.5"
    );

    tl.from(
        "#hero",
        {
            y: 50,
            opacity: 0,
            duration: 0.8
        },
        "-=0.2"
    );

    tl.from(
        "#about, #services, #skills, #education",
        {
            y: 50,
            opacity: 0,
            scale: 0.9,
            duration: 0.7,
            stagger: 0.2
        },
        "-=0.3"
    );

    // Play timeline automatically
    tl.play();


    // ===================================
    // 3. REPLAY BUTTON
    // ===================================

    const replayButton = document.querySelector(
        "#replayTimeline"
    );

    if (replayButton) {

        replayButton.addEventListener("click", () => {

            console.log("Replay button clicked!");

            tl.restart();

        });

    } else {

        console.error("Replay button not found!");

    }


    // ===================================
    // 4. DARK MODE TOGGLE
    // ===================================

    const toggleButton = document.querySelector(
        "#toggledark"
    );

    const html = document.documentElement;

    if (toggleButton) {

        // Set initial button label
        toggleButton.textContent = html.classList.contains("dark")
            ? "☀ Light Mode"
            : "☾ Dark Mode";

        toggleButton.addEventListener("click", () => {

            html.classList.toggle("dark");

            const isDark = html.classList.contains("dark");

            toggleButton.textContent = isDark
                ? "☀ Light Mode"
                : "☾ Dark Mode";

            gsap.fromTo(
                toggleButton,
                {
                    rotation: 0
                },
                {
                    rotation: 360,
                    duration: 0.5,
                    ease: "power2.out"
                }
            );

            console.log("Dark mode:", isDark);

        });

    } else {

        console.error("Dark mode button not found!");

    }


    // ===================================
    // 5. NAVIGATION
    // ===================================

    const navigationLinks = document.querySelectorAll(
        ".nav-link, .logo"
    );

    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) return;

            const target = document.querySelector(href);

            if (!target) {
                console.warn("Navigation target not found:", href);
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.replaceState(null, "", href);

        });

    });


    // ===================================
    // 6. SCROLL PROGRESS BAR
    // ===================================

    const progressBar = document.querySelector(
        "#progressBar"
    );

    function updateProgressBar() {

        if (!progressBar) return;

        const scrollTop = window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress = scrollHeight > 0
            ? scrollTop / scrollHeight
            : 0;

        progressBar.style.transform =
            `scaleX(${Math.min(Math.max(progress, 0), 1)})`;

    }

    if (progressBar) {

        window.addEventListener(
            "scroll",
            updateProgressBar,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateProgressBar
        );

        updateProgressBar();

        console.log("Progress bar initialized!");

    } else {

        console.error("Progress bar element not found!");

    }


    // ===================================
    // 7. SCROLLTRIGGER + SCRUB
    // ===================================

    const scrollSections = gsap.utils.toArray(
        "#projects, #experience, #contact"
    );

    scrollSections.forEach((section) => {

        gsap.fromTo(
            section,
            {
                y: 150,
                opacity: 0,
                scale: 0.85
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                ease: "none",

                scrollTrigger: {
                    trigger: section,
                    start: "top 90%",
                    end: "top 30%",
                    scrub: 1,
                    markers: false,
                    invalidateOnRefresh: true
                }
            }
        );

    });


    // ===================================
    // 8. HERO PARALLAX
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
    // 9. HOVER BOUNCE EFFECT
    // ===================================

    const allSections = gsap.utils.toArray(
        "#about, #services, #skills, #education, #projects, #experience, #contact"
    );

    allSections.forEach((section) => {

        section.addEventListener("mouseenter", () => {

            gsap.to(section, {
                scale: 1.02,
                duration: 0.3,
                ease: "back.out(1.7)",
                overwrite: "auto"
            });

        });

        section.addEventListener("mouseleave", () => {

            gsap.to(section, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto"
            });

        });

    });


    // ===================================
    // 10. REFRESH SCROLLTRIGGER
    // ===================================

    window.addEventListener("load", () => {

        ScrollTrigger.refresh();
        updateProgressBar();

    });

    window.addEventListener("resize", () => {

        ScrollTrigger.refresh();
        updateProgressBar();

    });

    ScrollTrigger.refresh();

}
