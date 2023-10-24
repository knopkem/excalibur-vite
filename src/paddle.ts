import {
  Actor,
  CollisionType,
  Color,
  Engine,
  vec,
} from "excalibur";

export class Paddle extends Actor {
  constructor() {
    super({
      pos: vec(150, 560),
      width: 200,
      height: 20,
      color: Color.Chartreuse,
    });
    this.body.collisionType = CollisionType.Fixed;
  }
  onInitialize(_engine: Engine): void {
    _engine.input.pointers.primary.on("move", (evt) =>
      this.pos.x = evt.worldPos.x
    );
  }
}
