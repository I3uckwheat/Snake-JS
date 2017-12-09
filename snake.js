const snakeGridSize = 40;
const playArea = playAreaFactory(snakeGridSize);

render(playArea);

/************************************/

function playAreaFactory(size){
  var board = {}
  for(let i = 0; i < size; i++){
    board[`row${i}`] = []
    for(let j = 0; j < size; j++){
      board[`row${i}`][j] = " ";
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
    let rowContainer = document.createElement('div');
    rowContainer.classList.add(`row${i}`, "row")

    playArea[`row${i}`].forEach(function(space, index) {
      let element = document.createElement('div');
      element.classList.add(`column${index}`, "column")
      element.textContent = space;
      rowContainer.appendChild(element);
    });
    playAreaContainer.appendChild(rowContainer);
  }
  return playAreaContainer;
}
