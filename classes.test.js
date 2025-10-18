import util from 'util';
import {Ship, Gameboard, areDeeplyEqual} from './classes.js';

//to allow full width console out.


util.inspect.defaultOptions.breakLength = Infinity;
util.inspect.defaultOptions.maxArrayLength = null;

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
    const gameboard = new Gameboard();
    test('initializes grid correctly',()=>{
        result = gameboard.gridVisual;
        expected= [
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'] 
        ]
        expect(areDeeplyEqual(result,expected)).toBe(true);
    })
    test('grid updated correctly with ship added horizontally',()=>{
        gameboard.placeShip(4,[0,2],'right');
        result = gameboard.gridVisual;
        //result.forEach((line) => console.log(JSON.stringify(line)));
        expected= [
            ['0','0','X','X','X','X','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'] 
        ]
        expect(areDeeplyEqual(result,expected)).toBe(true);
    });
    test('grid updated correctly with ship added vertically',()=>{
        gameboard.placeShip(2,[3,9],'down');
        result = gameboard.gridVisual;
        //result.forEach((line) => console.log(JSON.stringify(line)));
        expected= [
            ['0','0','X','X','X','X','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','X'],
            ['0','0','0','0','0','0','0','0','0','X'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'] 
        ]
        expect(areDeeplyEqual(result,expected)).toBe(true);
    })

    test('error thrown when trying to place ship in an occupied spot.',()=>{
        expect(() => gameboard.placeShip(2,[3,9],'down')).toThrow();
    })

    test('check, after being unable to place ship, that the grid did not change.',()=>{
        result = gameboard.gridVisual;
        //result.forEach((line) => console.log(JSON.stringify(line)));
        expected= [
            ['0','0','X','X','X','X','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','X'],
            ['0','0','0','0','0','0','0','0','0','X'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'] 
        ]
        expect(areDeeplyEqual(result,expected)).toBe(true);
    })
})