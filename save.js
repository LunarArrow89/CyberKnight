const SAVE_KEY = "whisperingWoodsSave";

function getSaveData() {
    return {
        player: {
            hp: player.hp,
            maxHp: player.maxHp,
            attack: player.attack
        },
        // This is the player's current position on the forest path, in seconds.
        forestTime: forestTime,
        gameEnded: gameEnded
    };
}

function saveGame(showMessage = true) {
    const saveData = getSaveData();

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));

    if (showMessage) {
        addLog("Game saved.");
    }
}

function loadGame() {
    const savedData = localStorage.getItem(SAVE_KEY);

    if (!savedData) {
        addLog("No save found. Starting a new game.");
        return;
    }

    try {
        const data = JSON.parse(savedData);

        if (data.player) {
            if (typeof data.player.hp === "number") {
                player.hp = data.player.hp;
            }
            if (typeof data.player.maxHp === "number") {
                player.maxHp = data.player.maxHp;
            }
            if (typeof data.player.attack === "number") {
                player.attack = data.player.attack;
            }
        }

        if (typeof data.forestTime === "number") {
            // Keep the saved path position within the valid journey range.
            forestTime = Math.max(0, Math.min(data.forestTime, FOREST_DURATION));
        }

        gameEnded = data.gameEnded === true || forestTime >= FOREST_DURATION;

        updateHP();
        updateForest();
        updateStatus();

        if (gameEnded) {
            $("victory").style.display = "block";
        }

        addLog(`Path progress loaded: ${formatTime(forestTime)} / 5:00.`);
    } catch (error) {
        console.error("Save file could not be loaded:", error);
        addLog("The save file was corrupted. Starting a new game.");
    }
}

function deleteSave() {
    localStorage.removeItem(SAVE_KEY);
    addLog("Save deleted.");
}

// Preserve progress when the player closes or refreshes the page.
window.addEventListener("beforeunload", () => {
    saveGame(false);
});

// Also save the current path position periodically so progress is not lost
// if the tab closes unexpectedly.
window.setInterval(() => {
    saveGame(false);
}, 5000);
