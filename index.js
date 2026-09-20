let player = {
    class: "",
    level: 1,
    hp: 100,
    maxHp: 100,
    attack: 10,
    xp: 0,
    xpNeeded: 100,
    gold: 25,
    potions: 3,
    defending: false
}


let enemy = null


const classes = {

    Warrior: {
        hp: 130,
        attack: 14,
        skill: "Power Strike"
    },

    Rogue: {
        hp: 100,
        attack: 12,
        skill: "Critical Strike"
    },

    Mage: {
        hp: 85,
        attack: 9,
        skill: "Energy Blast"
    }

}


const enemies = [

    {
        name: "DATA SLIME",
        hp: 25,
        attack: 5,
        xp: 15,
        gold: 5
    },

    {
        name: "ROGUE DRONE",
        hp: 35,
        attack: 8,
        xp: 25,
        gold: 8
    },

    {
        name: "NEON WOLF",
        hp: 45,
        attack: 11,
        xp: 35,
        gold: 12
    },

    {
        name: "STREET BANDIT",
        hp: 60,
        attack: 14,
        xp: 50,
        gold: 20
    }

]


function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(function(screen) {

            screen.classList.remove("active")

        })


    const screen =
        document.getElementById(id)


    if (screen) {
        screen.classList.add("active")
    }


    update()
}


function chooseClass(className) {

    const selected =
        classes[className]


    if (!selected) {
        return
    }


    player.class = className

    player.maxHp = selected.hp

    player.hp = selected.hp

    player.attack = selected.attack


    log(
        "CLASS SELECTED: " + className,
        "system"
    )


    log(
        "SYSTEM INITIALIZED.",
        "system"
    )


    showScreen("mainScreen")
}


function update() {

    document.getElementById("className")
        .textContent = player.class


    document.getElementById("level")
        .textContent = player.level


    document.getElementById("hp")
        .textContent = player.hp


    document.getElementById("maxHp")
        .textContent = player.maxHp


    document.getElementById("attack")
        .textContent = player.attack


    document.getElementById("gold")
        .textContent = player.gold


    document.getElementById("potions")
        .textContent = player.potions


    document.getElementById("xp")
        .textContent = player.xp


    document.getElementById("xpNeeded")
        .textContent = player.xpNeeded


    const hpPercent =
        Math.max(
            0,
            Math.min(
                100,
                (player.hp / player.maxHp) * 100
            )
        )


    document.getElementById("hpBar")
        .style.width = hpPercent + "%"


    const xpPercent =
        Math.max(
            0,
            Math.min(
                100,
                (player.xp / player.xpNeeded) * 100
            )
        )


    document.getElementById("xpBar")
        .style.width = xpPercent + "%"


    document.getElementById("battleHp")
        .textContent = player.hp


    document.getElementById("battleMaxHp")
        .textContent = player.maxHp


    document.getElementById("battleAttack")
        .textContent = player.attack


    updateBattle()

    updateCharacter()
}


function updateBattle() {

    if (!enemy) {
        return
    }


    document.getElementById("enemyName")
        .textContent = enemy.name


    document.getElementById("enemyHp")
        .textContent = Math.max(
            0,
            enemy.hp
        )


    const percent =
        Math.max(
            0,
            Math.min(
                100,
                (enemy.hp / enemy.maxHp) * 100
            )
        )


    document.getElementById("enemyHpBar")
        .style.width = percent + "%"
}


function updateCharacter() {

    if (!player.class) {
        return
    }


    const info =
        document.getElementById("characterInfo")


    info.innerHTML = `

        <div class="stats">

            <div class="stat">
                <div class="stat-name">
                    CLASS
                </div>

                <div class="stat-value">
                    ${player.class}
                </div>
            </div>


            <div class="stat">
                <div class="stat-name">
                    LEVEL
                </div>

                <div class="stat-value">
                    ${player.level}
                </div>
            </div>


            <div class="stat">
                <div class="stat-name">
                    HP
                </div>

                <div class="stat-value hp">
                    ${player.hp}/${player.maxHp}
                </div>
            </div>


            <div class="stat">
                <div class="stat-name">
                    ATTACK
                </div>

                <div class="stat-value">
                    ${player.attack}
                </div>
            </div>


            <div class="stat">
                <div class="stat-name">
                    XP
                </div>

                <div class="stat-value xp">
                    ${player.xp}/${player.xpNeeded}
                </div>
            </div>


            <div class="stat">
                <div class="stat-name">
                    GOLD
                </div>

                <div class="stat-value gold">
                    ${player.gold}
                </div>
            </div>

        </div>


        <div
            style="
                margin-top:15px;
                color:#a855ff;
            ">

            CLASS SKILL:
            ${classes[player.class].skill}

        </div>
    `
}


