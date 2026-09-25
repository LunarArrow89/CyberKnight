const enemies = [

    {
        name:"Lost Wolf",
        hp:18,
        attack:12,
        xp:12,
        gold:5
    },

    {
        name:"Forest Goblin",
        hp:22,
        attack:10,
        xp:15,
        gold:7
    },

    {
        name:"Shadow Spider",
        hp:15,
        attack:13,
        xp:18,
        gold:8
    }

];



function startBattle(){

    const enemy =
        enemies[
            Math.floor(
                Math.random()*enemies.length
            )
        ];


    const damageTaken =
        Math.max(
            0,
            enemy.attack -
            player.attack
        );


    if(damageTaken <= 0){

        addLog(
            `You defeated ${enemy.name}.`
        );


        player.gold += enemy.gold;


        giveXP(enemy.xp);

    }


    else {


        player.hp -= damageTaken;


        addLog(
            `${enemy.name} attacked you for ${damageTaken} damage.`
        );


        if(player.hp <= 0){

            player.hp = 0;


            addLog(
                `${enemy.name} defeated you.`
            );


            startRest(true);

        }

    }


    updateHP();

    updateGold();

}
