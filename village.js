const village = {
    unlocked: false,
    resources: {
        wood: 0,
        stone: 0,
        food: 0
    },
    buildings: {
        campfire: false,
        shelter: false,
        workshop: false
    }
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
    if (!scene) return;

    scene.classList.remove("hidden");
    document.getElementById("arrivalText").textContent =
        "You finally find your way out of the Whispering Woods...";
    document.getElementById("arrivalContinue").textContent = "Continue";
}

function nextArrivalLine() {
    const text = document.getElementById("arrivalText");
    const button = document.getElementById("arrivalContinue");

    if (!text || !button) return;

    if (button.dataset.step === "1") {
        text.textContent =
            "Beyond the trees sits an old village. Its homes are broken, its fire is cold, and the paths have nearly disappeared.";
        button.dataset.step = "2";
        return;
    }

    if (button.dataset.step === "2") {
        text.textContent =
            "Maybe this place can be rebuilt.";
        button.dataset.step = "3";
        return;
    }

    village.unlocked = true;
    document.getElementById("arrivalScene").classList.add("hidden");
    showVillage();
    addLog("You found the old village.");
    addLog("Gather resources and rebuild it.");
    saveGame();
}

function showVillage() {
    const forest = document.getElementById("forestScreen");
    const hub = document.getElementById("villageScreen");

    if (forest) forest.classList.add("hidden");
    if (hub) hub.classList.remove("hidden");

    document.getElementById("statusText").textContent = "In Village";
    updateVillageUI();
}

function gatherResource(type) {
    if (!village.unlocked) return;

    let amount = 1;

    if (type === "wood") {
        amount = 2;
    } else if (type === "stone") {
        amount = 2;
    } else if (type === "food") {
        amount = 1;
    }

    village.resources[type] += amount;

    const names = {
        wood: "wood",
        stone: "stone",
        food: "food"
    };

    addLog(`You gathered ${amount} ${names[type]}.`);
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
        addLog(`You don't have enough resources for the ${buildingNames[type]}.`);
        return;
    }

    const cost = buildingCosts[type];

    Object.keys(cost).forEach(resource => {
        village.resources[resource] -= cost[resource];
    });

    village.buildings[type] = true;

    addLog(`You rebuilt the ${buildingNames[type]}.`);
    updateVillageUI();
    saveGame();
}

function updateVillageUI() {
    if (!document.getElementById("villageScreen")) return;

    document.getElementById("woodText").textContent = village.resources.wood;
    document.getElementById("stoneText").textContent = village.resources.stone;
    document.getElementById("foodText").textContent = village.resources.food;

    Object.keys(village.buildings).forEach(type => {
        const card = document.getElementById(`${type}Building`);
        const button = document.getElementById(`${type}BuildButton`);

        if (!card || !button) return;

        if (village.buildings[type]) {
            card.classList.add("built");
            button.textContent = "Built";
            button.disabled = true;
        } else {
            card.classList.remove("built");
            button.disabled = !canBuild(type);
            button.textContent = "Build";
        }
    });
}

function resetVillage() {
    village.unlocked = false;

    village.resources.wood = 0;
    village.resources.stone = 0;
    village.resources.food = 0;

    village.buildings.campfire = false;
    village.buildings.shelter = false;
    village.buildings.workshop = false;
}

document.addEventListener("DOMContentLoaded", () => {
    const continueButton = document.getElementById("arrivalContinue");
    if (continueButton) {
        continueButton.addEventListener("click", nextArrivalLine);
    }

    document.querySelectorAll("[data-gather]").forEach(button => {
        button.addEventListener("click", () => {
            gatherResource(button.dataset.gather);
        });
    });

    document.querySelectorAll("[data-build]").forEach(button => {
        button.addEventListener("click", () => {
            buildBuilding(button.dataset.build);
        });
    });

    updateVillageUI();
});
