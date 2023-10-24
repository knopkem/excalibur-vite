import {
  Actor,
  CollisionType,
  Color,
  Engine,
  vec,
  CollisionStartEvent,
} from "excalibur";

export class Ball extends Actor {
  private ballspeed = vec(300, 300);
  private colliding = false;

  constructor() {
    super({ pos: vec(100, 300), radius: 10, color: Color.Red });

    this.body.collisionType = CollisionType.Passive;

    this.on("postupdate", () => {
      if (this.pos.x < this.width / 2) {
        this.vel.x = this.ballspeed.x;
      }

      if (this.pos.x + this.width / 2 > 800) {
        this.vel.x = this.ballspeed.x * -1;
      }

      if (this.pos.y < this.height / 2) {
        this.vel.y = this.ballspeed.y;
      }
    });

    this.on("exitviewport", () => {
      alert("you lose!");
    });

    this.on("collisionstart", (ev: CollisionStartEvent) => {
      // reverse course after any collision
      // intersections are the direction body A has to move to not be clipping body B
      // `ev.content.mtv` "minimum translation vector" is a vector `normalize()` will make the length of it 1
      // `negate()` flips the direction of the vector
      var intersection = ev.contact.mtv.normalize();

      // Only reverse direction when the collision starts
      // Object could be colliding for multiple frames
      if (!this.colliding) {
        this.colliding = true;
        // The largest component of intersection is our axis to flip
        if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
          this.vel.x *= -1;
        } else {
          this.vel.y *= -1;
        }
      }
    });

    this.on("collisionend", () => {
      // ball has separated from whatever object it was colliding with
      this.colliding = false;
    });
  }


  onInitialize(_engine: Engine): void {
    setTimeout(() => {
      this.vel = this.ballspeed;
    }, 1000);
  }
  
}
