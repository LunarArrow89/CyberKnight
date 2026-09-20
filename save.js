const SAVE_KEY = "cyberKnightSave";


function saveGame(showMessage = false) {

    if (!player.class) {
        return;
    }

    const saveData = {

        class: player.class,

        level: player.level,

        maxHp: player.maxHp,

        hp: player.hp,

        attack: player.attack,

        xp: player.xp,

        xpNeeded: player.xpNeeded,

        gold: player.gold,

        potions: player.potions

    };


    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(saveData)
    );


    if (showMessage) {

        addLog("Game saved.");

    }

}


function loadGame() {

    const savedData =
        localStorage.getItem(SAVE_KEY);


    if (!savedData) {

        return false;

    }


    try {

        const saveData =
            JSON.parse(savedData);


        if (
            !saveData.class ||
            !classes[saveData.class]
        ) {

            return false;

        }


        player.class = saveData.class;

        player.level = saveData.level;

        player.maxHp = saveData.maxHp;

        player.hp = saveData.hp;

        player.attack = saveData.attack;

        player.xp = saveData.xp;

        player.xpNeeded = saveData.xpNeeded;

        player.gold = saveData.gold;

        player.potions = saveData.potions;


        currentEnemy = null;

        defending = false;


        document
            .querySelectorAll(".screen")
            .forEach(screen => {

                screen.classList.remove("active");

            });


        document
            .getElementById("mainScreen")
            .classList.add("active");


        update();


        addLog("Saved game loaded.");

        return true;

    }

    catch (error) {

        console.error(
            "CyberKnight save could not be loaded:",
            error
        );

        return false;

    }

}


function resetGame() {

    const confirmed =
        confirm(
            "Are you sure you want to reset CyberKnight?\n\nAll saved progress will be deleted."
        );


    if (!confirmed) {

        return;

    }


    localStorage.removeItem(SAVE_KEY);


    player = {

        class: null,

        level: 1,

        maxHp: 0,

        hp: 0,

        attack: 0,

        xp: 0,

        xpNeeded: 100,

        gold: 20,

        potions: 3

    };


    currentEnemy = null;

    defending = false;


    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    document
        .getElementById("startScreen")
        .classList.add("active");


    document.getElementById("log").innerHTML = "";

    document.getElementById("battleLog").innerHTML = "";

}


window.addEventListener("load", () => {

    loadGame();

});
