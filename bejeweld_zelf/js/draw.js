var imported = document.createElement('script');
imported.src = 'gem.js';
document.head.appendChild(imported);

var gemArray = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
var colors = ['#FF0000', '#0055FF', '#09FF00', '#F7FF00', '#be05fc'];
var selected = 0;
var selectedRow = 0;
var selectedCol = 0;
var totalLength = 0;

function setup() {
    createCanvas(600, 600);
    noLoop();
    createGems();
}

function createGems() {
    for (let col = 0; col < 12; col += 1) {
        for (let row = 0; row < 12; row += 1) {
            this.gemArray[col][row] = new Gem(col * 50 + 25, row * 50 + 25, colors[Math.floor((Math.random() * 5))], 1);
        }
    }
    for (let col = 0; col < 12; col += 1) {
        for (let row = 0; row < 12; row += 1) {
            chain(col, row, 1);
        }
    }
    for (let col = 0; col < 12; col += 1) {
        for (let row = 0; row < 12; row += 1) {
            chain(col, row, 1);
        }
    }
    redraw(1);
}

function draw() {
    background(220, 220, 220);
    for (let col = 0; col < 12; col += 1) {
        for (let row = 0; row < 12; row += 1) {
            this.gemArray[col][row].show();
        }
    }
}

function mousePressed() {
    for (let col = 0; col < 12; col += 1) {
        for (let row = 0; row < 12; row += 1) {
            if (dist(this.gemArray[col][row].x, this.gemArray[col][row].y, mouseX, mouseY) <= 45 / 2) {
                select(col, row);
                redraw(1);
                console.log("row: " + row + "  col: " + col);
                console.log(this.gemArray[col][row].color)
            }
        }
    }
}

function select(col, row) {
    if (selected) {
        selected = 0;
        switchGem(col, row, selectedCol, selectedRow);
    } else {
        if (gemArray[col][row].lijndikte != 3) {
            gemArray[col][row].lijndikte = 3;
            selectedCol = col;
            selectedRow = row;
            selected = 1;
        } else {
            gemArray[col][row].lijndikte = 1;
            selectedCol = -1;
            selectedRow = -1;
            selected = 0;
        }
    }
}

function switchGem(col1, row1, col2, row2) {
    if ((col1 == col2 && ((row1 - row2 == 1) || (row1 - row2 == -1))) || (row1 == row2 && ((col1 - col2 == 1) || (col1 - col2 == -1)))) {
        tempColor = gemArray[col1][row1].color;
        gemArray[col2][row2].lijndikte = 1;
        gemArray[col1][row1].color = gemArray[col2][row2].color;
        gemArray[col2][row2].color = tempColor;
        redraw(1);
        let switchTest = chain(col2, row2, 0) + chain(col1, row1, 0);
        if (switchTest == 0) {
            tempColor = gemArray[col1][row1].color;
            gemArray[col1][row1].color = gemArray[col2][row2].color;
            gemArray[col2][row2].color = tempColor;
        }
    }

    else if (col1 == col2 && row1 == row2) {
        gemArray[col2][row2].lijndikte = 1;

    }

    else {
        gemArray[col2][row2].lijndikte = 1;
        gemArray[col1][row1].lijndikte = 3;
        selected = 1;
        selectedCol = col1;
        selectedRow = row1;
    }
}
function chain(col, row, startChain) {
    let startColor = gemArray[col][row].color;
    let leftLength = 0;
    let rightLength = 0;
    let topLength = 0;
    let bottomLength = 0;

    if (col != 0) {
        for (let i = col - 1; i >= 0; i--) {
            if (gemArray[i][row].color == startColor) {
                leftLength++;
            } else {
                break;
            }
        }
    }
    if (col != 11) {
        for (let i = col + 1; i <= 11; i++) {
            if (gemArray[i][row].color == startColor) {
                rightLength++;
            } else {
                break;
            }
        }
    }
    if (row != 0) {
        for (let i = row - 1; i >= 0; i--) {
            if (gemArray[col][i].color == startColor) {
                topLength++;
            } else {
                break;
            }
        }
    }
    if (row != 11) {
        for (let i = row + 1; i <= 11; i++) {
            if (gemArray[col][i].color == startColor) {
                bottomLength++;
            } else {
                break;
            }
        }
    }

    let horizontalLength = 1 + leftLength + rightLength;
    let verticalLength = 1 + topLength + bottomLength;
    let startHor = col - leftLength;
    let endHor = col + rightLength;
    let startVer = row - topLength;
    let endVer = row + bottomLength;

    if (startChain == 0) {
        if (verticalLength > 2 && horizontalLength > 2) {
            adjustGem(startHor, endHor, startVer, endVer, col, row, 'b', verticalLength, horizontalLength)
            return 1;
        } else if (verticalLength > 2 && horizontalLength < 3) {
           adjustGem(startHor, endHor, startVer, endVer, col, row, 'v', verticalLength, horizontalLength)
            return 1;
        } else if (verticalLength < 3 && horizontalLength > 2) {
           adjustGem(startHor, endHor, startVer, endVer, col, row, 'h', verticalLength, horizontalLength)
            return 1;
        } else {
            return 0;
        }
    } else {
        if (verticalLength > 2 && horizontalLength > 2) {
            newColor(startHor, endHor, startVer, endVer, col, row);
        } else if (verticalLength > 2 && horizontalLength < 3) {
            newColor(col, col, startVer, endVer, col, row);
        } else if (verticalLength < 3 && horizontalLength > 2) {
            newColor(startHor, endHor, row, row, col, row);
        }
    }
}
///extra parameter(hor of ver)
function adjustGem(startHor, endHor, startVer, endVer, col, row, richting, verticalLength, horizontalLength) {
    // for (let i = startHor; i <= endHor; i++) {
    //     gemArray[i][row].color = "#000000";
    // }
    // for (let i = startVer; i <= endVer; i++) {
    //     gemArray[col][i].color = "#000000";
    // }

    switch(richting){

        case 'v':
            console.log("startver = " + startVer + " endVer = " + endVer + " verticalLength : " + verticalLength);
            var colorArray = [];
            for(i = startVer-1; i >= 0; i--){
                let tempCol = gemArray[col][i].color;
                colorArray.unshift(tempCol);
            }
            var j = 0;
            for(i=0;i<row;i++){
                if(i >=verticalLength){
                    gemArray[col][i].color = colors[Math.floor((Math.random() * 5))];
                }
                else {
                    gemArray[col][i].color = colorArray[j];
                    j++;   
                }
            }

        break;
        case 'h':
            console.log("startHor = " + startHor + " endHor = " + endHor + " horizontalLength : " + horizontalLength);
        break;
        case 'b':

        break;
    }

    redraw(1);
}

function newColor(startHor, endHor, startVer, endVer, col, row) {
    for (let i = startHor; i <= endHor; i++) {
        gemArray[i][row].color = colors[Math.floor((Math.random() * 5))];
    }
    for (let i = startVer; i <= endVer; i++) {
        gemArray[col][i].color = colors[Math.floor((Math.random() * 5))];
    }
    redraw(1);
}

