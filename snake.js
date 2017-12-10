const snakeGridSize = 40;
const playArea = playAreaFactory(snakeGridSize);

const snake = {
  body: [[20,20]],
  direction: 'r',
  length: 1,
  updatePlayArea: function(){
    playArea.activeSpaces(snake.body);
  }
}

playArea.render();
snake.updatePlayArea()
playArea.render();


/************************************/



function playAreaFactory(size){
  const board = boardFactory(size);

  return {
    boardSize: size,
    render: render,
    activeSpaces: setSpacesActive
    }

  function render(){
    if(!document.querySelector(".playAreaContainer")){
      document.body.appendChild(generatePlayAreaDomStructure(board));
    } else {
      for(let i = 0; i < size; i++){
        board[`column${i}`].forEach((square, index) => {if(square){markSquareOccupied(i, index)}});
      }
    }
  }

  function markSquareOccupied(column, row) {
    const occupied = document.querySelector(`.column${column} .row${row}`);
    occupied.classList.add("occupied");
  }

  function setSpacesActive(spaces){
    spaces.forEach(([column, row]) => board[`column${column}`][row] = true)
  }
}

function boardFactory(size){
  var board = {}
  for(let i = 0; i < size; i++){
    board[`column${i}`] = []
    for(let j = 0; j < size; j++){
      board[`column${i}`][j] = false;
    }
  }
  return board;
}

function generatePlayAreaDomStructure(board) {
  const playAreaContainer = document.createElement('div');
  playAreaContainer.classList.add('playAreaContainer');

  for(const column in board){
    const columnContainer = document.createElement('div');
    columnContainer.classList.add(column, "column");

    board[column].forEach((_, index)=> {
      const rowElement = document.createElement('div');
      rowElement.classList.add(`row${index}`, "row");

      columnContainer.appendChild(rowElement);
    });

    playAreaContainer.appendChild(columnContainer);
  }
  return playAreaContainer;
}