function log(message, type = "") {

    const box =
        document.getElementById("log")


    const line =
        document.createElement("div")


    line.className =
        "log-line " + type


    line.textContent =
        "> " + message


    box.appendChild(line)


    box.scrollTop =
        box.scrollHeight
}


function battleLog(message, type = "") {

    const box =
        document.getElementById("battleLog")


    const line =
        document.createElement("div")


    line.className =
        "log-line " + type


    line.textContent =
        "> " + message


    box.appendChild(line)


    box.scrollTop =
        box.scrollHeight
}


function explore() {

    if (enemy) {

        showScreen("battleScreen")

        return
    }


    const chosen =
        enemies[
            Math.floor(
                Math.random() * enemies.length
            )
        ]


    enemy = {

        name: chosen.name,

        hp: chosen.hp,

        maxHp: chosen.hp,

        attack: chosen.attack,

        xp: chosen.xp,

        gold: chosen.gold

    }


    document.getElementById("battleLog")
        .innerHTML = ""


    battleLog(
        "TARGET DETECTED: " + enemy.name,
        "bad"
    )


    battleLog(
        "COMBAT PROTOCOL INITIATED.",
        "system"
    )


    showScreen("battleScreen")
}


function enemyTurn() {

    if (!enemy) {
        return
    }


    let damage =
        enemy.attack +
        Math.floor(
            Math.random() * 4
        )


    if (player.defending) {

        damage =
            Math.floor(damage / 2)


        player.defending = false


        battleLog(
            "DEFENSE SYSTEM REDUCED DAMAGE.",
            "system"
        )
    }


    player.hp -= damage


    battleLog(
        enemy.name +
        " dealt " +
        damage +
        " damage.",
        "bad"
    )


    if (player.hp <= 0) {

        player.hp = 1

        enemy = null

        battleLog(
            "CRITICAL FAILURE.",
            "bad"
        )


        battleLog(
            "Emergency escape activated.",
            "system"
        )


        setTimeout(function() {

            showScreen("mainScreen")

        }, 500)
    }
}


function attackEnemy() {

    if (!enemy) {
        return
    }


    let damage =
        player.attack +
        Math.floor(
            Math.random() * 6
        )


    if (
        player.class === "Rogue" &&
        Math.random() < 0.25
    ) {

        damage *= 2


        battleLog(
            "CRITICAL HIT!",
            "good"
        )
    }


    enemy.hp -= damage


    battleLog(
        "You dealt " +
        damage +
        " damage.",
        "good"
    )


    if (enemy.hp <= 0) {

        victory()

        return
    }


    enemyTurn()

    update()
}


function useSkill() {

    if (!enemy) {
        return
    }


    let damage = 0


    if (player.class === "Warrior") {

        damage =
            player.attack * 2 +
            Math.floor(
                Math.random() * 8
            )


        battleLog(
            "POWER STRIKE!",
            "system"
        )

    } else if (player.class === "Rogue") {

        damage =
            player.attack * 3


        battleLog(
            "CRITICAL STRIKE!",
            "system"
        )

    } else if (player.class === "Mage") {

        damage =
            player.attack * 4 +
            Math.floor(
                Math.random() * 10
            )


        battleLog(
            "ENERGY BLAST!",
            "system"
        )
    }


    enemy.hp -= damage


    battleLog(
        "Skill dealt " +
        damage +
        " damage.",
        "good"
    )


    if (enemy.hp <= 0) {

        victory()

        return
    }


    enemyTurn()

    update()
}


function defend() {

    if (!enemy) {
        return
    }


    player.defending = true


    battleLog(
        "DEFENSE MODE ACTIVATED.",
        "system"
    )


    enemyTurn()

    update()
}


function usePotion() {

    if (!enemy) {
        return
    }


    if (player.potions <= 0) {

        battleLog(
            "NO POTIONS AVAILABLE.",
            "bad"
        )

        return
    }


    if (player.hp >= player.maxHp) {

        battleLog(
            "HP IS ALREADY FULL.",
            "system"
        )

        return
    }


    player.potions--


    const healing =
        Math.floor(
            player.maxHp * 0.35
        )


    player.hp += healing


    if (player.hp > player.maxHp) {
        player.hp = player.maxHp
    }


    battleLog(
        "Potion restored " +
        healing +
        " HP.",
        "good"
    )


    enemyTurn()

    update()
}


