const SAVE_KEY = "whisperingWoodsSave";

function saveGame() {
    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify({ player, paths, currentPath, resting, gameEnded, village })
    );
}

function loadGame() {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) return;

    try {
        const data = JSON.parse(saved);
        Object.assign(player, data.player || {});

        Object.keys(paths).forEach(pathName => {
            if (data.paths && data.paths[pathName]) {
                Object.assign(paths[pathName], data.paths[pathName]);
            }
        });

        if (typeof data.currentPath === "string") currentPath = data.currentPath;
        resting = Boolean(data.resting);
        gameEnded = Boolean(data.gameEnded);

        if (data.village) {
            village.unlocked = Boolean(data.village.unlocked);
            Object.assign(village.resources, data.village.resources || {});
            Object.assign(village.buildings, data.village.buildings || {});
        }
    } catch (error) {
        console.error("Failed to load game:", error);
        localStorage.removeItem(SAVE_KEY);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("resetButton")?.addEventListener("click", resetGame);
    document.getElementById("villageResetButton")?.addEventListener("click", resetGame);
});

function resetGame() {
    if (!confirm("Reset your entire Utopia game?")) return;

    localStorage.removeItem(SAVE_KEY);
    location.reload();
}
