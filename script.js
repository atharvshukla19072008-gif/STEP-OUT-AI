/* =========================================
   STEP OUT AI
   Interactive Frontend MVP
========================================= */


/* =========================================
   STATE
========================================= */

let selectedCategory = "nature";

let xp = 450;
let streak = 3;
let missions = 7;
let badges = 3;

let timerInterval = null;
let remainingSeconds = 600;

let currentMission = {
    category: "nature",
    title: "Find a tree you've never really noticed before.",
    description:
        "Walk outside and find an interesting tree. Spend a minute observing its shape, texture and surroundings.",
    icon: "🌳",
    time: 10,
    xp: 50,
    difficulty: "Easy"
};


/* =========================================
   MISSION DATABASE
========================================= */

const missionsData = {

    nature: [
        {
            title: "Find a tree you've never really noticed before.",
            description:
                "Walk outside and find an interesting tree. Spend a minute observing its shape, texture and surroundings.",
            icon: "🌳",
            time: 10,
            xp: 50,
            difficulty: "Easy"
        },

        {
            title: "Find three different shades of green.",
            description:
                "Look around carefully and identify three natural objects with clearly different shades of green.",
            icon: "🍃",
            time: 8,
            xp: 40,
            difficulty: "Easy"
        },

        {
            title: "Discover something growing where you least expect it.",
            description:
                "Look around walls, cracks, sidewalks or unusual places and find a plant growing there.",
            icon: "🌱",
            time: 12,
            xp: 60,
            difficulty: "Medium"
        },

        {
            title: "Find a natural object with an interesting texture.",
            description:
                "Touch and observe a safe natural object. Notice its texture, shape and details.",
            icon: "🪵",
            time: 10,
            xp: 50,
            difficulty: "Easy"
        }
    ],

    fitness: [
        {
            title: "Take a 10-minute exploration walk.",
            description:
                "Walk somewhere nearby that you normally pass without exploring. Keep your phone away.",
            icon: "🚶",
            time: 10,
            xp: 50,
            difficulty: "Easy"
        },

        {
            title: "Find a safe place and do 20 controlled squats.",
            description:
                "Choose a safe outdoor space and complete 20 comfortable bodyweight squats.",
            icon: "🏃",
            time: 8,
            xp: 50,
            difficulty: "Medium"
        },

        {
            title: "Walk until you discover something new.",
            description:
                "Take a relaxed walk and look for a place, object or view you've never noticed before.",
            icon: "🥾",
            time: 15,
            xp: 70,
            difficulty: "Easy"
        }
    ],

    photography: [
        {
            title: "Find a perfect natural pattern.",
            description:
                "Look for repeating shapes, lines or textures in nature and capture the pattern.",
            icon: "📸",
            time: 10,
            xp: 50,
            difficulty: "Easy"
        },

        {
            title: "Photograph a reflection.",
            description:
                "Find a safe reflective surface such as water, glass or a polished object.",
            icon: "💧",
            time: 12,
            xp: 60,
            difficulty: "Medium"
        },

        {
            title: "Find beauty in an ordinary object.",
            description:
                "Choose something ordinary and photograph it from an unusual perspective.",
            icon: "✨",
            time: 10,
            xp: 50,
            difficulty: "Easy"
        }
    ],

    explore: [
        {
            title: "Take a route you've never taken before.",
            description:
                "Choose a safe nearby path you've never explored and discover something new.",
            icon: "🧭",
            time: 15,
            xp: 70,
            difficulty: "Medium"
        },

        {
            title: "Find the quietest place nearby.",
            description:
                "Walk around your surroundings and find a safe place where you can hear the environment clearly.",
            icon: "🌿",
            time: 12,
            xp: 60,
            difficulty: "Easy"
        },

        {
            title: "Discover a place you've always ignored.",
            description:
                "Look around your neighborhood for a safe location you've passed many times but never explored.",
            icon: "🔎",
            time: 15,
            xp: 70,
            difficulty: "Medium"
        }
    ]

};


/* =========================================
   DOM ELEMENTS
========================================= */

const missionTitle = document.getElementById("missionTitle");
const missionDescription = document.getElementById("missionDescription");
const missionVisual = document.getElementById("missionVisual");
const missionTime = document.getElementById("missionTime");
const missionXP = document.getElementById("missionXP");
const missionDifficulty = document.getElementById("missionDifficulty");
const missionCategory = document.getElementById("missionCategory");

const xpDisplay = document.getElementById("xpDisplay");
const streakDisplay = document.getElementById("streakDisplay");
const missionDisplay = document.getElementById("missionDisplay");
const badgeDisplay = document.getElementById("badgeDisplay");
const xpProgress = document.getElementById("xpProgress");

const missionModal = document.getElementById("missionModal");
const howModal = document.getElementById("howModal");

const timerDisplay = document.getElementById("timer");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


/* =========================================
   SCROLL
========================================= */

