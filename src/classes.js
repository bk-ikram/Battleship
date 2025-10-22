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
        return true;
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
        //initialize hit report
        let hitReport = {
            landedHit: false
            ,successfulHit: false
        };
        //Hits are stored on the hit grid.
        const X = point[1];
        const Y = point[0];
        //If the area has already received an attack, return false
        if(! (this.hitGrid[Y][X] === '0'))
            return hitReport;
        hitReport.landedHit = true;
        //Register the hit
        this.hitGrid[Y][X] = 'X';
        //Check if ship is in hit area
        const ship = this.formationGrid[Y][X];
        //If a ship is in the area, it receives a hit
        if(!(ship === undefined))
            hitReport.successfulHit = ship.hit();
        return hitReport;
            
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

class Game{
    constructor(){
        this.humanPlayer = new Player('Human')
        this.computerPlayer = new Player('Computer')
        this.currentPlayer = this.humanPlayer
        this.gameOver = false
    }
    playTurn(point){
        let hitReport = undefined;
        if(this.isPlayerTurn()){
            hitReport = this.computerPlayer.gameboard.receiveAttack(point);
        }
        else
            hitReport = this.computerTurn();

        //check if the game is over
        if(this.humanPlayer.gameboard.allShipsSunk() || this.computerPlayer.gameboard.allShipsSunk()){
            this.gameOver = true;
            return;
        }
        //if the hit was not successful, it is the other player's turn.
        if(!hitReport.successfulHit)
            this.currentPlayer = !this.isPlayerTurn() ?  this.humanPlayer : this.computerPlayer;
    }

    computerTurn(){
        //implement computer playing logic. Should return true/false
        //attempt to hit human player's board. If chosen point is in a previously hit 
        //area, attempt again.
        let landedHit = false;
        let hitReport = undefined;
        while (! landedHit){
            hitReport = this.humanPlayer.gameboard.receiveAttack([getRandomCoordinate(),getRandomCoordinate()]);
            landedHit = hitReport.landedHit;
        }
        return hitReport;
    }
    
    isPlayerTurn(){
        return this.currentPlayer === this.humanPlayer;
    }
}

class ScreenController{
    constructor(){
        this.playerGridDiv = document.querySelector("#player-grid")
        this.enemyGridDiv = document.querySelector("#enemy-grid")
        this.init()
        this.game = new Game()
        this.playerBoard = this.game.humanPlayer.gameboard
        this.enemyBoard = this.game.computerPlayer.gameboard
    }

    init(){
        //initialize the grids
        [this.playerGridDiv,this.enemyGridDiv]
            .forEach((grid)=>this.initEmptyGrid(grid));
        //add event listeners
        this.initEventListener(this.enemyGridDiv);
    }
    initEmptyGrid(grid){
        for(let y = 0; y < 10 ; y++ ){
            for(let x = 0; x < 10 ; x++ ){
                const cell = document.createElement('div');
                cell.dataset.y = y;
                cell.dataset.x = x;
                cell.style.background = 'white';
                grid.appendChild(cell);
            }
        }
    }
    initEventListener(grid){
        grid.addEventListener((e) => {
            const [y,x] = [e.target.dataset.y,e.target.dataset.x]
        })
        this.game.playTurn([y,x]);
        [this.playerBoard,this.enemyBoard]
            .forEach((grid) => this.render(grid));
    }

    render(grid){
        for(let y = 0; y < 10 ; y++ ){
            for(let x = 0; x < 10 ; x++ ){
                const status = grid[y][x];
                if(status === '0')
                    continue;
                const gridDiv =""
                const div = "";
            }
        }
        return
    }




}
function getRandomCoordinate(){
    return maxSatisfying.floor(Math.random() * 10);
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

export {Ship, Gameboard,ScreenController, areDeeplyEqual};