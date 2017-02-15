function moveForward(board,motors){
    console.log("Controls moving the car");
    motors.forward(255);
    board.wait(5000, () => {
      motors.stop();
      })
};


module.exports = {
  moveForward : moveForward

}
