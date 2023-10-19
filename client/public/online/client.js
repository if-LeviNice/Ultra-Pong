const socket = io();
const cH = 735;
const cW = 1540;
const canvas = document.getElementById("Ultra Pong");
contexto = canvas.getContext("2d") ;
function resize() {
    canvas.width = window.innerWidth * .9;
    canvas.height = canvas.width * cH / cW;
    contexto.scale(canvas.width/cW, canvas.height/cH);
}
resize();
var Objetos, overtime;
socket.once("init", init);
socket.on("server-info", serverInfo => {
    overtime = serverInfo[0];
    Objetos = serverInfo[1];
})
async function init() {
    document.addEventListener("keydown", function(evento) {
        socket.emit("keydown", evento.code, evento.type);
    })
    document.addEventListener("keyup", function(evento) {
        socket.emit("keyup", evento.code, evento.type);
    })
    render();
}
drawBG();
contexto.fillStyle = "#0000FF";
contexto.fillRect(5, cH/2 - 75, 20, 150); 
contexto.fillStyle = "#EEEEEE"; 
contexto.font = "100px Impact";
contexto.fillText(0, cW/3.25, cH/8);
contexto.fillText(0, cW/1.5, cH/8);
function render() {
    requestAnimationFrame(render);
    resize();
    drawBG();
    //Desenhar objetos
    desenhar();
    //Vitória
    vencer();
    //Overtime
    if (overtime) {
        contexto.font = "200px Impact"; 
        contexto.fillText ("OVERTIME", 400, cH/2 + 80); 
    }
    //Desenhar Placar
    contexto.font = "100px Impact";
    contexto.fillText(Objetos[0].pontos, cW/3.25, cH/8);
    contexto.fillText(Objetos[1].pontos, cW/1.5, cH/8);
    //Interação UI
    switch(posse) {
        case 0:
            canvas.style.animation = 'bluetilt .5s';
            canvas.style.animationFillMode = 'forwards';
            body.style.animation = 'bluebg 1s';
            body.style.animationTimingFunction = 'ease';
            body.style.animationFillMode = 'forwards';
            break;
        case 1:
            canvas.style.animation = 'redtilt .5s';
            canvas.style.animationFillMode = 'forwards';
            body.style.animation = 'redbg 1s';
            body.style.animationTimingFunction = 'ease';
            body.style.animationFillMode = 'forwards';
            break;
        default:
            canvas.style.animation = 'neutral 1s';
            canvas.style.animationFillMode = 'forwards';
            body.style.animation = 'whitebg 1s';
            body.style.animationTimingFunction = 'ease';
            body.style.animationFillMode = 'forwards';
            break;
    }
}
function drawBG() {
    contexto.fillStyle = "#000000"; 
    contexto.fillRect(0,0, cW, cH); 
    contexto.fillStyle = "#999999";
    contexto.fillRect(cW/2 - 10, 0, 20, cH); 
    contexto.fillRect(cW/2 - cW/16 + 5, cH/2 - 10, cW/8 - 10, 20);
    contexto.fillRect(cW/2 - cW/16, cH/2 - 75, 10, 150);
    contexto.fillRect(cW/2 + cW/16, cH/2 - 75, -10, 150);
    contexto.fillStyle = "#EEEEEE";
}
function desenhar() {
    Objetos.map(objeto => {
        contexto.fillStyle = objeto.cor;
        if (objeto.movimento?.super) contexto.fillStyle = "#FFFF00";
        contexto.fillRect(objeto.posicao.x, objeto.posicao.y, objeto.largura, objeto.altura);
    });
}
function vencer() {
    Objetos.map(objeto => {
        if (!objeto.vitoria) return;
        contexto.font = "300px Impact"; 
        contexto.fillStyle = objeto.cor;
        contexto.fillText (objeto.nome, cW/6, cH/2 + 130);
        contexto.fillStyle = "#EEEEEE";
        contexto.fillText ("WINS", cW/2.75 + 20, cH/2 + 130);
        Objetos[2].posicao.y = cH * 2;
        Objetos[2].posicao.x = cW/2;
    });
}