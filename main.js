const web = new WebView()

const html = `
<!DOCTYPE html>
<html>
<head>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    background:
        radial-gradient(circle at top, #17203d 0%, #080914 45%, #03040a 100%);
    color: #e8faff;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    min-height: 100vh;
}

body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background:
        linear-gradient(rgba(0,255,255,0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,255,0.035) 1px, transparent 1px);
    background-size: 28px 28px;
}

#app {
    width: 100%;
    max-width: 700px;
    margin: auto;
    padding: 16px;
    position: relative;
}

.header {
    border: 1px solid #00f6ff;
    background: rgba(4,12,28,0.95);
    box-shadow:
        0 0 8px #00f6ff,
        inset 0 0 20px rgba(0,246,255,0.08);
    padding: 18px;
    margin-bottom: 14px;
}

.title {
    font-size: 27px;
    font-weight: 900;
    color: #00f6ff;
    text-shadow:
        0 0 5px #00f6ff,
        0 0 15px #00f6ff;
    letter-spacing: 3px;
}

.subtitle {
    color: #ff00e6;
    font-size: 10px;
    margin-top: 5px;
    letter-spacing: 2px;
}

.panel {
    background: rgba(6,10,24,0.94);
    border: 1px solid #263e65;
    padding: 15px;
    margin-bottom: 14px;
    box-shadow:
        0 0 8px rgba(0,246,255,0.12),
        inset 0 0 20px rgba(0,246,255,0.025);
}

.panel-title {
    color: #00f6ff;
    font-size: 12px;
    letter-spacing: 2px;
    margin-bottom: 12px;
}

.center {
    text-align: center;
}

.big-title {
    color: #00f6ff;
    font-size: 30px;
    font-weight: 900;
    text-shadow:
        0 0 8px #00f6ff,
        0 0 20px #00f6ff;
    margin-bottom: 8px;
}

.neon-pink {
    color: #ff00e6;
    text-shadow: 0 0 10px #ff00e6;
}

.neon-green {
    color: #7cff00;
    text-shadow: 0 0 10px #7cff00;
}

.neon-yellow {
    color: #ffe600;
    text-shadow: 0 0 10px #ffe600;
}

.stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px;
}

.stat {
    border-left: 3px solid #00f6ff;
    background: rgba(0,246,255,0.04);
    padding: 9px;
}

.stat-name {
    font-size: 10px;
    color: #718aa8;
    letter-spacing: 1px;
}

.stat-value {
    font-size: 18px;
    color: white;
    margin-top: 3px;
}

.hp {
    color: #ff3b81;
    text-shadow: 0 0 8px #ff3b81;
}

.xp {
    color: #b86cff;
    text-shadow: 0 0 8px #b86cff;
}

.gold {
    color: #ffe600;
    text-shadow: 0 0 8px #ffe600;
}

.bar {
    width: 100%;
    height: 8px;
    background: #101523;
    margin-top: 6px;
}

.bar-fill {
    height: 100%;
    transition: width 0.25s;
}

.hp-fill {
    background: #ff285c;
    box-shadow: 0 0 8px #ff285c;
}

.xp-fill {
    background: #a855ff;
    box-shadow: 0 0 8px #a855ff;
}

button {
    width: 100%;
    border: 1px solid #00f6ff;
    background: rgba(0,246,255,0.06);
    color: #00f6ff;
    padding: 14px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    border-radius: 2px;
    box-shadow: 0 0 7px rgba(0,246,255,0.3);
}

button:active {
    background: #00f6ff;
    color: #03040a;
    box-shadow:
        0 0 10px #00f6ff,
        0 0 25px #00f6ff;
}

.class-button {
    padding: 18px;
    text-align: left;
}

.class-name {
    font-size: 20px;
    font-weight: bold;
}

.class-description {
    color: #718aa8;
    font-size: 12px;
    margin-top: 5px;
}

.warrior {
    border-color: #ff285c;
    color: #ff285c;
}

.rogue {
    border-color: #7cff00;
    color: #7cff00;
}

.mage {
    border-color: #a855ff;
    color: #b86cff;
}

.attack-button {
    border-color: #ff285c;
    color: #ff285c;
}

.skill-button {
    border-color: #a855ff;
    color: #b86cff;
}

.defend-button {
    border-color: #00f6ff;
    color: #00f6ff;
}

.potion-button {
    border-color: #7cff00;
    color: #7cff00;
}

.run-button {
    border-color: #ffe600;
    color: #ffe600;
}

.work-button {
    border-color: #ffe600;
    color: #ffe600;
}

.rest-button {
    border-color: #7cff00;
    color: #7cff00;
}

.job {
    border: 1px solid #263e65;
    padding: 13px;
    margin-bottom: 8px;
    background: rgba(0,0,0,0.2);
}

.job-name {
    color: #ffe600;
    font-weight: bold;
}

.job-description {
    color: #718aa8;
    font-size: 11px;
    margin-top: 4px;
}

.enemy-box {
    border: 1px solid #ff285c;
    padding: 18px;
    text-align: center;
    box-shadow:
        0 0 12px rgba(255,40,92,0.3),
        inset 0 0 20px rgba(255,40,92,0.05);
}

.enemy-name {
    color: #ff285c;
    font-size: 24px;
    font-weight: bold;
    text-shadow: 0 0 10px #ff285c;
}

.enemy-hp {
    color: #ff9ab2;
    margin-top: 8px;
}

.log {
    height: 160px;
    overflow-y: auto;
    background: #020308;
    border: 1px solid #17233d;
    padding: 10px;
    font-family: monospace;
    font-size: 12px;
}

.log-line {
    margin-bottom: 7px;
    color: #9cb5d5;
}

.log-line.system {
    color: #00f6ff;
}

.log-line.good {
    color: #7cff00;
}

.log-line.bad {
    color: #ff285c;
}

.screen {
    display: none;
}

.screen.active {
    display: block;
}

.back {
    border-color: #526987;
    color: #7891ad;
}

.footer {
    text-align: center;
    color: #334967;
    font-size: 9px;
    letter-spacing: 2px;
    padding: 12px;
}

</style>
</head>

<body>

<div id="app">

    <div class="header">

        <div class="title">
            CYBER//RPG
        </div>

        <div class="subtitle">
            NEON DISTRICT // SYSTEM ONLINE
        </div>

    </div>


    <div id="startScreen" class="screen active">

        <div class="panel center">

            <div class="big-title">
                CHOOSE YOUR CLASS
            </div>

            <div style="color:#718aa8;font-size:12px;margin-bottom:18px;">
                Your class determines your combat style.
            </div>

            <button class="class-button warrior" onclick="chooseClass('Warrior')">

                <div class="class-name">
                    ⚔ WARRIOR
                </div>

                <div class="class-description">
                    High HP and powerful physical attacks.
                </div>

            </button>


            <button class="class-button rogue" onclick="chooseClass('Rogue')">

                <div class="class-name">
                    ◈ ROGUE
                </div>

                <div class="class-description">
                    Fast attacks with a chance to deal critical damage.
                </div>

            </button>


            <button class="class-button mage" onclick="chooseClass('Mage')">

                <div class="class-name">
                    ✦ MAGE
                </div>

                <div class="class-description">
                    Lower HP, but devastating energy abilities.
                </div>

            </button>

        </div>

    </div>


    <div id="mainScreen" class="screen">

        <div class="panel">

            <div class="panel-title">
                PLAYER STATUS
            </div>

            <div class="stats">

                <div class="stat">
                    <div class="stat-name">CLASS</div>
                    <div class="stat-value" id="className">
                        -
                    </div>
                </div>

                <div class="stat">
                    <div class="stat-name">LEVEL</div>
                    <div class="stat-value" id="level">
                        1
                    </div>
                </div>

                <div class="stat">

                    <div class="stat-name">
                        HP
                    </div>

                    <div class="stat-value hp">
                        <span id="hp">100</span>/<span id="maxHp">100</span>
                    </div>

                    <div class="bar">
                        <div class="bar-fill hp-fill" id="hpBar"></div>
                    </div>

                </div>

                <div class="stat">

                    <div class="stat-name">
                        ATTACK
                    </div>

                    <div class="stat-value" id="attack">
                        10
                    </div>

                </div>

                <div class="stat">

                    <div class="stat-name">
                        GOLD
                    </div>

                    <div class="stat-value gold" id="gold">
                        25
                    </div>

                </div>

                <div class="stat">

                    <div class="stat-name">
                        POTIONS
                    </div>

                    <div class="stat-value neon-green" id="potions">
                        3
                    </div>

                </div>

            </div>

            <div style="margin-top:10px;">

                <div class="stat-name">
                    EXPERIENCE
                </div>

                <div class="stat-value xp">
                    <span id="xp">0</span>/<span id="xpNeeded">100</span>
                </div>

                <div class="bar">
                    <div class="bar-fill xp-fill" id="xpBar"></div>
                </div>

            </div>

        </div>


        <div class="panel">

            <div class="panel-title">
                NEON DISTRICT
            </div>

            <div class="neon-pink">
                ◆ CITY SECTOR 01
            </div>

            <div style="color:#607a9a;font-size:12px;margin-top:6px;">
                Rain falls through the neon lights.
                Explore the district and discover what is waiting.
            </div>

            <button onclick="explore()">
                EXPLORE
            </button>

        </div>


        <div class="panel">

            <div class="panel-title">
                ACTIVITIES
            </div>

            <button class="work-button" onclick="showScreen('workScreen')">
                WORK
            </button>

            <button class="rest-button" onclick="showScreen('restScreen')">
                REST
            </button>

            <button onclick="showScreen('characterScreen')">
                CHARACTER
            </button>

        </div>


        <div class="panel">

            <div class="panel-title">
                SYSTEM LOG
            </div>

            <div class="log" id="log"></div>

        </div>

    </div>


    <div id="battleScreen" class="screen">

        <div class="panel">

            <div class="panel-title">
                ⚠ COMBAT MODE
            </div>

            <div class="enemy-box">

                <div class="enemy-name" id="enemyName">
                    ENEMY
                </div>

                <div class="enemy-hp">
                    HP:
                    <span id="enemyHp">0</span>
                </div>

                <div class="bar">

                    <div
                        class="bar-fill hp-fill"
                        id="enemyHpBar">
                    </div>

                </div>

            </div>

        </div>


        <div class="panel">

            <div class="panel-title">
                YOUR STATUS
            </div>

            <div class="stats">

                <div class="stat">

                    <div class="stat-name">
                        HP
                    </div>

                    <div class="stat-value hp">
                        <span id="battleHp">
                            100
                        </span>/<span id="battleMaxHp">
                            100
                        </span>
                    </div>

                </div>

                <div class="stat">

                    <div class="stat-name">
                        ATTACK
                    </div>

                    <div class="stat-value">
                        <span id="battleAttack">
                            10
                        </span>
                    </div>

                </div>

            </div>

        </div>


        <div class="panel">

            <div class="panel-title">
                COMBAT ACTIONS
            </div>

            <button class="attack-button" onclick="attackEnemy()">
                ATTACK
            </button>

            <button class="skill-button" onclick="useSkill()">
                CLASS SKILL
            </button>

            <button class="defend-button" onclick="defend()">
                DEFEND
            </button>

            <button class="potion-button" onclick="usePotion()">
                USE POTION
            </button>

            <button class="run-button" onclick="runAway()">
                RUN AWAY
            </button>

        </div>


        <div class="panel">

            <div class="panel-title">
                BATTLE LOG
            </div>

            <div class="log" id="battleLog"></div>

        </div>

    </div>


    <div id="workScreen" class="screen">

        <div class="panel">

            <div class="panel-title">
                ◆ JOB TERMINAL
            </div>

            <div class="neon-yellow">
                SELECT A JOB
            </div>

            <div style="color:#607a9a;font-size:12px;margin-top:6px;">
                Complete jobs to earn credits.
            </div>

        </div>


        <div class="panel">

            <div class="job">

                <div class="job-name">
                    DATA ENTRY
                </div>

                <div class="job-description">
                    Easy work. Small payment.
                </div>

                <button onclick="doJob('Data Entry', 8)">
                    WORK — +8 GOLD
                </button>

            </div>


            <div class="job">

                <div class="job-name">
                    TECH REPAIR
                </div>

                <div class="job-description">
                    Repair damaged cybernetic equipment.
                </div>

                <button onclick="doJob('Tech Repair', 15)">
                    WORK — +15 GOLD
                </button>

            </div>


            <div class="job">

                <div class="job-name">
                    NIGHT COURIER
                </div>

                <div class="job-description">
                    Deliver a package through dangerous streets.
                </div>

                <button onclick="doJob('Night Courier', 22)">
                    WORK — +22 GOLD
                </button>

            </div>


            <div class="job">

                <div class="job-name">
                    CORPORATE SECURITY
                </div>

                <div class="job-description">
                    Protect a corporation's valuable data.
                </div>

                <button onclick="doJob('Corporate Security', 35)">
                    WORK — +35 GOLD
                </button>

            </div>

        </div>


        <button class="back" onclick="showScreen('mainScreen')">
            ← BACK
        </button>

    </div>


    <div id="restScreen" class="screen">

        <div class="panel center">

            <div class="big-title">
                REST TERMINAL
            </div>

            <div style="color:#718aa8;font-size:12px;">
                Recover your HP and prepare for your next mission.
            </div>

        </div>


        <div class="panel">

            <div class="job">

                <div class="job-name neon-green">
                    QUICK REST
                </div>

                <div class="job-description">
                    Take a short break.
                </div>

                <button onclick="quickRest()">
                    REST — RECOVER 25% HP
                </button>

            </div>


            <div class="job">

                <div class="job-name neon-green">
                    FULL RECOVERY
                </div>

                <div class="job-description">
                    Spend time fully recovering.
                </div>

                <button onclick="fullRest()">
                    RECOVER TO FULL HP
                </button>

            </div>

        </div>


        <button class="back" onclick="showScreen('mainScreen')">
            ← BACK
        </button>

    </div>


    <div id="characterScreen" class="screen">

        <div class="panel">

            <div class="panel-title">
                CHARACTER DATA
            </div>

            <div id="characterInfo"></div>

        </div>

        <button class="back" onclick="showScreen('mainScreen')">
            ← BACK
        </button>

    </div>


    <div class="footer">
        CYBER//RPG ENGINE
    </div>

</div>


<script>

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

    document
        .getElementById(id)
        .classList.add("active")

    update()
}


function chooseClass(className) {

    const selected = classes[className]

    player.class = className
    player.maxHp = selected.hp
    player.hp = selected.hp
    player.attack = selected.attack

    document.getElementById("className")
        .textContent = className

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

    let hpPercent =
        (player.hp / player.maxHp) * 100

    document.getElementById("hpBar")
        .style.width = hpPercent + "%"

    let xpPercent =
        (player.xp / player.xpNeeded) * 100

    document.getElementById("xpBar")
        .style.width = xpPercent + "%"

    document.getElementById("battleHp")
        .textContent = player.hp

    document.getElementById("battleMaxHp")
        .textContent = player.maxHp

    document.getElementById("battleAttack")
        .textContent = player.attack

    updateCharacter()

    updateBattle()
}


function updateBattle() {

    if (enemy === null) {
        return
    }

    document.getElementById("enemyName")
        .textContent = enemy.name

    document.getElementById("enemyHp")
        .textContent = Math.max(0, enemy.hp)

    let percent =
        (enemy.hp / enemy.maxHp) * 100

    document.getElementById("enemyHpBar")
        .style.width = Math.max(0, percent) + "%"
}


function updateCharacter() {

    document.getElementById("characterInfo")
        .innerHTML =

        "<div class='stats'>" +

        "<div class='stat'>" +
        "<div class='stat-name'>CLASS</div>" +
        "<div class='stat-value'>" +
        player.class +
        "</div>" +
        "</div>" +

        "<div class='stat'>" +
        "<div class='stat-name'>LEVEL</div>" +
        "<div class='stat-value'>" +
        player.level +
        "</div>" +
        "</div>" +

        "<div class='stat'>" +
        "<div class='stat-name'>HP</div>" +
        "<div class='stat-value hp'>" +
        player.hp +
        "/" +
        player.maxHp +
        "</div>" +
        "</div>" +

        "<div class='stat'>" +
        "<div class='stat-name'>ATTACK</div>" +
        "<div class='stat-value'>" +
        player.attack +
        "</div>" +
        "</div>" +

        "<div class='stat'>" +
        "<div class='stat-name'>XP</div>" +
        "<div class='stat-value xp'>" +
        player.xp +
        "/" +
        player.xpNeeded +
        "</div>" +
        "</div>" +

        "<div class='stat'>" +
        "<div class='stat-name'>GOLD</div>" +
        "<div class='stat-value gold'>" +
        player.gold +
        "</div>" +
        "</div>" +

        "</div>" +

        "<div style='margin-top:15px;color:#a855ff;'>" +
        "CLASS SKILL: " +
        classes[player.class].skill +
        "</div>"
}


function log(message, type) {

    let box =
        document.getElementById("log")

    let line =
        document.createElement("div")

    line.className =
        "log-line " + (type || "")

    line.textContent =
        "> " + message

    box.appendChild(line)

    box.scrollTop =
        box.scrollHeight
}


function battleLog(message, type) {

    let box =
        document.getElementById("battleLog")

    let line =
        document.createElement("div")

    line.className =
        "log-line " + (type || "")

    line.textContent =
        "> " + message

    box.appendChild(line)

    box.scrollTop =
        box.scrollHeight
}


function explore() {

    if (enemy !== null) {

        showScreen("battleScreen")

        return
    }

    let chosen =
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

    battleLog(
        "TARGET DETECTED: " +
        enemy.name,
        "bad"
    )

    battleLog(
        "COMBAT PROTOCOL INITIATED.",
        "system"
    )

    showScreen("battleScreen")

    update()
}


function enemyTurn() {

    if (enemy === null) {
        return
    }

    let damage =
        enemy.attack +
        Math.floor(Math.random() * 4)

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

        showScreen("mainScreen")
    }
}


function attackEnemy() {

    if (enemy === null) {
        return
    }

    let damage =
        player.attack +
        Math.floor(Math.random() * 6)

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

    if (enemy === null) {
        return
    }

    let damage = 0

    if (player.class === "Warrior") {

        damage =
            player.attack * 2 +
            Math.floor(Math.random() * 8)

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
            Math.floor(Math.random() * 10)

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

    if (enemy === null) {
        return
    }

    player.defending = true

    battleLog(
        "You entered defensive mode.",
        "system"
    )

    enemyTurn()

    update()
}


function usePotion() {

    if (enemy === null) {
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

    let healing =
        Math.floor(player.maxHp * 0.35)

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

    if (enemy === null) {
        return
    }

    if (Math.random() < 0.7) {

        battleLog(
            "ESCAPE SUCCESSFUL.",
            "good"
        )

        enemy = null

        showScreen("mainScreen")

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

    let defeated = enemy

    player.xp += defeated.xp

    player.gold += defeated.gold

    enemy = null

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

    levelUp()

    setTimeout(function() {
        showScreen("mainScreen")
    }, 500)

    update()
}


function levelUp() {

    while (player.xp >= player.xpNeeded) {

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
            "HP +20 // ATTACK +4",
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

    update()
}


function quickRest() {

    if (player.hp >= player.maxHp) {

        log(
            "You are already at full HP.",
            "system"
        )

        showScreen("mainScreen")

        return
    }

    let healing =
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

    update()
}


function fullRest() {

    if (player.hp >= player.maxHp) {

        log(
            "You are already at full HP.",
            "system"
        )

        showScreen("mainScreen")

        return
    }

    let healing =
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

    update()
}


log(
    "SYSTEM READY.",
    "system"
)

</script>

</body>
</html>
`

await web.loadHTML(html)
await web.present()
