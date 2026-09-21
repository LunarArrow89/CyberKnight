const SAVE_KEY = "whisperingWoodsSave";

function getSaveData() {
    return {
        player: {
            hp: player.hp,
            maxHp: player.maxHp,
            attack: player.attack
        },

        forestTime: forestTime
    };
}

function saveGame() {
    const saveData = getSaveData();

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(saveData)
    );

    addLog("Game saved.");
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
            player.hp = data.player.hp ?? player.hp;
            player.maxHp = data.player.maxHp ?? player.maxHp;
            player.attack = data.player.attack ?? player.attack;
        }

        if (typeof data.forestTime === "number") {
            forestTime = data.forestTime;
        }

        updateHP();
        updateForest();
        updateStatus();

        addLog("Game loaded.");
    } catch (error) {
        console.error("Save file could not be loaded:", error);
        addLog("The save file was corrupted. Starting a new game.");
    }
}

function deleteSave() {
    localStorage.removeItem(SAVE_KEY);

    addLog("Save deleted.");
}

window.addEventListener("beforeunload", () => {
    saveGame();
});
