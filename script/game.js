const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        
        const box = 20;
        let snake;
        let direction;
        let food;
        let game;

        function initializeGame() {
            snake = [{ x: 200, y: 200 }];
            direction = "RIGHT";
            food = {
                x: Math.floor(Math.random() * 20) * box,
                y: Math.floor(Math.random() * 20) * box
            };
        }

        document.addEventListener("keydown", changeDirection);
        
        function changeDirection(event) {
            const key = event.keyCode;
            if (key === 37 && direction !== "RIGHT") direction = "LEFT";
            else if (key === 38 && direction !== "DOWN") direction = "UP";
            else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
            else if (key === 40 && direction !== "UP") direction = "DOWN";
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = "red";
            ctx.fillRect(food.x, food.y, box, box);

            ctx.fillStyle = "green";
            snake.forEach((segment, index) => {
                ctx.fillRect(segment.x, segment.y, box, box);
                if (index === 0) {
                    ctx.strokeStyle = "black";
                    ctx.strokeRect(segment.x, segment.y, box, box);
                }
            });

            let newX = snake[0].x;
            let newY = snake[0].y;

            if (direction === "LEFT") newX -= box;
            if (direction === "UP") newY -= box;
            if (direction === "RIGHT") newX += box;
            if (direction === "DOWN") newY += box;

            if (newX === food.x && newY === food.y) {
                food = {
                    x: Math.floor(Math.random() * 20) * box,
                    y: Math.floor(Math.random() * 20) * box
                };
            } else {
                snake.pop();
            }

            const newHead = { x: newX, y: newY };
            
            if (newX < 0 || newY < 0 || newX >= canvas.width || newY >= canvas.height ||
                snake.some(segment => segment.x === newX && segment.y === newY)) {
                clearInterval(game);
                alert("Game Over!");
            }
            
            snake.unshift(newHead);
        }

        function startGame() {
            initializeGame();
            clearInterval(game);
            game = setInterval(draw, 100);
        }

        function resetGame() {
            clearInterval(game);
            initializeGame();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

