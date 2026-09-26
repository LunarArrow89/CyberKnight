const SAVE_KEY = "whisperingWoodsSave";

function saveGame() {
    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify({
            player,
            paths,
            currentPath,
            resting,
            gameEnded,
            village
        })
    );
}

function loadGame() {
    const saved = localStorage.getItem(SAVE_KEY);

    if (!saved) return;

    try {
        const data = JSON.parse(saved);

        Object.assign(player, data.player);

        Object.keys(paths).forEach(pathName => {
            if (data.paths && data.paths[pathName]) {
                Object.assign(paths[pathName], data.paths[pathName]);
            }
        });

        if (typeof data.currentPath === "string") {
            currentPath = data.currentPath;
        }

        resting = Boolean(data.resting);
        gameEnded = Boolean(data.gameEnded);

        if (data.village) {
            village.unlocked = Boolean(data.village.unlocked);

            if (data.village.resources) {
                Object.assign(village.resources, data.village.resources);
            }

            if (data.village.buildings) {
                Object.assign(village.buildings, data.village.buildings);
            }
        }
    } catch (e) {
        console.error("Failed to load game:", e);
        localStorage.removeItem(SAVE_KEY);
    }
}
