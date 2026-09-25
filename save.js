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

    const saved =
        localStorage.getItem(SAVE_KEY);

    if(!saved) return;

    try {
        const data = JSON.parse(saved);

        Object.assign(
            player,
            data.player
        );

        Object.assign(
            paths,
            data.paths
        );

        if(typeof data.currentPath === "string"){
            currentPath = data.currentPath;
        }

        resting = Boolean(data.resting);
        gameEnded = Boolean(data.gameEnded);
    } catch(e) {
        console.error("Failed to load game:", e);
        localStorage.removeItem(SAVE_KEY);
    }

}
