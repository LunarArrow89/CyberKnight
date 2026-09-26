const village = {
    unlocked: false,
    resources: { wood: 0, stone: 0, food: 0 },
    buildings: { campfire: false, shelter: false, workshop: false },
    walk: { active: false, startTime: 0, lastRewardCount: 0, duration: 20 * 60 * 1000 }
};

const buildingCosts = {
    campfire: { wood: 10, stone: 5 },
    shelter: { wood: 20, stone: 10 },
    workshop: { wood: 35, stone: 25 }
};

const buildingNames = {
    campfire: "Campfire",
    shelter: "Shelter",
    workshop: "Workshop"
};

function showArrivalScene() {
    const scene = document.getElementById("arrivalScene");
    const forestGame = document.getElementById("forestGame");
    const text = document.getElementById("arrivalText");
    const button = document.getElementById("arrivalContinue");

    if (!scene || !text || !button) return;

    if (forestGame) forestGame.classList.add("hidden");

    text.textContent = "You leave the Whispering Woods behind...";
    button.textContent = "Continue";
    button.dataset.step = "1";

    scene.classList.remove("hidden");
}

function nextArrivalLine() {
    const text = document.getElementById("arrivalText");
    const button = document.getElementById("arrivalContinue");

    if (button.dataset.step === "1") {
        text.textContent =
            "Beyond the trees, you see an old village. Broken homes stand quietly among the weeds.";
        button.dataset.step = "2";
        return;
    }

    if (button.dataset.step === "2") {
        text.textContent =
            "No one seems to live here anymore. But perhaps it does not have to stay that way.";
        button.dataset.step = "3";
        return;
    }

    village.unlocked = true;
    gameEnded = true;
    document.getElementById("arrivalScene").classList.add("hidden");
    showVillage();
    addVillageLog("You found Oakshade Village.");
    addVillageLog("Gather resources and begin rebuilding.");
    saveGame();
}

function showVillage() {
    const hub = document.getElementById("villageScreen");
    if (!hub) return;

    document.getElementById("arrivalScene")?.classList.add("hidden");
    hub.classList.remove("hidden");
    updateVillageUI();
}

function addVillageLog(message) {
    const log = document.getElementById("villageLog");
    if (!log) return;

    const entry = document.createElement("div");
    entry.textContent = message;
    log.prepend(entry);

    while (log.children.length > 8) {
        log.lastElementChild.remove();
    }
}

function gatherResource(type) {
    if (!village.unlocked) return;

    const amounts = { wood: 2, stone: 2, food: 1 };
    const amount = amounts[type] || 1;
    village.resources[type] += amount;

    addVillageLog(`You gathered ${amount} ${type}.`);
    updateVillageUI();
    saveGame();
}

function canBuild(type) {
    const cost = buildingCosts[type];
    return Object.keys(cost).every(resource =>
        village.resources[resource] >= cost[resource]
    );
}

function buildBuilding(type) {
    if (!village.unlocked || village.buildings[type]) return;

    if (!canBuild(type)) {
        addVillageLog(`You don't have enough resources for the ${buildingNames[type]}.`);
        return;
    }

    Object.entries(buildingCosts[type]).forEach(([resource, amount]) => {
        village.resources[resource] -= amount;
    });

    village.buildings[type] = true;
    addVillageLog(`You rebuilt the ${buildingNames[type]}.`);
    updateVillageUI();
    saveGame();
}

let villageWalkTimer = null;

function updateVillageUI() {
    const screen = document.getElementById("villageScreen");
    if (!screen) return;

    document.getElementById("woodText").textContent = village.resources.wood;
    document.getElementById("stoneText").textContent = village.resources.stone;
    document.getElementById("foodText").textContent = village.resources.food;

    const walkButton = document.getElementById("takeWalkButton");
    if (walkButton) {
        walkButton.disabled = village.walk.active;
        walkButton.textContent = village.walk.active ? "Walking..." : "Take a Walk";
    }

    Object.keys(village.buildings).forEach(type => {
        const card = document.getElementById(`${type}Building`);
        const button = document.getElementById(`${type}BuildButton`);
        if (!card || !button) return;

        const built = village.buildings[type];
        card.classList.toggle("built", built);
        button.disabled = built || !canBuild(type);
        button.textContent = built ? "Built" : "Build";
    });
}

function startVillageWalk() {
    if (!village.unlocked || village.walk.active) return;
    village.walk.active = true;
    village.walk.startTime = Date.now();
    village.walk.lastRewardCount = 0;
    document.getElementById("villageWalkScreen")?.classList.remove("hidden");
    addVillageLog("You set out for a 20 minute walk.");
    saveGame();
    clearInterval(villageWalkTimer);
    villageWalkTimer = setInterval(updateVillageWalk, 1000);
    updateVillageWalk();
}

function updateVillageWalk() {
    if (!village.walk.active) return;
    const elapsed = Date.now() - village.walk.startTime;
    const progress = Math.min(1, elapsed / village.walk.duration);
    const walkBar = document.getElementById("villageWalkBar");
    const walkText = document.getElementById("villageWalkText");
    const nextRewardText = document.getElementById("nextWalkRewardText");
    if (walkBar) walkBar.style.width = (progress * 100) + "%";
    const remaining = Math.max(0, village.walk.duration - elapsed);
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    if (walkText) walkText.textContent = minutes + ":" + String(seconds).padStart(2, "0") + " remaining";
    const rewardCount = Math.floor(elapsed / 15000);
    while (village.walk.lastRewardCount < rewardCount) {
        village.walk.lastRewardCount++;
        const resources = ["wood", "stone", "food"];
        const resource = resources[Math.floor(Math.random() * resources.length)];
        village.resources[resource]++;
        addVillageLog("Your walk helped you find 1 " + resource + ".");
    }
    if (nextRewardText) {
        const secondsUntilReward = 15 - Math.floor((elapsed % 15000) / 1000);
        nextRewardText.textContent = secondsUntilReward + " seconds until your next resource";
    }
    updateVillageUI();
    if (elapsed >= village.walk.duration) finishVillageWalk();
    else saveGame();
}

function finishVillageWalk() {
    village.walk.active = false;
    clearInterval(villageWalkTimer);
    villageWalkTimer = null;
    document.getElementById("villageWalkScreen")?.classList.add("hidden");
    addVillageLog("You finished your 20 minute walk and returned to Oakshade Village.");
    updateVillageUI();
    saveGame();
}
function resetVillage() {
    village.unlocked = false;
    village.resources = { wood: 0, stone: 0, food: 0 };
    village.buildings = { campfire: false, shelter: false, workshop: false };
    village.walk = { active: false, startTime: 0, lastRewardCount: 0, duration: 20 * 60 * 1000 };
    clearInterval(villageWalkTimer);
    villageWalkTimer = null;
    document.getElementById("villageWalkScreen")?.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("arrivalContinue")?.addEventListener("click", nextArrivalLine);

    document.querySelectorAll("[data-gather]").forEach(button => {
        button.addEventListener("click", () => gatherResource(button.dataset.gather));
    });

    document.querySelectorAll("[data-build]").forEach(button => {
        button.addEventListener("click", () => buildBuilding(button.dataset.build));
    });

    document.getElementById("takeWalkButton")?.addEventListener("click", startVillageWalk);

    updateVillageUI();

    if (village.walk.active) {
        document.getElementById("villageWalkScreen")?.classList.remove("hidden");
        clearInterval(villageWalkTimer);
        villageWalkTimer = setInterval(updateVillageWalk, 1000);
        updateVillageWalk();
    }
});
