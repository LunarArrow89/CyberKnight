function tick(){

    if(
        !resting &&
        !gameEnded
    ){

        updatePath();

    }


    updateRest();

    saveGame();

}



loadGame();


setInterval(
    tick,
    1000
);
