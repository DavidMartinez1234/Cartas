const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadoras = document.querySelector('#computadora-cartas');

let puntosJugador = 0,
    puntosComputadora = 0;

let deck =  [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']


const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos){
            deck.push(i + tipo);
        }
    }
    for (let especial of especiales) {
        for (let tipo of tipos){
            deck.push(especial + tipo);
        }
    }
    //console.log(deck)
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}
crearDeck();
const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck'
    }
    const carta = deck.pop();
    //console.log(carta);
    //console.log(deck);
    return carta;

}
/*for (let i = 0; i < 60; i++) {
    pedirCarta();
}*/
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    let puntos = 0;
    if (isNaN(valor)) {
        //console.log(valor + " no es un numero ");
        puntos = (valor ==='A') ? 11 : 10;
    }else{
        puntos = valor * 1;
        //console.log(valor + " es un numero");
    }
    //console.log(puntos);
    return puntos;
}

btnPedir.addEventListener("click", function (evt){
    evt.defaultPrevented;
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement("img");
    imgCarta.src = `cartas/${carta}.png`;
    imgCarta.classList.add("carta");

    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21){
        //console.log("Perdiste");
        deshabilitarBotones();
        turnoComputadora(puntosJugador);
    }else if (puntosJugador === 21) {
        //console.log("21, ganaste");
        deshabilitarBotones();
        puntosComputadora(puntosJugador);   
    }
    //console.log("Puntos del jugador acumulados: " + puntosJugador);
    //console.log(carta);
});
/*valorCarta(pedirCarta());
valorCarta(pedirCarta());
valorCarta(pedirCarta());*/
function deshabilitarBotones(){
    btnPedir.disabled=true;
    btnDetener.disabled=true;
}

btnDetener.addEventListener("click", function(event){
    deshabilitarBotones()
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", function(event){
    console.clear();
    deck=[];
    deck=crearDeck();

    puntosJugador =0;
    puntosComputadora=0;
    puntosHTML[0].innerText="";
    puntosHTML[1].innerText="";

    divCartasJugador.innerHTML="";  
    divCartasComputadoras.innerHTML="";

    btnPedir.disabled = false;
    btnDetener.disabled=false;
});

const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText=puntosComputadora;

        const imgCarta= document.createElement("img");
        imgCarta.src=`cartas/${carta}.png`;
        imgCarta.classList.add("carta");

        divCartasComputadoras.append(imgCarta);
        if(puntosMinimos > 21 || puntosComputadora===21){
            break;
        }
    }while (puntosComputadora <= puntosMinimos && puntosMinimos <= 21);

    setTimeout(()=>{
        if (puntosComputadora===puntosMinimos){
            alert("Nadien gana 😭");
        }else if (puntosMinimos>21){
            alert("Computadora gana 💻");
        }else if (puntosComputadora>21){
            alert("Jugador gana 😎");
        }else{
            alert("Computadora gana 💻");
        }
    },100);
    
}

let puntos = 19;
console.log(puntos);
turnoComputadora(puntos);
