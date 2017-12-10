const snakeGridSize = 40;
const playArea = playAreaFactory(snakeGridSize);

playArea.render();

const snake = snakeFactory([20,20]);

playArea.render();
var setInv = setInterval(tick, 1000);

/************************************/


function tick() {
  snake.move();
  playArea.render();
}

function snakeFactory(startPosition){             // [0,0] is top left, [39, 39] is bottom right, [0, 39] is bottom left, [39,0] is top right.  [x,y] starting at top left
  const body = [startPosition]; // [[20, 20]]
  const moveList = {'r' : [1, 0], 'l' : [-1,0], 'u' : [0,-1], 'd' : [0,1]};
  let length = 3;
  let snakeDirection = 'l';

  // updatePlayArea();

  return {
    length,
    move,
    changeDirection,
    body
  }


  function move(){
    const [x, y] = moveList[snakeDirection];
    const head = body[body.length - 1].slice();
    let tail;

    head[0] += x;
    head[1] += y;
    body.push(head);

    if(body.length > length) {
      tail = body.shift()
      playArea.unSelectSpaces(tail);
    }
    playArea.selectSpaces(body);
  }

  function changeDirection(direction){
    snakeDirection = direction;
  }
}

function playAreaFactory(size){
  const board = boardFactory(size);

  return {
    selectSpaces,
    unSelectSpaces,
    boardSize: size,
    render: render
    }

  function render(){
    if(!document.querySelector(".playAreaContainer")){
      document.body.appendChild(generatePlayAreaDomStructure(board));
    } else {
      drawSpaces();
    }
  }

  function drawSpaces(){
    for(column in board){
      board[column].forEach((space, index) => {
        if(space){
          document.querySelector(`.${column} .row${index}`).classList.add("occupied")
        } else {
          document.querySelector(`.${column} .row${index}`).classList.remove("occupied")
        };
      })
    }
  }

  function selectSpaces(body){
    body.forEach(([column, row]) => {
      board[`column${column}`][row] = true;
    })
  }

  function unSelectSpaces(tail){
    [column, row] = tail;
    board[`column${column}`][row] = false;
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
