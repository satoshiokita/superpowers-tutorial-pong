var ray:Sup.Math.Ray;

class ButtonBehavior extends Sup.Behavior {
  isHover:boolean = false;
  awake() {
    ray = new Sup.Math.Ray(this.actor.getPosition(), new Sup.Math.Vector3(0, 0, -1));
    
  }

  update() {
    ray.setFromCamera(Sup.getActor("Camera").camera, Sup.Input.getMousePosition());
    
    if (ray.intersectActor(this.actor, false/*recursive*/).length > 0) {
      if (!this.isHover) {
        this.mouse("hover");
        this.isHover = true;
      }
      if (Sup.Input.wasMouseButtonJustPressed(0)) {
        this.mouse("click");
      }
      
    } else if (this.isHover) {
      this.isHover = false;
      this.mouse("unhover");
    }
  }

  mouse(action:string) {
    if (action == "click") {
      Sup.loadScene("Game");
      Sup.Audio.playSound("GameSounds/toc");
      
    } else if (action == "hover") {
      Sup.getActor("Button").spriteRenderer.setSprite("MenuSprites/starton");
    } else if (action == "unhover") {
      Sup.getActor("Button").spriteRenderer.setSprite("MenuSprites/startoff");
    }
  }
}
Sup.registerBehavior(ButtonBehavior);