function runAway() {

    if (!enemy) {
        return
    }


    if (Math.random() < 0.7) {

        battleLog(
            "ESCAPE SUCCESSFUL.",
            "good"
        )


        enemy = null


        setTimeout(function() {

            showScreen("mainScreen")

        }, 300)

    } else {

        battleLog(
            "ESCAPE FAILED.",
            "bad"
        )


        enemyTurn()

        update()
    }
}


function victory() {

    const defeated =
        enemy


    player.xp += defeated.xp

    player.gold += defeated.gold


    battleLog(
        "TARGET DESTROYED.",
        "good"
    )


    battleLog(
        "XP +" +
        defeated.xp +
        " // GOLD +" +
        defeated.gold,
        "good"
    )


    enemy = null


    levelUp()

    update()


    setTimeout(function() {

        showScreen("mainScreen")

    }, 700)
}


function levelUp() {

    while (
        player.xp >= player.xpNeeded
    ) {

        player.xp -= player.xpNeeded

        player.level++

        player.maxHp += 20

        player.hp = player.maxHp

        player.attack += 4

        player.xpNeeded =
            Math.floor(
                player.xpNeeded * 1.5
            )


        log(
            "LEVEL UP! LEVEL " +
            player.level,
            "system"
        )


        log(
            "MAX HP +20 // ATTACK +4",
            "good"
        )
    }
}


function doJob(name, reward) {

    player.gold += reward


    log(
        "JOB COMPLETE: " + name,
        "good"
    )


    log(
        "PAYMENT RECEIVED: +" +
        reward +
        " GOLD",
        "good"
    )


    showScreen("mainScreen")
}


function quickRest() {

    if (
        player.hp >= player.maxHp
    ) {

        log(
            "You are already at full HP.",
            "system"
        )


        showScreen("mainScreen")

        return
    }


    const healing =
        Math.floor(
            player.maxHp * 0.25
        )


    player.hp += healing


    if (player.hp > player.maxHp) {
        player.hp = player.maxHp
    }


    log(
        "You took a quick rest.",
        "system"
    )


    log(
        "HP +" + healing,
        "good"
    )


    showScreen("mainScreen")
}


function fullRest() {

    if (
        player.hp >= player.maxHp
    ) {

        log(
            "You are already at full HP.",
            "system"
        )


        showScreen("mainScreen")

        return
    }


    const healing =
        player.maxHp - player.hp


    player.hp = player.maxHp


    log(
        "You completed a full recovery.",
        "system"
    )


    log(
        "HP +" + healing,
        "good"
    )


    showScreen("mainScreen")
}


/* CLASS BUTTONS */

document
    .querySelectorAll(".class-button")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                chooseClass(
                    button.dataset.class
                )

            }
        )

    })


/* MAIN BUTTONS */

document
    .getElementById("exploreButton")
    .addEventListener(
        "click",
        explore
    )


document
    .getElementById("workButton")
    .addEventListener(
        "click",
        function() {

            showScreen("workScreen")

        }
    )


document
    .getElementById("restButton")
    .addEventListener(
        "click",
        function() {

            showScreen("restScreen")

        }
    )


document
    .getElementById("characterButton")
    .addEventListener(
        "click",
        function() {

            showScreen("characterScreen")

        }
    )


/* BATTLE BUTTONS */

document
    .getElementById("attackButton")
    .addEventListener(
        "click",
        attackEnemy
    )


document
    .getElementById("skillButton")
    .addEventListener(
        "click",
        useSkill
    )


document
    .getElementById("defendButton")
    .addEventListener(
        "click",
        defend
    )


document
    .getElementById("potionButton")
    .addEventListener(
        "click",
        usePotion
    )


document
    .getElementById("runButton")
    .addEventListener(
        "click",
        runAway
    )


/* JOB BUTTONS */

document
    .querySelectorAll("[data-job]")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const name =
                    button.dataset.job


                const reward =
                    Number(
                        button.dataset.reward
                    )


                doJob(
                    name,
                    reward
                )

            }
        )

    })


/* REST BUTTONS */

document
    .getElementById("quickRestButton")
    .addEventListener(
        "click",
        quickRest
    )


document
    .getElementById("fullRestButton")
    .addEventListener(
        "click",
        fullRest
    )


/* BACK BUTTONS */

document
    .querySelectorAll("[data-back]")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                showScreen(
                    button.dataset.back
                )

            }
        )

    })


/* START */

log(
    "CYBER//RPG BOOT SEQUENCE READY.",
    "system"
)

update()
