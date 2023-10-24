import { Engine, Loader, Color, CollisionType } from "excalibur";
import { Resources } from "./resources";
import { Paddle } from "./paddle";
import { Ball } from "./ball";
import { Brick } from "./brick";

class Game extends Engine {
  constructor() {
    super({ width: 800, height: 600 });
  }
  initialize() {
    this.add(new Paddle());
    this.add(new Ball());

    const loader = new Loader([Resources.Sword]);
    this.start(loader);
  }
}

export const game = new Game();
game.initialize();

// Padding between bricks
const padding = 20; // px
const xoffset = 65; // x-offset
const yoffset = 20; // y-offset
const columns = 5;
const rows = 3;

const brickColor = [Color.Violet, Color.Orange, Color.Yellow];

// Individual brick width with padding factored in
const brickWidth = game.drawWidth / columns - padding - padding / columns; // px
const brickHeight = 30; // px
const bricks: Brick[] = [];
for (let j = 0; j < rows; j++) {
  for (let i = 0; i < columns; i++) {
    bricks.push(
      new Brick({
        x: xoffset + i * (brickWidth + padding) + padding,
        y: yoffset + j * (brickHeight + padding) + padding,
        width: brickWidth,
        height: brickHeight,
        color: brickColor[j % brickColor.length],
      })
    );
  }
}

bricks.forEach(function (brick) {
  // Make sure that bricks can participate in collisions
  brick.body.collisionType = CollisionType.Active;

  // Add the brick to the current scene to be drawn
  game.add(brick);
});
