'use strict';

var directions = [ 'east', 'west', 'north', 'south' ];

function Robot() {
  // implement your solution here!
  this.bearing = "north"
  this.coordinates = [0,0]

  this.orient = function(currentDirection) {
    if (directions.includes(currentDirection)) {
      this.bearing = currentDirection
    } else {
      throw new Error("Invalid Robot Bearing")
    }
  } //end

  this.turnRight = function() {
    var directions = ['east', 'south', 'west', 'north'];
    let curr_index = directions.indexOf(this.bearing)
    curr_index === 3 ? (this.bearing = directions[0]) : (this.bearing = directions[curr_index + 1])
  } //end

  this.turnLeft = function() {
    var directions = ['east', 'south', 'west', 'north'];
    let curr_index = directions.indexOf(this.bearing)
    curr_index === 0 ? (this.bearing = directions[3]) : (this.bearing = directions[curr_index - 1])
  } //end

  this.at = function(x, y) {
    this.coordinates = [x, y];
  } //end

  this.advance = function() {
    let orientation = this.bearing
    let x = this.coordinates[0]
    let y = this.coordinates[1]
    switch (orientation) {

      case "east":
        this.coordinates = [x+1, y]
        break;
      case "south":
        this.coordinates = [x, y-1]
        break;
      case "west":
        this.coordinates = [x-1, y]
        break;
      case "north":
        this.coordinates = [x, y+1]
        break;
    }
  } //end

  this.instructions = function(inst) {
    let instructions = []
    for (const letter of inst) {
      switch (letter) {
        case "L":
          instructions.push("turnLeft")
          break;
        case "R":
          instructions.push("turnRight")
          break;
        case "A":
          instructions.push("advance")
          break;
      }
    }
    return instructions;
  } //end

  this.place = function(inst) {
    this.bearing = inst["direction"]
    this.coordinates = [inst["x"], inst["y"]]
  } //end

  this.evaluate = function (inst) {
    const instArray = this.instructions(inst)
    instArray.forEach(function(instruction) {
      eval(`this.${instruction}()`)
    }.bind(this))
  }//end

}

var robot = new Robot();
