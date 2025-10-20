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

//The next two sets of testing groups are done on the same game board.
const gameboard = new Gameboard();

describe('Gameboard', () => {

    test('initializes grid correctly',()=>{
        result = gameboard.formationGridVisual;
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
        expect(result).toEqual(expected);
    })
    test('grid updated correctly with ship added horizontally',()=>{
        gameboard.placeShip(4,[0,2],'right');
        result = gameboard.formationGridVisual;
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
        expect(result).toEqual(expected);
    });
    test('grid updated correctly with ship added vertically',()=>{
        gameboard.placeShip(2,[3,9],'down');
        result = gameboard.formationGridVisual;
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
        expect(result).toEqual(expected);
    })

    test('error thrown when trying to place ship in an occupied spot.',()=>{
        expect(() => gameboard.placeShip(2,[3,9],'down')).toThrow();
    })

    test('check, after being unable to place ship, that the grid did not change.',()=>{
        result = gameboard.formationGridVisual;
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
        expect(result).toEqual(expected);
        
    })
})

//This tests the receive attack method

describe("Receive attack" ,() => {
    test("hit grid should only have 1 hit", () => {
        gameboard.receiveAttack([6,0]);
        //gameboard.hitGridVisual.forEach((line) => console.log(JSON.stringify(line)));
        result = gameboard.hitGrid;
        expected =  [
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['X','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'] 
        ]
        expect(result).toEqual(expected);
    })

    test("hit grid visual correctly displaying 'missed' for previously hit area"
        , () => {
        result = gameboard.hitGridVisual;
        expected =  [
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['M','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'] 
        ]
        expect(result).toEqual(expected);
    })

    test("ship struck", () => {
        gameboard.receiveAttack([4,9]);
        result = gameboard.hitGridVisual;
        expected =  [
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','S'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['M','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'] 
        ]
        expect(result).toEqual(expected);
    });

    test("hit area previously attacked to not modify hit grid", () => {
        gameboard.receiveAttack([4,9]);
        gameboard.receiveAttack([6,0])
        result = gameboard.hitGridVisual;
        expected =  [
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','S'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['M','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'] 
        ]
        expect(result).toEqual(expected);
    });

    test("hit ship to sink it", () => {
        gameboard.receiveAttack([3,9]);
        result = gameboard.hitGridVisual;
        expected =  [
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','X'],
            ['0','0','0','0','0','0','0','0','0','X'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['M','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0'] 
        ]
        expect(result).toEqual(expected);
    })

    test("correctly report that not all ships are sunk", () => {
        expect(gameboard.allShipsSunk()).toBe(false);
    })

    test("correctly report that all ships are sunk", () => {
        gameboard.receiveAttack([0,2]);
        gameboard.receiveAttack([0,3]);
        gameboard.receiveAttack([0,4]);
        gameboard.receiveAttack([0,5]);

        expect(gameboard.allShipsSunk()).toBe(true);
    })
})
