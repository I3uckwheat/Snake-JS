const snakeGridSize = 40;
const playArea = playAreaFactory(snakeGridSize);

render(playArea);

/************************************/

function playAreaFactory(size){
  var board = {}
  for(let i = 0; i < size; i++){
    board[`column${i}`] = []
    for(let j = 0; j < size; j++){
      board[`column${i}`][j] = " ";
    }
  }

  board.gridSize = size;
  return board;
}

function render(playArea){
  document.body.appendChild(generatePlayAreaDomStructure(playArea));
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
      element.textContent = space;
      columnContainer.appendChild(element);
    });
    playAreaContainer.appendChild(columnContainer);
  }
  return playAreaContainer;
}
