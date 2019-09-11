"use strict"
// These are two const for the random number of cells and how many bombs their are 
let bombs = 40;
let size = 17;

document.getElementById("avg").onclick = function () {
    document.getElementsByClassName("norm").style.display = block;
    document.getElementsByClassName("hard").style.display = none;
}
document.getElementById("difficult").onclick = function () {
    document.getElementsByClassName("hard").style.display = block;
    document.getElementsByClassName("norm").style.display = none;
}
// This makes the cell class 
class Cell {
    //This constructor makes this class an object with the parameters of row and columns 
    constructor(row, column) {
        this.row = row
        this.column = column
        this.mine = false
        this.neighborMines = 0
        this.open = false
        this.flag = false
    }
}
// This class is to help build the size of a board
class Board {
    constructor(size, bombs) {
        this.size = size
        this.bombs = bombs
        this.open = 0
        for (let row = 0; row < size; row++) {
            for (let column = 0; column < size; column++) {
                this[row + " " + column] = new Cell(row, column)
            }
        }
    }
    // This resets the random variables and resizes the board by resizing the rows and columns
    refresh() {
        this.open = 0
        for (let row = 0; row < size; row++) {
            for (let column = 0; column < size; column++) {
                this[row + " " + column].open = false
                this[row + " " + column].mine = false
                this[row + " " + column].flag = false
                this[row + " " + column].neighborMines = 0
            }
        }
        this.assignMines()
    }

    // This is called above every time the board is reset 
    assignMines() {
        // This is to define the bombs that are referenced in other classes
        let bombs = this.bombs
        while (bombs > 0) {
            //this makes random where the bombs go
            let row = Math.floor(Math.random() * this.size)
            let column = Math.floor(Math.random() * this.size)
            if (!this[row + " " + column].mine) {
                this[row + " " + column].mine = true
                // this gets the next function that is made
                let neighbors = this.getNeighbors(row, column)
                for (let cell of neighbors) {
                    cell.neighborMines += 1
                }
                bombs -= 1
            }
        }
    }
    //this finds the neighbors of a cell by looking at the different cells around it by taking away one from the columns or rows parameters
    getNeighbors(row, column) {
        let neighbors = []
        neighbors.push(this[(row - 1) + " " + (column - 1)])
        neighbors.push(this[(row - 1) + " " + (column)])
        neighbors.push(this[(row - 1) + " " + (column + 1)])
        neighbors.push(this[(row) + " " + (column - 1)])
        neighbors.push(this[(row) + " " + (column + 1)])
        neighbors.push(this[(row + 1) + " " + (column - 1)])
        neighbors.push(this[(row + 1) + " " + (column)])
        neighbors.push(this[(row + 1) + " " + (column + 1)])
        return neighbors.filter(Boolean)
    }
    // This adds things
    openCell(row, column) {
        if (this[row + " " + column].flag) {
            this[row + " " + column].flag = false
        } else if (this[row + " " + column].mine) {
            alert("You lose. Try again?")
            this.refresh()
        } else if (!this[row + " " + column].open) {
            this[row + " " + column].open = true
            this.open += 1
            if (this[row + " " + column].neighborMines === 0) {
                let neighbors = this.getNeighbors(row, column)
                for (let cell of neighbors) {
                    this.openCell(cell.row, cell.column)
                }
            }
        }
        if (this.open + this.bombs === this.size * this.size) {
            alert("You Win. Play again?")
            this.refresh()
        }
    }
    flag(row, column) {
        this[row + " " + column].flag = !this[row + " " + column].flag
    }
}
class expert {
    constructor(size, bombs) {
        this.size = size
        this.bombs = bombs
        this.open = 0
        for (let row = 0; row < size; row++) {
            for (let column = 0; column < size; column++) {
                this[row + " " + column] = new Cell(row, column)
            }
        }
    }
    // This resets the random variables and resizes the board by resizing the rows and columns
    refresh() {
        this.open = 0
        for (let row = 0; row < size; row++) {
            for (let column = 0; column < size; column++) {
                this[row + " " + column].open = false
                this[row + " " + column].mine = false
                this[row + " " + column].flag = false
                this[row + " " + column].neighborMines = 0
            }
        }
        this.assignMines()
    }

    // This is called above every time the board is reset 
    assignMines() {
        // This is to define the bombs that are referenced in other classes
        let bombs = this.bombs + 5
        while (bombs > 0) {
            //this makes random where the bombs go
            let row = Math.floor(Math.random() * this.size)
            let column = Math.floor(Math.random() * this.size)
            if (!this[row + " " + column].mine) {
                this[row + " " + column].mine = true
                // this gets the next function that is made
                let neighbors = this.getNeighbors(row, column)
                for (let cell of neighbors) {
                    cell.neighborMines += 1
                }
                bombs -= 1
            }
        }
    }
    //this finds the neighbors of a cell by looking at the different cells around it by taking away one from the columns or rows parameters
    getNeighbors(row, column) {
        let neighbors = []
        neighbors.push(this[(row - 1) + " " + (column - 1)])
        neighbors.push(this[(row - 1) + " " + (column)])
        neighbors.push(this[(row - 1) + " " + (column + 1)])
        neighbors.push(this[(row) + " " + (column - 1)])
        neighbors.push(this[(row) + " " + (column + 1)])
        neighbors.push(this[(row + 1) + " " + (column - 1)])
        neighbors.push(this[(row + 1) + " " + (column)])
        neighbors.push(this[(row + 1) + " " + (column + 1)])
        return neighbors.filter(Boolean)
    }
    // This adds things
    openCell(row, column) {
        if (this[row + " " + column].flag) {
            this[row + " " + column].flag = false
        } else if (this[row + " " + column].mine) {
            alert("You lose. Try again?")
            this.refresh()
        } else if (!this[row + " " + column].open) {
            this[row + " " + column].open = true
            this.open += 1
            if (this[row + " " + column].neighborMines === 0) {
                let neighbors = this.getNeighbors(row, column)
                for (let cell of neighbors) {
                    this.openCell(cell.row, cell.column)
                }
            }
        }
        if (this.open + this.bombs === this.size * this.size) {
            alert("You Win. Play again?")
            this.refresh()
        }
    }
    flag(row, column) {
        this[row + " " + column].flag = !this[row + " " + column].flag
    }
}
//this calls in the rest of the things to set up the board
var app = new Vue({
    el: '#app',
    data: {
        size: size,
        board: new Board(size, bombs),
        expert: new expert(size, bombs)
    },
    methods: {
        clickCell(row, column) {
            this.board.openCell(row, column)
        },
        flagCell(row, column) {
            this.board.flag(row, column)
        }
    },
    created() {
        this.board.assignMines()
    }
})