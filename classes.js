//This file contains the classes used in the application, including:
// Ship
// Gameboard
// Player
// Bot
// Game


class Ship{
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.isShipSunk = false;
    }
    hit(){
        ++this.hits;
    }
    isSunk(){
        this.isShipSunk = this.hits >= this.length ? true : false;
        return this.isShipSunk;
    }
}

class Gameboard{
    constructor(){
        this.grid = this.initialize();
    }
    initialize(){
        let grid = new Array();
        for(let i = 0; i<10 ; i++)
           grid.push(new Array(10));
        console.log(grid);
        return grid
    }
    placeShip(){

    }
}

function areDeeplyEqual(arr1, arr2){
    //check if both parameters are arrays
    if (!(Array.isArray(arr1)) || !(Array.isArray(arr2)))
        return false;
    //check if both arrays have the same length
    if (!(arr1.length === arr2.length))
        return false;
    //check if elements of both arrays are equal
    for (let i = 0; i < arr1.length ; i++){
        if((Array.isArray(arr1[i])) && (Array.isArray(arr2[i]))){
            if(!areDeeplyEqual(arr1[i],arr2[i]))
                return false;
        }
        else if(arr1[i] !== arr2[i])
            return false
    }
    return true;
}

export {Ship, Gameboard, areDeeplyEqual};