function playAreaFactory(size){
  var board = {}
  for(let i = 0; i < size; i++){
    board[`row${i}`] = {}
    for(let j = 0; j < size; j++){
      board[`row${i}`][`column${j}`] = " ";
    }
  }
  return board;
}
