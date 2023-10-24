import { Actor, CollisionType, vec, Color } from "excalibur";

interface BrickInput {
  x: number;
  y: number;
  width: number;
  height: number;
  color: Color;
}

export class Brick extends Actor {
  constructor({ x, y, width, height, color }: BrickInput) {
    super({ pos: vec(x, y), width, height, color });

    this.body.collisionType = CollisionType.Passive;

    this.on("collisionstart", () => {
      this.kill();
    });
  }
}