function scrollToAdventure() {

    document
        .getElementById("adventure")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================================
   CATEGORY
========================================= */

function selectCategory(button) {

    document
        .querySelectorAll(".category-card")
        .forEach(card => {

            card.classList.remove("active");

        });

    button.classList.add("active");

    selectedCategory = button.dataset.category;

    generateMission();
}


/* =========================================
   GENERATE MISSION
========================================= */

function generateMission() {

    const categoryMissions =
        missionsData[selectedCategory];

    const randomIndex =
        Math.floor(
            Math.random() * categoryMissions.length
        );

    const mission =
        categoryMissions[randomIndex];

    currentMission = {
        ...mission,
        category: selectedCategory
    };

    updateMissionUI();

    showToast("New AI mission generated ✨");
}


/* =========================================
   UPDATE MISSION UI
========================================= */

function updateMissionUI() {

    missionTitle.textContent =
        currentMission.title;

    missionDescription.textContent =
        currentMission.description;

    missionVisual.textContent =
        currentMission.icon;

    missionTime.textContent =
        `${currentMission.time} min`;

    missionXP.textContent =
        `${currentMission.xp} XP`;

    missionDifficulty.textContent =
        currentMission.difficulty;

    missionCategory.textContent =
        formatCategory(selectedCategory);

    document.getElementById("modalIcon").textContent =
        currentMission.icon;

    document.getElementById("modalTitle").textContent =
        currentMission.title;

    document.getElementById("modalDescription").textContent =
        currentMission.description;
}


/* =========================================
   FORMAT CATEGORY
========================================= */

function formatCategory(category) {

    const names = {

        nature: "Nature Quest",

        fitness: "Movement Quest",

        photography: "Photography Quest",

        explore: "Exploration Quest"

    };

    return names[category] || "Outdoor Quest";
}


/* =========================================
   START MISSION
========================================= */

function startMission() {

    missionModal.classList.add("active");

    remainingSeconds =
        currentMission.time * 60;

    updateTimer();

    clearInterval(timerInterval);

    timerInterval =
        setInterval(() => {

            remainingSeconds--;

            updateTimer();

            if (remainingSeconds <= 0) {

                clearInterval(timerInterval);

                showToast(
                    "Mission time is up — how did you do?"
                );

            }

        }, 1000);
}


/* =========================================
   TIMER
========================================= */

function updateTimer() {

    const minutes =
        Math.floor(remainingSeconds / 60);

    const seconds =
        remainingSeconds % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


/* =========================================
   COMPLETE MISSION
========================================= */

function completeMission() {

    clearInterval(timerInterval);

    missionModal.classList.remove("active");

    xp += currentMission.xp;

    missions += 1;

    updateDashboard();

    showToast(
        `Mission complete! +${currentMission.xp} XP 🌱`
    );

    checkBadges();
}


/* =========================================
   CANCEL MISSION
========================================= */

function cancelMission() {

    clearInterval(timerInterval);

    missionModal.classList.remove("active");

    showToast("Mission paused. You can try again anytime.");
}


/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    clearInterval(timerInterval);

    missionModal.classList.remove("active");
}


/* =========================================
   HOW IT WORKS
========================================= */

function showHowItWorks() {

    howModal.classList.add("active");
}

function closeHowModal() {

    howModal.classList.remove("active");
}


/* =========================================
   PHONE DOWN MODE
========================================= */

function startPhoneDown() {

    showToast("📵 Phone Down Mode activated. Go explore!");

    setTimeout(() => {

        document.body.classList.add("phone-down-mode");

    }, 500);

}


/* =========================================
   DASHBOARD
========================================= */

function updateDashboard() {

    xpDisplay.textContent = xp;

    streakDisplay.textContent = streak;

    missionDisplay.textContent = missions;

    badgeDisplay.textContent = badges;

    const progress =
        Math.min((xp % 1000) / 10, 100);

    xpProgress.style.width =
        `${progress}%`;

    document.getElementById("heroStreak").textContent =
        `${streak} day streak`;
}


/* =========================================
   BADGES
========================================= */

function checkBadges() {

    if (missions >= 5 && badges < 2) {

        badges = 2;

        showToast("🏆 Badge unlocked: Nature Explorer!");

    }

    if (missions >= 10 && badges < 4) {

        badges = 4;

        showToast("🌎 Badge unlocked: World Explorer!");

    }

    updateDashboard();
}


/* =========================================
   TOAST
========================================= */

let toastTimeout;

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3500);
}


/* =========================================
   CLOSE MODALS ON OUTSIDE CLICK
========================================= */

missionModal.addEventListener(
    "click",
    function (event) {

        if (event.target === missionModal) {

            closeModal();

        }

    }
);


howModal.addEventListener(
    "click",
    function (event) {

        if (event.target === howModal) {

            closeHowModal();

        }

    }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeModal();

            closeHowModal();

        }

    }
);


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateMissionUI();

        updateDashboard();

        console.log(
            "🌱 STEP OUT AI initialized."
        );

    }
);