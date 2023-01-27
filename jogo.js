/*
*
* @author Fabiola Costa
* @version 1.0
*
*/


// Variavel que armazena a chamada da função timuout
var timerId = null;

function inicia_jogo(){

    //Pegando o endereço da url e trazendo só a informação depos da ?
    var url = window.location.search;

    //Aqui estamos tirando o ponto de ? e deixando só o nivel do jogo
    var nivel_jogo = url.replace("?", "");

    var tempo_segundos = 0;
    
    // 1 Fácil -> 120 segundos
    // 2 Normal -> 60 segundos
    // 3 Difícil -> 30 segundos

    if(nivel_jogo == 1){
        tempo_segundos = 120;
    }
    else if(nivel_jogo == 2){        
        tempo_segundos = 60;
    }
    else if(nivel_jogo == 3){
        tempo_segundos = 30;
    }
    else{
        alert("Erro");
    }

    // Inserindo os segundos no span
    document.getElementById('cronometro').innerHTML = tempo_segundos;

    // Quantidade de balões
    var qntd_baloes = 50;

    cria_baloes(qntd_baloes);

    // Imprimir quantidade  de balões inteiros
    document.getElementById('baloes_inteiros').innerHTML = qntd_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(tempo_segundos + 1);
}

function contagem_tempo(segundos){

    segundos = segundos - 1;

    if(segundos == -1){

        // Para a execução da função do settimeout
        clearTimeout(timerId);
        game_over();
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

    timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}


function cria_baloes(qntd_baloes){

    for(var i = 1; i <= qntd_baloes; i++){
        
        // Cria um elemento dentro da página HTML
        var balao = document.createElement("img");
        balao.src = "imagens/balao_azul_pequeno.png";
        balao.style.margin = "10px";
        balao.style.cursor = "pointer";
        balao.id = 'b' + i;
        balao.onclick = function(){ estourar(this);}
        
        // Adicionando os elementos dentro da div
        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar(e){

    var id_balao = e.id;

    // Removendo o evento click do balão depois de estourado
    document.getElementById(id_balao).setAttribute("onclick", "");

    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
    pontuacao(-1);
}

function pontuacao(acao){

    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){

    if(baloes_inteiros == 0){
        alert("Parabéns! Você finalizou o jogo 🥳");
        parar_jogo();
    }
}

function parar_jogo(){

    clearTimeout(timerId);
}

function game_over(){

    remove_eventos_baloes();
    alert("Fim de jogo\n Você não conseguiu estourar todos os balões a tempo");
}

function remove_eventos_baloes(){

    var i = 1;
    while(document.getElementById('b'+i)){

        // Retira o evento onclick do elemento
        document.getElementById('b' + i).onclick = '';
        i++;
    }
}



