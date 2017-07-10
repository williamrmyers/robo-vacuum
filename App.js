// Imports the config file
var fs = require('fs');
var configData = fs.readFileSync('input.txt').toString().split(/\n/);
var dirtPatchesCleaned = 0;
var directions;
var roomSize;
var startingPosition;
var dirt;
// Each of the steps made by the vacuum
var steps = [];
// Converts a single cardinal direction to a coordinate direction
function cardinalToCoordinate(input) {
    var x = 0;
    var y = 0;
    var coordinates = {};
    direction = input.toLowerCase();
    if (direction === 'n') {
        y += 1;
    } else if (direction === 's') {
        y -= 1;
    } else if (direction === 'w') {
        x -= 1;
    } else if (direction === 'e') {
        x += 1;
    };
    coordinates = {
        'x': x,
        'y': y
    };
    return coordinates;
};
// Takes a set of cordinates for a move, compares it with the last known location and returns the current location
// Here we make sure the moves are contained withing the bounds of the coordinate plane
function move(x, y) {
    var newX = steps.last()[0] + x;
    var newY = steps.last()[1] + y;
    //should use else if here no?
    if (steps.last()[0] + x > roomSize[0]) {
        newX = roomSize[0];
    }
    if (steps.last()[0] + x < 0) {
        newX = 0;
    }
    if (steps.last()[1] + y > roomSize[1]) {
        newY = roomSize[1];
    }
    if (steps.last()[1] + y < 0) {
        newY = 0;
    }
    return [newX, newY];
}
// Returns true if two arrays are equivalent
function equalArray(arr1, arr2) {
    var isSame = (arr1.length == arr2.length) && arr1.every(function(element, index) {
        return element === arr2[index];
    });
    return isSame;
}
// Returns the last item from an array
(function checkLast() {
    if (!Array.prototype.last) {
        Array.prototype.last = function() {
            return this[this.length - 1];
        };
    };
})();

// Converts the config data to number in an array for easier access
// The coordinates are stored in an array of arrays, X is stored in index 0 and Y in index 1
for (var i = 0; i < configData.length - 1; i++) {
    configData[i] = [Number(configData[i].split(' ')[0]), Number(configData[i].split(' ')[1])]
}
// The vacuum driving directions
directions = configData.last();
roomSize = configData[0];
startingPosition = configData[1];
dirt = configData.slice(2, -1); //patches of dirt
steps.push(startingPosition);

// Performs the moves with the move function, creating an array containing all of the moves made from the instructions
for (var a = 0; a < directions.length; a++) {
    steps.push(move(cardinalToCoordinate(directions.charAt(a)).x, cardinalToCoordinate(directions.charAt(a)).y))
}
// Compares the array of the positions of the "Dirt Piles" with the positions made by the vacuum.
// If a "Dirt Pile" is cleaned index 2 in dirt is marked to true
for (var c = 0; c < steps.length; c++) {
    for (var i = 0; i < dirt.length; i++) {
        if (equalArray(steps[c], dirt[i])) {
            dirt[i][2] = true;
        }
    }
}
// Counts the dirt cleaned
for (var i = 0; i < dirt.length; i++) {
    if (dirt[i][2]) {
        dirtPatchesCleaned++;
    }
}
console.log(steps.last()[0], steps.last()[1]);
console.log(dirtPatchesCleaned);
