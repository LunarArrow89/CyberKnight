function tick() {
    if (!resting && !gameEnded && !village.unlocked) {
        updatePath();
    }

    updateRest();
    saveGame();
}

loadGame();

document.addEventListener("DOMContentLoaded", () => {
    updateHP();
    updateGold();
    updateForest();

    if (village.unlocked) {
        showVillage();
    } else if (gameEnded && paths.forest.completed) {
        showArrivalScene();
    }
});

setInterval(tick, 1000);
