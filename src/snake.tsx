import type React from "react";
import { useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}
const GAME_SPEED = 150;
export const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      const tileSize = 40;
      let tilesX: number;
      let tilesY: number;
      const snake: Position[] = [{ x: 10, y: 10 }];
      let food: Position = { x: 15, y: 15 };
      let dx = 1;
      let dy = 0;

      const snakeImage = new Image();
      snakeImage.src =
        "https://icon2.cleanpng.com/20240307/zvs/transparent-baby-girl-baby-girl-infant-white-headband-pink-flo-baby-girl-in-white-outfit-and-1710847364541.webp";

      const foodImage = new Image();
      foodImage.src =
        "https://e7.pngegg.com/pngimages/730/960/png-clipart-blue-feeding-bottle-illustration-baby-bottles-emoji-infant-sticker-milk-bottle-united-states-dollar-water-bottles.png";

      // Create off-screen canvas
      const offscreenCanvas = document.createElement("canvas");
      const offscreenContext = offscreenCanvas.getContext("2d");

      const spawnNewFood = (): Position => {
        const maxTileX = tilesX - 1;
        const maxTileY = tilesY - 1;
        let newFoodPosition: Position;
        do {
          newFoodPosition = {
            x: Math.floor(Math.random() * maxTileX),
            y: Math.floor(Math.random() * maxTileY),
          };
        } while (
          snake.some(
            (segment) =>
              segment.x === newFoodPosition.x &&
              segment.y === newFoodPosition.y,
          )
        );
        return newFoodPosition;
      };

      const gameLoop = () => {
        if (!offscreenContext) return;

        offscreenContext.clearRect(
          0,
          0,
          offscreenCanvas.width,
          offscreenCanvas.height,
        );

        // Move snake
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        // Wrap around logic
        head.x = (head.x + tilesX) % tilesX;
        head.y = (head.y + tilesY) % tilesY;

        snake.unshift(head);

        // Check for collision with food
        if (head.x === food.x && head.y === food.y) {
          setScore((prevScore) => prevScore + 1);
          food = spawnNewFood();
        } else {
          snake.pop();
        }

        // Draw snake
        for (const segment of snake) {
          offscreenContext.drawImage(
            snakeImage,
            segment.x * tileSize,
            segment.y * tileSize,
            tileSize * 1.5,
            tileSize * 1.5,
          );
        }

        // Draw food
        offscreenContext.drawImage(
          foodImage,
          food.x * tileSize,
          food.y * tileSize,
          tileSize * 1.2,
          tileSize * 1.2,
        );

        // Draw score
        offscreenContext.fillStyle = "white";
        offscreenContext.font = "20px Arial";
        offscreenContext.fillText(`Score: ${score}`, 10, 30);

        // Copy off-screen canvas to visible canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(offscreenCanvas, 0, 0);

        setTimeout(() => requestAnimationFrame(gameLoop), GAME_SPEED);
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case "ArrowUp":
            dx = 0;
            dy = -1;
            break;
          case "ArrowDown":
            dx = 0;
            dy = 1;
            break;
          case "ArrowLeft":
            dx = -1;
            dy = 0;
            break;
          case "ArrowRight":
            dx = 1;
            dy = 0;
            break;
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        offscreenCanvas.width = canvas.width;
        offscreenCanvas.height = canvas.height;
        tilesX = Math.floor(canvas.width / tileSize);
        tilesY = Math.floor(canvas.height / tileSize);
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      // Wait for images to load before starting the game loop
      Promise.all([
        new Promise((resolve) => (snakeImage.onload = resolve)),
        new Promise((resolve) => (foodImage.onload = resolve)),
      ]).then(() => {
        gameLoop();
      });

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [score]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};
