function tick() {
    if (!resting && !gameEnded && !village.unlocked) {
        updatePath();
    }

    if (!village.unlocked) {
        updateRest();
    }

    saveGame();
}

loadGame();

document.addEventListener("DOMContentLoaded", () => {
    updateHP();
    updateGold();
    updateForest();

    if (village.unlocked && paths.forest.completed) {
        showVillage();
    } else if (paths.forest.completed) {
        gameEnded = true;
        showArrivalScene();
    }
});

setInterval(tick, 1000);
