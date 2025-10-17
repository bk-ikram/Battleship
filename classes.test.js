import {Ship, Gameboard, areDeeplyEqual} from './classes.js';

describe('Ship', () => {
    const ship = new Ship(4);
    test('correctly reports not sunk when hit fewer times than its length' ,() => {
        ship.hit();
        ship.hit();
        const result = ship.isSunk();
        expect(result).toBe(false);
    });
    test('correctly reports not sunk when hit equal or more times to its length' ,() => {
        ship.hit();
        ship.hit();
        const result = ship.isSunk();
        expect(result).toBe(true);
        ship.hit();
        const result2 = ship.isSunk();
        expect(result2).toBe(true);
    });
})

describe('Gameboard', () => {
    test('initializes grid with correct ship placements',()=>{
        const gameboard = new Gameboard();
        gameboard.placeShip(4,[0,2],'right');
        result = gameboard.grid;
        expected= [
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined] 
        ]
        
    })
})