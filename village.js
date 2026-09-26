const village = {
    unlocked: false,
    resources: { wood: 0, stone: 0, food: 0 },
    buildings: { campfire: false, shelter: false, workshop: false }
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
    if (!scene) return;

    if (forestGame) forestGame.classList.add("hidden");
    scene.classList.remove("hidden");
    document.getElementById("arrivalText").textContent =
        "You leave the Whispering Woods behind...";
    document.getElementById("arrivalContinue").textContent = "Continue";
    document.getElementById("arrivalContinue").dataset.step = "1";
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

function updateVillageUI() {
    const screen = document.getElementById("villageScreen");
    if (!screen) return;

    document.getElementById("woodText").textContent = village.resources.wood;
    document.getElementById("stoneText").textContent = village.resources.stone;
    document.getElementById("foodText").textContent = village.resources.food;

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

function resetVillage() {
    village.unlocked = false;
    village.resources = { wood: 0, stone: 0, food: 0 };
    village.buildings = { campfire: false, shelter: false, workshop: false };
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("arrivalContinue")?.addEventListener("click", nextArrivalLine);

    document.querySelectorAll("[data-gather]").forEach(button => {
        button.addEventListener("click", () => gatherResource(button.dataset.gather));
    });

    document.querySelectorAll("[data-build]").forEach(button => {
        button.addEventListener("click", () => buildBuilding(button.dataset.build));
    });

    updateVillageUI();
});
