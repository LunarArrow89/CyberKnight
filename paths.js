const paths = {


    forest: {

        name:"Whispering Woods",

        progress:0,

        duration:300,

        encounterTime:45

    },


    cave: {

        name:"Crystal Cave",

        progress:0,

        duration:420,

        encounterTime:60

    }


};



let currentPath="forest";



function updatePath(){

    const path =
        paths[currentPath];


    path.progress++;


    if(
        path.progress >=
        path.duration
    ){

        finishPath();

    }


    if(
        path.progress >=
        path.encounterTime
    ){

        startBattle();


        path.encounterTime =
            path.progress +
            randomEncounterTime();

    }


    updateForest();

}



function randomEncounterTime(){

    return (
        30 +
        Math.floor(
            Math.random()*31
        )
    );

}



function finishPath(){

    addLog(
        `${paths[currentPath].name} completed!`
    );

}
