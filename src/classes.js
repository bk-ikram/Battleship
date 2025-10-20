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
        this.formationGrid = this.initialize(undefined);
        this.hitGrid = this.initialize('0');
        this.ships = [];
    }
    initialize(fillValue){
        let grid = new Array();
        for(let i = 0; i<10 ; i++)
           grid.push((new Array(10)).fill(fillValue));
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
            if(! (this.formationGrid[p[0]][p[1]] === undefined)){
                throw new Error("Another ship already exists there");
            }
            else
                positions.push(p);
        }
        const ship = new Ship(size);
        this.ships.push(ship);
        //console.log(positions);
        positions.forEach((ele) => this.formationGrid[ele[0]][ele[1]] = ship);
        return true;

    }
    get formationGridVisual(){
        const visual = structuredClone(this.formationGrid);
        for(let y = 0; y < visual.length ; y++){
            const horizontal = visual[y];
            for (let x = 0; x < horizontal.length ; x++)
                visual[y][x] = visual[y][x] === undefined ? '0' : 'X';
        }
        return visual;
    }

    receiveAttack(point){
        //Hits are stored on the hit grid.
        const X = point[1];
        const Y = point[0];
        //If the area has already received an attack, return false
        if(! (this.hitGrid[Y][X] === '0'))
            return false
        //Register the hit
        this.hitGrid[Y][X] = 'X';
        //Check if ship is in hit area
        const ship = this.formationGrid[Y][X];
        //If a ship is in the area, it receives a hit
        if(!(ship === undefined))
            ship.hit();
    }

    get hitGridVisual(){
        //The hit grid visual can contain one of the following values:
        // 0 => no strike yet
        // M => Miss
        // S => ship struck, but not sunk
        // X => ship has been sunk
        const visual = structuredClone(this.hitGrid);
        for(let y = 0; y < visual.length ; y++){
            const horizontal = visual[y];
            for (let x = 0; x < horizontal.length ; x++){
                const ship = this.formationGrid[y][x];
                if(visual[y][x] === '0')
                    continue;
                if(ship === undefined)
                    visual[y][x] = 'M';
                else
                    visual[y][x] = ship.isSunk() ? 'X' : 'S';
            }
        }
        return visual;
    }

    allShipsSunk(){
        return this.ships.every((ship) => ship.isSunk())
    }
}

class Player{
    constructor(type){
        this.type = type;
        this.gameboard = new Gameboard();
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