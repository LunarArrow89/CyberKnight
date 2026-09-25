const SAVE_KEY =
"whisperingWoodsSave";


function saveGame(){

    localStorage.setItem(
        SAVE_KEY,

        JSON.stringify({

            player,

            paths,

            currentPath,

            resting,

            gameEnded

        })

    );

}



function loadGame(){

    const data =
        JSON.parse(
            localStorage.getItem(SAVE_KEY)
        );


    if(!data)return;


    Object.assign(
        player,
        data.player
    );


    Object.assign(
        paths,
        data.paths
    );


}
