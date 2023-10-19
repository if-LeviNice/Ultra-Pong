//Constantes gerais
const PONTOS_VITORIA = 11;
var overtime = false;
const bola = new Bola({x: 30, y: 30}, 120, "#EEEEEE");
const j1 = new Raquete({x: 20, y: 150}, 5, {e: 0, d: cW/2 - cW/16}, "#0000FF", "P1");
const j2 = new Raquete({x: 20, y: 150}, cW - 5, {e: cW/2 + cW/16, d: cW}, "#FF0000", "P2");
var posse = -1;
//Atualizar tela
function tick() {
    if ((bola.posicao.y + bola.altura >= cH && bola.velocidade.y > 0) || (bola.posicao.y <= 0 && bola.velocidade.y < 0))
        bola.velocidade.y *= -1;
    //Mover Objetos
    Raquete.mover();
    Bola.mover();
    if(!j1.checarColisao(bola, j1, j2))
        j2.checarColisao(bola, j1, j2);
    posse = -1;
    if(bola.velocidade.x != 0) {
        posse = 1;
        if(bola.velocidade.x > 0)
            posse = 0;
    }
    //Gols
    if (bola.posicao.x > cW)
        j1.gol(j2, bola);
    else if (bola.posicao.x < -bola.largura)
        j2.gol(j1, bola, cW - bola.posicaoInicial.x - bola.largura)
    overtime = false;
    //Vitória
    if (j1.pontos >= PONTOS_VITORIA && j1.pontos >= j2.pontos + 2) {
        j1.vitoria = true;
        posse = 0;
    }
    else if (j2.pontos >= PONTOS_VITORIA && j2.pontos >= j1.pontos + 2) {
        j2.vitoria = true;
        posse = 1;
    }
        
    //Overtime
    else if (j1.pontos  === PONTOS_VITORIA - 1 && j2.pontos  === PONTOS_VITORIA - 1 && j1.altura > 111) {
        overtime = true;
        Raquete.overtime();
    }
    Objetos = [j1, j2, bola];
    return [overtime, Objetos];
}
var Objetos;