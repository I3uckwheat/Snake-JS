const snakeGridSize = 40;
const snakeSpeed = 100;
const snakeLength = 6;
const keyBinding = {"ArrowUp": "u", "ArrowDown" : 'd', "ArrowLeft" : 'l', "ArrowRight" : 'r'}
const playArea = playAreaFactory(snakeGridSize);

const food = foodFactory();
const snake = snakeFactory([20,20]);
playArea.render();

var setInv = setInterval(tick, snakeSpeed);

document.addEventListener("keydown", (event) =>{
  const key = event.key;
  if(key in keyBinding){
    snake.changeDirection(keyBinding[key]);
  }
})


/************************************/


function tick() {
  snake.move();
  playArea.render();
}

function stopGame(){
  clearInterval(setInv);
}

function fail(){
  stopGame();
  console.log("YOU DIED");
}


function snakeFactory(startPosition){             // [0,0] is top left, [39, 39] is bottom right, [0, 39] is bottom left, [39,0] is top right.  [x,y] starting at top left
  const body = [startPosition]; // [[20, 20]]
  const moveList = {'r' : [1, 0], 'l' : [-1,0], 'u' : [0,-1], 'd' : [0,1]};
  let length = snakeLength;
  let snakeDirection = 'l';

  return {
    move,
    foundFood,
    changeDirection,
    headLocaton: getHeadLocation
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
      playArea.unSelectSpace(tail);
    }
    playArea.checkCollision(body);
  }

  function changeDirection(direction){
    snakeDirection = direction;
  }

  function foundFood(){
    food.getsEaten();
    eat();
  }

  function eat(){
    length++;
  }

  function getHeadLocation(){
    return body[0];
  }
}

function playAreaFactory(size){
  const board = boardFactory(size);

  return {
    selectSnakeSpaces,
    selectFoodSpaces,
    unSelectSpace,
    checkCollision,
    render
    }

  function checkCollision(body){
    const head = body[0];
    if(helpers.isEquivalent(head, food.getFoodLocation())){ snake.foundFood() };
    if(helpers.isArrayIn2dArray(head, body.slice(1, body.length))){fail()};
    if(head[0] > snakeGridSize || head[1] > snakeGridSize){fail()}
    selectSnakeSpaces(body);
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
        let currentSpaceDOMElement = document.querySelector(`.${column} .row${index}`)
        if(space === "snake"){
          currentSpaceDOMElement.classList.add("occupiedSnake");
        } else if (space === "food") {
          currentSpaceDOMElement.classList.add("occupiedFood");
        } else {
          currentSpaceDOMElement.classList.remove("occupiedSnake", "occupiedFood");
        }
      })
    }
  }

  function selectSnakeSpaces(body){
    body.forEach(([column, row]) => {
      board[`column${column}`][row] = "snake";
    })
  }

  function selectFoodSpaces([x, y]){
    board[`column${x}`][y] = "food"
  }

  function unSelectSpace([column, row]){
    board[`column${column}`][row] = null;
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

      for(let index = 0; index < board[column].length; index ++){
      const rowElement = document.createElement('div');
      rowElement.classList.add(`row${index}`, "row");

      columnContainer.appendChild(rowElement);
    };

    playAreaContainer.appendChild(columnContainer);
  }
  return playAreaContainer;
}

function foodFactory(){
  let foodLocation = getRandomOrderedPair();

  createNewFood();

  return {
    getFoodLocation,
    getsEaten: createNewFood
  }

  function getRandomOrderedPair(){
    min = Math.ceil(0);
    max = Math.floor(39);
    return [(Math.floor(Math.random() * (max - min)) + min), (Math.floor(Math.random() * (max - min)))];
  }

  function createNewFood(){
    const oldFoodLocation = foodLocation;
    foodLocation = getRandomOrderedPair();
    updatePlayArea(oldFoodLocation);
  }

  function getFoodLocation(){
    return foodLocation;
  }

  function updatePlayArea(oldFoodLocation){
    playArea.selectFoodSpaces(foodLocation);
    playArea.unSelectSpace(oldFoodLocation);
  }
}

helpers = (function helpers(){
  return {
    isEquivalent,
    isArrayIn2dArray
  }

  function isEquivalent(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
  }

  function isArrayIn2dArray(key, array2d){
    return array2d.some((array) => {return (array[0] == key[0] && array[1] == key[1])});
  }
})();
