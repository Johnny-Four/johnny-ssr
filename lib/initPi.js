
function init(board, motors){
    console.log('forward plz');
    board.repl.inject({
      motors: motors
    });
};




module.exports = {
  init: init,


};
