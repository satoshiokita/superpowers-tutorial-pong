class PaddlesBehavior extends Sup.Behavior {
  awake() {
  }

  update() {
    
  }
}
Sup.registerBehavior(PaddlesBehavior);

class Paddle1Behavior extends Sup.Behavior {
  // rigidBody
  pad = this.actor.arcadeBody2D;
  speed : number = 0.1;

  awake() {
    
  }
  update() {
    let y:number = this.actor.getY();
    if (Sup.Input.isKeyDown("W") && y < 2.35) {
      this.pad.setVelocityY(this.speed);
    } else if (Sup.Input.isKeyDown("S") && y > -2.35) {
      this.pad.setVelocityY(-this.speed);
    } else {
      this.pad.setVelocityY(0);
    }
  }
}
Sup.registerBehavior(Paddle1Behavior);

class Paddle2Behavior extends Sup.Behavior {
  // rigidBody
  pad = this.actor.arcadeBody2D;
  speed : number = 0.1;

  awake() {
    
  }
  update() {
    let y:number = this.actor.getY();
    if (Sup.Input.isKeyDown("UP") && y < 2.35) {
      this.pad.setVelocityY(this.speed);
    } else if (Sup.Input.isKeyDown("DOWN") && y > -2.35) {
      this.pad.setVelocityY(-this.speed);
    } else {
      this.pad.setVelocityY(0);
    }
  }
}
Sup.registerBehavior(Paddle2Behavior);
