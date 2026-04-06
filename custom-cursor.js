document.addEventListener("DOMContentLoaded", () => {
    // ── CUSTOM CURSOR: Only active in Hero + Work Experience sections ──

    const cursorDot = document.createElement("div");
    cursorDot.id = "custom-cursor-dot";
    document.body.appendChild(cursorDot);

    const cursorLabel = document.createElement("div");
    cursorLabel.id = "custom-cursor-label";
    document.body.appendChild(cursorLabel);

    let mouseX = 0, mouseY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        cursorLabel.style.transform = `translate3d(${mouseX + 18}px, ${mouseY + 26}px, 0)`;
    });

    // Only these two sections get the cursor
    const activeSections = document.querySelectorAll(".split-bio-container, .work-section");

    // Clickable elements inside those sections
    const clickableSelectors = "a, button, .project-card, .collage-item, .clickable";

    let animFrame;

    function updateCursor() {
        let inActiveSection = false;
        let isOverClickable = false;

        const el = document.elementFromPoint(mouseX, mouseY);
        if (!el) {
            animFrame = requestAnimationFrame(updateCursor);
            return;
        }

        // Check if mouse is inside one of the active sections
        for (const section of activeSections) {
            const rect = section.getBoundingClientRect();
            // add 160px radius padding around the section
            if (
                mouseX >= rect.left - 160 &&
                mouseX <= rect.right + 160 &&
                mouseY >= rect.top - 160 &&
                mouseY <= rect.bottom + 160
            ) {
                inActiveSection = true;
                break;
            }
        }

        if (inActiveSection) {
            // Check if hovering directly over a clickable within the section
            const closest = el.closest(clickableSelectors);
            const inSection = el.closest(".split-bio-container, .work-section");

            if (closest && inSection) {
                isOverClickable = true;
            }

            document.body.classList.add("custom-cursor-active");
            cursorDot.classList.add("visible");
            cursorLabel.classList.add("visible");

            if (isOverClickable) {
                cursorLabel.innerText = "Click";
                cursorLabel.style.background = "#111";
                cursorLabel.style.color = "#fff";
                cursorLabel.style.borderColor = "#111";
                cursorLabel.style.boxShadow = "2px 2px 0 " + getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
            } else {
                cursorLabel.innerText = "Hover on Cards";
                cursorLabel.style.background = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#fc8019";
                cursorLabel.style.color = "#111";
                cursorLabel.style.borderColor = "#111";
                cursorLabel.style.boxShadow = "2px 2px 0 #111";
            }
        } else {
            document.body.classList.remove("custom-cursor-active");
            cursorDot.classList.remove("visible");
            cursorLabel.classList.remove("visible");
        }

        animFrame = requestAnimationFrame(updateCursor);
    }

    requestAnimationFrame(updateCursor);
});
