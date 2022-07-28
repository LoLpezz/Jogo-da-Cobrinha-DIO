let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //Context renderiza o desenho que vai acontecer dentro do Canvas
let box = 32; //16+16 / 16 pixels para ficar quadrado
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
}

function criarBG () {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); //O fillRect vai desenhar o retangulo onde vai acontecer o jogo e também trabalha com 4 parametros, posição de X e Y, altura e largura 
}

function criarCobrinha() {
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function desenharComida(){
    context.fillStyle = "red";
    context.fillRect (food.x, food.y, box, box);
}

document.addEventListener("keydown", update); 

function update(event){
    if (event.keyCode == 37 && direction != "right") direction = "left"; //Se o botão for o 37 e a direção não for para direita, muda a direção para esquerda
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}
//FUNÇÃO QUE PERMITE A SNAKE ATRAVESSAR A PAREDE E CONTINUAR O JOGO
function iniciarJogo() {
    for (i = 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo); 
            alert("Gamer Over!"); 
        }
    }

    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0; 
    if (snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;

    criarBG();
    criarCobrinha();
    desenharComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    //CONTROLE DA SNAKE
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //Vai tirar um do ARRAY

    } else { food.x = Math.floor(Math.random() * 15 + 1) * box
            food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100); //Aqui está sendo passado um intervalo de 100 milesegundos para a função iniciar o jogo e a cada 100 milisegundos vai estar em uma vaga a cada 1oo ml e vai dar continuidade ao jogo sem travar

