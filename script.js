let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right"
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Cria área do jogo
function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Cria a corbinha
function criarCobrinha() {
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "rgb(4, 59, 4)";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Cria a comida
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Cria evento de esculta da teclas direcionais
document.addEventListener("keydown", update);

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// Cria todas coniçoes de início do jogo
function iniciarJogo() {
    // Define a direção quando teclar alguma tecla direcional
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 8 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 8 && direction == "up") snake[0].y = 16 * box;

    // Cria a condição quando se chocar com o corpo
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over :(")
        }
    }

    // Chama as funções de: Criar campo, criar a cobrinha e a comida
    criarBG();
    criarCobrinha();
    drawFood();

    // Cria posição da cobrinha "ponto de partida"
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Cria condicionais de coordenadas
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // Cria condições para aumentar a cobrinha quando passar por cima da comida e faz nascer a comida em outro lugar
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{food.x =Math.floor(Math.random() * 15 + 1) * box;
        food.y =Math.floor(Math.random() * 15 + 1) * box;
    }

    // Acrescenta um elemento
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    
    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100);