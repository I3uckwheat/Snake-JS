const snakeGridSize = 40;
const playArea = playAreaFactory(snakeGridSize);

render(playArea);

var snake = {
  position: [[20, 20]],
  length: 1,
  updatePlayArea: function(){
    snake.position.forEach(function(coords){
      playArea[`column${coords[0]}`][coords[1]] = true;
    })
  }
}

/************************************/

function playAreaFactory(size){
  var board = {}
  for(let i = 0; i < size; i++){
    board[`column${i}`] = []
    for(let j = 0; j < size; j++){
      board[`column${i}`][j] = false;
    }
  }
  board.column20[20] = true;
  board.gridSize = size;
  return board;
}

function render(playArea){
  if(!document.querySelector(".playAreaContainer")){
   document.body.appendChild(generatePlayAreaDomStructure(playArea));
  } else {
    for(let i = 0; i < playArea.gridSize; i++){
      playArea[`column${i}`].forEach(function(square, index) {
        if(square){markSquareOccupied(i, index)}
      });
    }
  }
}

function generatePlayAreaDomStructure(playArea){
  var playAreaContainer = document.createElement('div');
  playAreaContainer.classList.add("playAreaContainer");

  for(let i = 0; i < playArea.gridSize; i++) {
    let columnContainer = document.createElement('div');
    columnContainer.classList.add(`column${i}`, "column")

    playArea[`column${i}`].forEach(function(space, index) {
      let element = document.createElement('div');
      element.classList.add(`row${index}`, "row")
      columnContainer.appendChild(element);
    });
    playAreaContainer.appendChild(columnContainer);
  }
  return playAreaContainer;
}

function markSquareOccupied(column, row){
  var occupied = document.querySelector(`.column${column} .row${row}`);
  occupied.classList.add("occupied");
}
