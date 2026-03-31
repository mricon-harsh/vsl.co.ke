document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");
    const lockPage = document.getElementById("lockPage");
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
    const page3 = document.getElementById("page3");
    const passwordInput = document.getElementById("passwordInput");
    const unlockBtn = document.getElementById("unlockBtn");
    const passwordError = document.getElementById("passwordError");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const noText = document.getElementById("noText");
    const nextToPage3 = document.getElementById("nextToPage3");
    const playMusicBtn = document.getElementById("playMusicBtn");
    const finalSong = document.getElementById("finalSong");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");

    const galleryImages = document.querySelectorAll(".gallery img");

    let noCount = 0;
    const noMessages = [
        "Are you sure? 🥺",
        "Think again 💔",
        "Please don't 😭",
        "My heart 💔",
        "No turned into yes 💘"
    ];

    const loveText = `My love ❤️\n\nYou are my happiness, my peace, my forever.\nEvery smile of yours lights my world.\nI choose you today and always.\n\nYou're the missing piece I didn’t know I needed.\nEvery moment with you feels like home.\nYour laugh is my favorite sound.\nI love the way you care, love, and support me.\nI’m grateful for you and us.\nCan’t wait to celebrate Valentine’s with you.\nYou’re loved more than words can say. 💕`;

    // Loading screen
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
            content.classList.remove("hidden");
        }, 500);
    }, 1200);

    function showSection(section) {
        [lockPage, page1, page2, page3].forEach(s => s.classList.add("hidden"));
        section.classList.remove("hidden");
        section.classList.add("fade-in");
    }

    function showError(message) {
        passwordError.textContent = message;
        setTimeout(() => passwordError.textContent = "", 1800);
    }

    unlockBtn.addEventListener("click", () => {
        if (passwordInput.value.trim().toLowerCase() === "iloveyou") {
            passwordInput.value = "";
            showSection(page1);
        } else {
            showError("Wrong password 😢. Try again.");
        }
    });

    passwordInput.addEventListener("keydown", event => {
        if (event.key === "Enter") unlockBtn.click();
    });

    yesBtn.addEventListener("click", () => showSection(page2));

    noBtn.addEventListener("click", () => {
        noText.textContent = noMessages[noCount] || noMessages[noMessages.length - 1];
        noCount++;
        moveNoButton();

        if (noCount > 4) {
            noBtn.style.display = "none";
        }
    });

    function moveNoButton() {
        const padding = 12;
        const { innerWidth: w, innerHeight: h } = window;
        const x = Math.random() * (w - noBtn.offsetWidth - padding * 2) + padding;
        const y = Math.random() * (h - noBtn.offsetHeight - padding * 2) + padding;
        noBtn.style.position = "fixed";
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    }

    nextToPage3.addEventListener("click", () => showSection(page3));

    playMusicBtn.addEventListener("click", () => {
        finalSong.play().catch(() => {
            alert("Tap once more to enable audio.");
        });
    });

    lightboxClose.addEventListener("click", () => {
        lightbox.classList.add("hidden");
        lightbox.setAttribute("aria-hidden", "true");
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add("hidden");
            lightbox.setAttribute("aria-hidden", "true");
        }
    });

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            lightboxImage.src = img.dataset.src;
            lightbox.classList.remove("hidden");
            lightbox.classList.add("visible");
            lightbox.setAttribute("aria-hidden", "false");
        });
    });

    // Typing effect
    const typingTarget = document.getElementById("typingMessage");
    let index = 0;

    function typeCharacter() {
        if (index <= loveText.length) {
            typingTarget.textContent = loveText.slice(0, index);
            index++;
            setTimeout(typeCharacter, 42);
        }
    }

    setTimeout(typeCharacter, 600);

    // Floating hearts
    const heartsContainer = document.getElementById("floatingHearts");

    function createHeart() {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerText = Math.random() > 0.5 ? "❤️" : "🌹";
        heart.style.left = `${Math.random() * 95}vw`;
        heart.style.fontSize = `${Math.random() * 20 + 16}px`;
        heart.style.animationDuration = `${Math.random() * 3 + 5}s`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        heart.style.opacity = `${Math.random() * 0.6 + 0.4}`;

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8500);
    }

    setInterval(createHeart, 420);

    // Ensure video fallback text if not supported
    const bgVideo = document.getElementById("bgVideo");
    bgVideo.addEventListener("error", () => {
        console.warn("Background video failed to load. Please check assets/video/background.mp4");
    });

});
