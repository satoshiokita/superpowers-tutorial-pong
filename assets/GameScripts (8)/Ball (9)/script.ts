const BALLSPEED:number = 0.05;

class BallBehavior extends Sup.Behavior {
  
  speed:number = BALLSPEED;

  ball = this.actor.arcadeBody2D;

  // array[0] = player1, array[1] = player2
  score = [0, 0];

  // 方向
  dx:number = 1;
  dy:number = 1;

  awake() {
    
  }

  didEndGame(): void {
    if (this.score[0] == 10 || this.score[1] == 10) {
      Sup.loadScene("Menu");
    }
  }

  update() {
    this.didEndGame();
    
    let x:number = this.actor.getX();
    let y:number = this.actor.getY();
    
    if (y > 2.85 || y < -2.85) {
      this.dy *= -1;
      Sup.Audio.playSound("GameSounds/tac");
    }
    
    // hit paddle or up|down wall.
    if (Sup.ArcadePhysics2D.collides(this.ball, Sup.ArcadePhysics2D.getAllBodies())) {
      // hit paddles.
      Sup.Audio.playSound("GameSounds/toc");
      if (this.ball.getTouches().right || this.ball.getTouches().left) {
        this.dx *= -1;
        this.speed += 0.01;
      } else {
        this.dy *= -1;
      }
    }
    
    // win or lose ball.
    if (x > 4 || x < -4) {
      Sup.Audio.playSound("GameSounds/tada");
      
      this.ball.warpPosition(0, 0); // center.
      this.dx *= -1;
      this.speed = BALLSPEED;
    }
    
    this.ball.setVelocity(this.speed * this.dx, this.speed * this.dy);
    
    // Score /////
     // 右側の先に進んだのでPlayer1が得点
    if (x > 4) {
      ++this.score[0];
      Sup.getActor("Player1").getChild("Score").textRenderer.setText(this.score[0]);
    }
    if (x < -4) {
      ++this.score[1];
      Sup.getActor("Player2").getChild("Score").textRenderer.setText(this.score[1]);
    }   
  }
}
Sup.registerBehavior(BallBehavior);
