import React, { useRef, useEffect, useState } from "react";

export const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      const tileSize = 20;
      let snake = [{ x: 10, y: 10 }];
      let food = { x: 15, y: 15 };
      let dx = 1;
      let dy = 0;

      const snakeImage = new Image();
      snakeImage.src = "/assets/baby.png";

      const foodImage = new Image();
      foodImage.src = "/assets/baby-bottle.png";

      const gameLoop = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Move snake
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        // Check for collision with food
        if (head.x === food.x && head.y === food.y) {
          setScore(prevScore => prevScore + 1);
          food = {
            x: Math.floor(Math.random() * (canvas.width / tileSize)),
            y: Math.floor(Math.random() * (canvas.height / tileSize))
          };
        } else {
          snake.pop();
        }

        // Draw snake
        snake.forEach(segment => {
          context.drawImage(snakeImage, segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
        });

        // Draw food
        context.drawImage(foodImage, food.x * tileSize, food.y * tileSize, tileSize, tileSize);

        // Draw score
        context.fillStyle = "white";
        context.font = "20px Arial";
        context.fillText(`Score: ${score}`, 10, 30);

        requestAnimationFrame(gameLoop);
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case "ArrowUp": dx = 0; dy = -1; break;
          case "ArrowDown": dx = 0; dy = 1; break;
          case "ArrowLeft": dx = -1; dy = 0; break;
          case "ArrowRight": dx = 1; dy = 0; break;
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      gameLoop();

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block" }}
    />
  );
};
