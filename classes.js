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
        return grid
    }
    placeShip(size,startPoint,direction){
        //IMPORTANT: points are denoted by [y,x];
        //Check that the direction passed is valid
        if(!['right','down'].includes(direction))
            throw new Error('Wrong direction passed');
        //Check that the ship position does not go past
        //the gameboard boundaries, and does not superimpose 
        //with an existing ship

        //Depending on the given direction, we will either vary the x 
        // or the y coordinate
        const startX = startPoint[1];
        const startY = startPoint[0];
        const start = direction === 'right' ? startX : startY;
        let positions = [];
        for(let i = start; i < start + size ; i++){
            if(i < 0 || i > 9)
                return false;
            const p 
                = direction === 'right' 
                    ? [startY, i]
                    : [i, startX];
            if(! (this.grid[p[0]][p[1]] === undefined)){
                throw new Error("Another ship already exists there");
            }
            else
                positions.push(p);
        }
        const ship = new Ship(size);
        //console.log(positions);
        positions.forEach((ele) => this.grid[ele[0]][ele[1]] = ship);
        return true;

    }
    get gridVisual(){
        const visual = structuredClone(this.grid);
        for(let y = 0; y < visual.length ; y++){
            const horizontal = visual[y];
            for (let x = 0; x < horizontal.length ; x++)
                visual[y][x] = visual[y][x] === undefined ? '0' : 'X';
        }
        return visual;
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