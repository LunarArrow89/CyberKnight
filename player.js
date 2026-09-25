const player = {
    hp: 40,
    maxHp: 40,
    attack: 8,
    level: 1,
    xp: 0,
    xpToNext: 50,
    gold: 0
};

let resting = false;
let gameEnded = false;

function addLog(message) {
    const log = document.getElementById("log");
    const entry = document.createElement("div");

    entry.className = "log-entry";
    entry.textContent = message;

    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}

function updateHP() {
    document.getElementById("hpText").textContent =
        `${player.hp} / ${player.maxHp}`;

    document.getElementById("hpBarText").textContent =
        `${player.hp} / ${player.maxHp} HP`;

    document.getElementById("hpBar").style.width =
        `${(player.hp / player.maxHp) * 100}%`;
}

function updateGold() {
    document.getElementById("goldText").textContent = player.gold;
}

function updateForest() {
    const path = paths[currentPath];

    document.getElementById("forestBar").style.width =
        `${(path.progress / path.duration) * 100}%`;

    const minutes = Math.floor(path.progress / 60);
    const seconds = path.progress % 60;
    const totalMinutes = Math.floor(path.duration / 60);
    const totalSeconds = path.duration % 60;

    document.getElementById("forestText").textContent =
        `${minutes}:${String(seconds).padStart(2, '0')} / ${totalMinutes}:${String(totalSeconds).padStart(2, '0')}`;
}

function giveXP(amount) {
    player.xp += amount;

    if (player.xp >= player.xpToNext) {
        player.xp -= player.xpToNext;
        player.level++;
        player.attack += 2;
        player.xpToNext += 25;

        addLog(`You reached level ${player.level}!`);
    }

    document.getElementById("xpBarText").textContent =
        `${player.xp} / ${player.xpToNext} XP`;

    document.getElementById("xpBar").style.width =
        `${(player.xp / player.xpToNext) * 100}%`;

    document.getElementById("levelText").textContent = player.level;
    document.getElementById("attackText").textContent = player.attack;
}

function updateRest() {
    if (!resting) return;

    document.getElementById("statusText").textContent = "Resting";
}

function startRest(force = false) {
    resting = true;
    player.hp = player.maxHp;

    document.getElementById("statusText").textContent = "Resting";
    document.getElementById("restText").textContent = "You are resting...";
    document.getElementById("restButton").disabled = true;

    addLog(`You are resting.`);

    updateHP();

    setTimeout(() => {
        resting = false;
        document.getElementById("statusText").textContent = "Walking";
        document.getElementById("restText").textContent = "Rest when you need to recover.";
        document.getElementById("restButton").disabled = false;

        addLog(`You feel refreshed!`);
    }, 3000);
}

function resetGame() {
    if (confirm("Are you sure you want to reset your save? This cannot be undone.")) {
        localStorage.removeItem("whisperingWoodsSave");
        
        player.hp = 40;
        player.maxHp = 40;
        player.attack = 8;
        player.level = 1;
        player.xp = 0;
        player.xpToNext = 50;
        player.gold = 0;
        
        resting = false;
        gameEnded = false;
        currentPath = "forest";
        
        paths.forest.progress = 0;
        paths.forest.encounterTime = 45;
        paths.forest.completed = false;
        
        paths.cave.progress = 0;
        paths.cave.encounterTime = 60;
        paths.cave.completed = false;
        
        document.getElementById("log").innerHTML = "";
        
        updateHP();
        updateGold();
        document.getElementById("levelText").textContent = player.level;
        document.getElementById("attackText").textContent = player.attack;
        document.getElementById("statusText").textContent = "Walking";
        document.getElementById("forestBar").style.width = "0%";
        document.getElementById("xpBar").style.width = "0%";
        document.getElementById("xpBarText").textContent = "0 / 50 XP";
        document.getElementById("forestText").textContent = "0:00 / 5:00";
        
        addLog("Game reset! Starting fresh adventure...");
    }
}

// Initialize UI on page load
document.addEventListener("DOMContentLoaded", () => {
    updateHP();
    updateGold();
    document.getElementById("levelText").textContent = player.level;
    document.getElementById("attackText").textContent = player.attack;
    
    const resetButton = document.getElementById("resetButton");
    if (resetButton) {
        resetButton.addEventListener("click", resetGame);
    }
    
    const restButton = document.getElementById("restButton");
    if (restButton) {
        restButton.addEventListener("click", startRest);
    }
});
