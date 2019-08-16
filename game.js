var tetris = document.querySelector('#tetris');
var tetrisData = [];
var currentBlock;
var nextBlock;
var currentTopLeft = [0, 3];
var blocks = [
    {
        name: 's', //square
        center : false,
        numCode : 1,
        color : 'red',
        currentShapeIndex : 0,
        shape : [
            [
                [0, 0, 0],
                [0, 1, 1],
                [0, 1, 1],
            ]
        ],
    },
    {
        name: 't', // t shape
        center : true,
        numCode : 2,
        color : 'orange',
        currentShapeIndex : 0,
        shape : [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0],
            ],

        ],
    },
    {
        name: 'z', // zigzag shape
        center : true,
        numCode : 3,
        color : 'yellow',
        currentShapeIndex : 0,
        shape : [
            [
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0],
            ],
            [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0],
            ],

        ],
    },
    {
        name: 'zr', // reverse zigzag shape
        center : true,
        numCode : 4,
        color : 'green',
        startRow: 1,
        currentShapeIndex : 0,
        shape : [
            [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0],
            ],
            [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 0, 1],
            ],

        ],
    },
    {
        name: 'l', // L shape
        center : true,
        numCode : 5,
        color : 'blue',
        currentShapeIndex : 0,
        shape : [
            [
                [0, 0, 0],
                [1, 1, 1],
                [1, 0, 0],
            ],
            [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1],
            ],

        ],
    },
    {
        name: 'lr', // reverse L shape
        center : true,
        numCode : 6,
        color : 'navy',
        currentShapeIndex : 0,
        shape : [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1],
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0],
            ],
            [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0],
            ],

        ],
    },
    {
        name: 'b', // line shape
        center : true,
        numCode : 7,
        color : 'violet',
        currentShapeIndex : 0,
        shape : [
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
            ],

        ],
    },
    
];

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'violet'];

const isActiveBlock = value => (value > 0 && value < 10);
const isInvalidBlock = value => (value === undefined || value >= 10);

function init(){
    const fragment = document.createDocumentFragment();
    [...Array(20).keys()].forEach((col, i) => {
        const tr = document.createElement('tr');
        fragment.appendChild(tr);
        [...Array(10).keys()].forEach((row, j)=>{
            const td = document.createElement('td');
            tr.appendChild(td);
        });
        const column = Array(10).fill(0);
        tetrisData.push(column);
    });
    tetris.appendChild(fragment);
}

function draw(){
    console.log('drawed', JSON.parse(JSON.stringify(tetrisData)), JSON.parse(JSON.stringify(currentBlock)));
    tetrisData.forEach((col, i)=>{
        col.forEach((row, j)=> {
            if(row > 0){
                tetris.children[i].children[j].className = tetrisData[i][j] >= 10? colors[tetrisData[i][j] / 10 - 1] : colors[tetrisData[i][j] - 1];
            } else {
                tetris.children[i].children[j].className = '';
            }
        });
    });
}

function drawNext() { // a function to draw the next block
    const nextTable = document.getElementById('next-table');
    nextTable.querySelectorAll('tr').forEach((col, i)=>{
        Array.from(col.children).forEach((row, j)=>{
            if(nextBlock.shape[0][i] && nextBlock.shape[0][i][j] >0){
                nextTable.querySelectorAll('tr')[i].children[j].className = colors[nextBlock.numCode - 1];
            } else {
                nextTable.querySelector('tr')[i].children[j].className = 'white';
            }
        });
    });
}

function generate(){ // create tetris blocks
if(!currentBlock){
    currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
} else {
    currentBlock = nextBlock;
}
currentBlock.currentShapeIndex = 0;
nextBlock = blocks[Math.floor(Math.random()* blocks.length)]; // make next block in advance
console.log(currentBlock);
drawNext();
currentTopLeft = [-1, 3];
let isGameOver = false;
currentBlock.shape[0].slice(1).forEach((col, i)=> { // to judge if the game is over
    col.forEach((row, j)=>{
        if(row && tetris[i][j + 3]){
            isGameOver = true;
        }
    });
})
currentBlock.shape[0].slice(1).forEach((col, i)=>{ // make block data
    console.log(currentBlock.shape[0], currentBlock.shape[0].slice(1), col);
    col.forEach((row, j) => {
        if(row){
            tetrisData[i][j + 3] = currentBlock.numCode;
        }
    });
});
 console.log('generate', JSON.parse(JSON.stringify(currentBlock)));
 if(isGameOver){
     clearInterval(int);
     draw();
     alert('game over');
 } else {
     draw();
 }
}

function checkRows(){ // check if the row is full
    const fullRows = [];
    tetrisData.forEach((col, i) => {
        let count = 0;
        col.forEach((row, j) =>{
            if(row > 0){
                count++;
            }
        });
        if(count === 10){
            fullRows.push(i);
        }
    });
    const fullRowsCount = fullRows.length;
    tetrisData = tetrisData.filter((row, i) => { !fullRows.includes(i)});
    for(let i =0; i < fullRowsCount; i++){
        tetrisData.unshift([0,0,0,0,0,0,0,0,0,0]);
    }
    console.log(fullRows, JSON.parse(JSON.stringify(tetrisData)));
    let score = parseInt(document.getElementById('score').textContent, 10);
    score += fullRowsCount **2;
    document.getElementById('score').textContent = String(score);
 
}

function tick(){ // move down one row
    const nextTopLeft = [currentTopLeft[0]+1, currentTopLeft[1]];
    const activeBlocks = [];
    let canGoDown = true;
    let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
    for(let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++){
        //if there is a block down
        if(i < 0 || i >= 20) continue;
    }
    for ()

}